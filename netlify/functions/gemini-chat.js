// Netlify Function: gemini-chat
// Proxies chat requests to Google Gemini API without exposing the API key to the client.

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
// Prefer widely available models first; allow override via GEMINI_MODEL
const PREFERRED_MODELS = [
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
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

    // Determine available models dynamically and pick best supported for generateContent
    let lastError = null;
    const overrideModel = (process.env.GEMINI_MODEL || '').trim().replace(/^['"]|['"]$/g, '');
    let modelsToTry = [];
    try {
      const models = await listModels(apiKey);
      const byName = new Set(models.map(m => m.name));
      const supportsGen = new Set(models.filter(m => (m.supportedGenerationMethods || []).includes('generateContent')).map(m => m.name));

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
