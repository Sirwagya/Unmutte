// Netlify Function: gemini-chat
// Proxies chat requests to Google Gemini API without exposing the API key to the client.

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
// Prefer widely available models first; allow override via GEMINI_MODEL
const DEFAULT_MODELS = [
  process.env.GEMINI_MODEL || 'gemini-1.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-pro',
];

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

  // Sanitize API key and model envs (strip quotes/whitespace)
  const apiKey = (process.env.GEMINI_API_KEY || "").trim().replace(/^['"]|['"]$/g, "");
  if (!apiKey) {
    return jsonResponse(500, { error: 'Server misconfiguration: GEMINI_API_KEY not set' });
  }

  try {
    const { prompt, history } = JSON.parse(event.body || '{}');
    if (!prompt || typeof prompt !== 'string') {
      return jsonResponse(400, { error: 'Missing required field: prompt' });
    }

    // Build contents: optionally include a short conversational history, then the new user prompt
  const contents = [];
    if (Array.isArray(history)) {
      // history expects: [{ role: 'user'|'model', text: string }]
      for (const item of history.slice(-6)) { // limit to last 6 turns
        contents.push({
          role: item.role === 'model' ? 'model' : 'user',
          parts: [{ text: String(item.text || '') }],
        });
      }
    }
    contents.push({ role: 'user', parts: [{ text: prompt }] });

    // Try preferred models in order
    let lastError = null;
    // Allow sanitized override of first model
    const firstModel = (process.env.GEMINI_MODEL || '').trim().replace(/^['"]|['"]$/g, '') || DEFAULT_MODELS[0];
    const modelsToTry = [firstModel, ...DEFAULT_MODELS.filter(m => m !== firstModel)];

    for (const model of modelsToTry) {
      const url = `${BASE_URL}/${encodeURIComponent(model)}:generateContent`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
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
