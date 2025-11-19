// Netlify Function: gemini-chat
// Proxies chat requests to an LLM provider without exposing the API key to the client.
// Supports:
// - Google Gemini (default) via Generative Language API
// - NVIDIA API (Nemotron, Llama, etc.) via OpenAI-compatible Chat Completions

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const NVIDIA_CHAT_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const NVIDIA_PREFERRED_MODELS = [
  'meta/llama-3.1-8b-instruct',
  'mistralai/mistral-large-2-instruct',
  'qwen/qwen2.5-7b-instruct',
  'google/gemma-2-9b-it',
];
// Prefer widely available models first; allow override via GEMINI_MODEL
const PREFERRED_MODELS = [
  // Prefer newest, highly available stable models first
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  // Older families as fallback
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-pro',
  'gemini-1.0-pro',
  'gemini-pro',
  'gemini-pro-vision',
];

async function listModels(apiKey) {
  const url = `${BASE_URL}`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: { 'X-goog-api-key': apiKey },
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`ListModels failed: ${resp.status} ${text}`);
  }
  const data = await resp.json();
  return Array.isArray(data?.models) ? data.models : [];
}

function jsonResponse(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, { ok: true });
  }
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method Not Allowed' });
  }

  // Provider selection
  const provider = (process.env.AI_PROVIDER || '').trim().toLowerCase();
  const usingNvidia = provider === 'nvidia' || !!(process.env.NVIDIA_API_KEY);
  // Sanitize API keys and model envs (strip quotes/whitespace)
  const geminiApiKey = (process.env.GEMINI_API_KEY || "").trim().replace(/^['"]|['"]$/g, "");
  const nvidiaApiKey = (process.env.NVIDIA_API_KEY || "").trim().replace(/^['"]|['"]$/g, "");
  if (!usingNvidia && !geminiApiKey) {
    return jsonResponse(500, { error: 'Server misconfiguration: GEMINI_API_KEY not set' });
  }
  if (usingNvidia && !nvidiaApiKey) {
    return jsonResponse(500, { error: 'Server misconfiguration: NVIDIA_API_KEY not set' });
  }

  try {
    const { prompt, history } = JSON.parse(event.body || '{}');
    if (!prompt || typeof prompt !== 'string') {
      return jsonResponse(400, { error: 'Missing required field: prompt' });
    }

    // Build request payloads for providers from history + prompt
    // Our history format: [{ role: 'user'|'model', text: string }]
    // Gemini 'contents' format; NVIDIA uses OpenAI-style 'messages'.
    const contents = [];
    const messages = [];
    // Optional system prompt for NVIDIA
    const systemPrompt = process.env.AI_SYSTEM_PROMPT || 'You are a helpful, concise assistant for the Unmutte app.';
    messages.push({ role: 'system', content: systemPrompt });
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) { // limit to last 6 turns
        const text = String(item.text || '');
        // Gemini
        contents.push({
          role: item.role === 'model' ? 'model' : 'user',
          parts: [{ text }],
        });
        // NVIDIA (assistant instead of model)
        messages.push({ role: item.role === 'model' ? 'assistant' : 'user', content: text });
      }
    }
    contents.push({ role: 'user', parts: [{ text: prompt }] });
    messages.push({ role: 'user', content: prompt });

    // If using NVIDIA, short-circuit to NVIDIA API
    if (usingNvidia) {
      const overrideNvidiaModel = (process.env.NVIDIA_MODEL || process.env.NIM_MODEL || '').trim().replace(/^['"]|['"]$/g, '');
      const tryList = [overrideNvidiaModel, ...NVIDIA_PREFERRED_MODELS].filter(Boolean);
      let lastErr = null;
      for (const nvidiaModel of tryList) {
        try {
          const resp = await fetch(NVIDIA_CHAT_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${nvidiaApiKey}`,
            },
            body: JSON.stringify({ model: nvidiaModel, messages, temperature: 0.7 }),
          });
          if (!resp.ok) {
            const errText = await resp.text().catch(() => '');
            let errJson; try { errJson = JSON.parse(errText); } catch {}
            const detail = errJson?.error?.message || errJson?.message || errText || 'NVIDIA API error';
            lastErr = { status: resp.status, detail, model: nvidiaModel };
            // 404 Not Found for function/model on account: try next model
            if (resp.status === 404 || resp.status === 403) continue;
            // Other errors: break
            break;
          }
          const data = await resp.json();
          const reply = data?.choices?.[0]?.message?.content || '';
          return jsonResponse(200, { text: reply, raw: data, model: nvidiaModel, provider: 'nvidia' });
        } catch (e) {
          lastErr = { status: 502, detail: String(e?.message || e), model: nvidiaModel };
          // Try next
          continue;
        }
      }
      return jsonResponse(lastErr?.status || 502, { error: 'NVIDIA API error', detail: lastErr?.detail || 'All NVIDIA model attempts failed', provider: 'nvidia', tried: tryList });
    }

    // Determine available Gemini models dynamically and pick best supported for generateContent
    let lastError = null;
    const overrideModel = (process.env.GEMINI_MODEL || '').trim().replace(/^['"]|['"]$/g, '');
    let modelsToTry = [];
    try {
      const models = await listModels(geminiApiKey);
      // Normalize model names. ListModels returns names like "models/gemini-2.5-flash";
      // strip the leading "models/" so we can request the per-model endpoint as
      // /v1beta/models/{modelName}:generateContent where modelName should be e.g. "gemini-2.5-flash".
      const normalize = (n) => String(n || '').replace(/^models\//, '');
      const byName = new Set(models.map(m => normalize(m.name)));
      const supportsGen = new Set(models
        .filter(m => (m.supportedGenerationMethods || []).includes('generateContent'))
        .map(m => normalize(m.name))
      );

      // Build an ordered list: override (if present & supported), then preferred intersecting supported, then any supported
      if (overrideModel && supportsGen.has(overrideModel)) modelsToTry.push(overrideModel);
      for (const m of PREFERRED_MODELS) if (supportsGen.has(m) && !modelsToTry.includes(m)) modelsToTry.push(m);
      for (const m of supportsGen) if (!modelsToTry.includes(m)) modelsToTry.push(m);

      // Fallback if ListModels is empty or blocked
      if (modelsToTry.length === 0) {
        modelsToTry = [overrideModel || 'gemini-1.5-flash', ...PREFERRED_MODELS].filter(Boolean);
      }
    } catch (e) {
      // If ListModels fails (some keys restrict it), fall back to preference list
      modelsToTry = [overrideModel || 'gemini-1.5-flash', ...PREFERRED_MODELS].filter(Boolean);
    }

    for (const model of modelsToTry) {
      const url = `${BASE_URL}/${encodeURIComponent(model)}:generateContent`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': geminiApiKey,
        },
        body: JSON.stringify({ contents }),
      });

      if (!resp.ok) {
        let payloadText = await resp.text();
        let payloadJson = undefined;
        try { payloadJson = JSON.parse(payloadText); } catch {}
        const detail = payloadJson?.error?.message || payloadText;
        const code = payloadJson?.error?.code || resp.status;
        const statusText = payloadJson?.error?.status;
        lastError = { status: code, detail, model, statusText };
        // If model invalid/unavailable, try the next option
        if (resp.status === 400 || resp.status === 404) continue;
        // Permission or quota issues can differ per model; try next as well
        if (resp.status === 403) continue;
        // Other errors: break early
        break;
      }

      const data = await resp.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return jsonResponse(200, { text: reply, raw: data, model });
    }

    // If we got here, all attempts failed
    return jsonResponse(lastError?.status || 502, {
      error: 'Gemini API error',
      detail: lastError?.detail || 'All model attempts failed',
      statusText: lastError?.statusText,
      tried: modelsToTry,
    });
  } catch (err) {
    console.error('gemini-chat error', err);
    return jsonResponse(500, { error: 'Internal Server Error' });
  }
};
