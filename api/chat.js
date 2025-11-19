// Vercel Serverless Function: /api/chat
// Proxies chat requests to Google Gemini or NVIDIA API without exposing API keys to the client.
// This mirrors the Netlify function logic but adapted to Vercel's handler signature.

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const NVIDIA_CHAT_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

const PREFERRED_GEMINI_MODELS = [
  "gemini-3-pro-preview",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest",
  "gemini-pro",
];

const NVIDIA_PREFERRED_MODELS = [
  "meta/llama-3.1-8b-instruct",
  "mistralai/mistral-large-2-instruct",
];

const sendError = (res, statusCode, message, details) => {
  res.status(statusCode).json({ error: message, ...details });
};

const sendStream = (res, initialChunk) => {
  res.setHeader("Content-Type", "application/octet-stream");
  res.write(initialChunk);
  return {
    write: (chunk) => res.write(chunk),
    end: () => res.end(),
  };
};

const pipeResponseStream = async (body, stream) => {
  if (!body) {
    stream.end();
    return;
  }

  const writeChunk = (chunk) => {
    if (!chunk) return;
    if (typeof chunk === "string") {
      stream.write(chunk);
      return;
    }
    const bufferChunk = Buffer.isBuffer(chunk)
      ? chunk
      : Buffer.from(chunk);
    stream.write(bufferChunk);
  };

  if (typeof body.getReader === "function") {
    const reader = body.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        writeChunk(value);
      }
    } finally {
      stream.end();
    }
    return;
  }

  try {
    for await (const chunk of body) {
      writeChunk(chunk);
    }
  } finally {
    stream.end();
  }
};

const getApiKey = (envVar) => (process.env[envVar] || "").trim().replace(/^['"]|['"]$/g, "");

const validateRequestBody = (body) => {
  const { prompt, history } = body;
  if (!prompt || typeof prompt !== "string" || prompt.length > 2000) {
    return { error: "Invalid or missing 'prompt' field." };
  }
  if (
    history &&
    (!Array.isArray(history) ||
      history.some(
        (item) =>
          typeof item.role !== "string" || typeof item.text !== "string"
      ))
  ) {
    return { error: "Invalid 'history' field." };
  }
  return { prompt, history: history || [] };
};

const buildPayloads = (prompt, history) => {
  const systemPrompt =
    process.env.AI_SYSTEM_PROMPT ||
    "You are a helpful, concise assistant for the Unmutte app.";

  const geminiContents = history
    .slice(-6)
    .map((item) => ({
      role: item.role === "model" ? "model" : "user",
      parts: [{ text: String(item.text || "") }],
    }));
  geminiContents.push({ role: "user", parts: [{ text: prompt }] });

  const nvidiaMessages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-6).map((item) => ({
      role: item.role === "model" ? "assistant" : "user",
      content: String(item.text || ""),
    })),
    { role: "user", content: prompt },
  ];

  return { geminiContents, nvidiaMessages };
};

const handleNvidiaRequest = async (res, apiKey, messages, modelOverride) => {
  const modelsToTry = [
    modelOverride,
    ...NVIDIA_PREFERRED_MODELS,
  ].filter(Boolean);

  for (const model of modelsToTry) {
    try {
      const response = await fetch(NVIDIA_CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          stream: true,
        }),
      });

      if (response.ok) {
        const stream = sendStream(res, `{"model": "${model}", "provider": "nvidia"}\n`);
        await pipeResponseStream(response.body, stream);
        return;
      }
    } catch (error) {
      // Log and continue to the next model
      console.error(`NVIDIA model ${model} failed:`, error);
    }
  }

  sendError(res, 502, "NVIDIA API error", {
    detail: "All NVIDIA model attempts failed.",
  });
};

const handleGeminiRequest = async (res, apiKey, contents, modelOverride) => {
  const modelsToTry = [
    modelOverride,
    ...PREFERRED_GEMINI_MODELS,
  ].filter(Boolean);

  for (const model of modelsToTry) {
    const url = `${GEMINI_BASE_URL}/${encodeURIComponent(
      model
    )}:streamGenerateContent`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey,
        },
        body: JSON.stringify({ contents }),
      });

      if (response.ok) {
        const stream = sendStream(res, `{"model": "${model}", "provider": "gemini"}\n`);
        await pipeResponseStream(response.body, stream);
        return;
      }
    } catch (error) {
      console.error(`Gemini model ${model} failed:`, error);
    }
  }

  sendError(res, 502, "Gemini API error", {
    detail: "All Gemini model attempts failed.",
  });
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return sendError(res, 405, "Method Not Allowed");
  }

  const { error, prompt, history } = validateRequestBody(req.body);
  if (error) {
    return sendError(res, 400, error);
  }

  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  const geminiApiKey = getApiKey("GEMINI_API_KEY");
  const nvidiaApiKey = getApiKey("NVIDIA_API_KEY");

  const { geminiContents, nvidiaMessages } = buildPayloads(prompt, history);

  if (provider === "nvidia" && nvidiaApiKey) {
    const modelOverride = getApiKey("NVIDIA_MODEL");
    return handleNvidiaRequest(res, nvidiaApiKey, nvidiaMessages, modelOverride);
  }

  if (geminiApiKey) {
    const modelOverride = getApiKey("GEMINI_MODEL");
    return handleGeminiRequest(res, geminiApiKey, geminiContents, modelOverride);
  }

  sendError(res, 500, "Server misconfiguration", {
    detail: "No AI provider API key is set.",
  });
}
