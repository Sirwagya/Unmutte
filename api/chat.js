// Vercel Serverless Function: /api/chat
// Proxies chat requests to Google Gemini or NVIDIA API without exposing API keys to the client.
// This mirrors the Netlify function logic but adapted to Vercel's handler signature.

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const NVIDIA_CHAT_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

const PREFERRED_GEMINI = [
  'gemini-2.0-flash-exp',
  'gemini-2.0-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
  'gemini-1.5-pro',
  'gemini-1.5-pro-latest',
  'gemini-1.0-pro',
  'gemini-pro',
];

const NVIDIA_PREFERRED_MODELS = [
  'meta/llama-3.1-8b-instruct',
  'mistralai/mistral-large-2-instruct',
  'qwen/qwen2.5-7b-instruct',
  'google/gemma-2-9b-it',
];

async function listGeminiModels(apiKey) {
  const resp = await fetch(`${GEMINI_BASE}`, {
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

function ok(res, body) {
  res.status(200).json(body);
}

function send(res, status, body) {
  res.status(status).json(body);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return ok(res, { ok: true });
  }
  if (req.method !== 'POST') {
    return send(res, 405, { error: 'Method Not Allowed' });
  }

  // Provider selection
  const provider = (process.env.AI_PROVIDER || '').trim().toLowerCase();
  const usingNvidia = provider === 'nvidia' || !!process.env.NVIDIA_API_KEY;

  // Sanitize API keys
  const geminiApiKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^['"]|['"]$/g, '');
  const nvidiaApiKey = (process.env.NVIDIA_API_KEY || '').trim().replace(/^['"]|['"]$/g, '');

  if (!usingNvidia && !geminiApiKey) {
    return send(res, 500, { error: 'Server misconfiguration: GEMINI_API_KEY not set' });
  }
  if (usingNvidia && !nvidiaApiKey) {
    return send(res, 500, { error: 'Server misconfiguration: NVIDIA_API_KEY not set' });
  }

  // Parse body safely
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  } catch (e) {
    body = {};
  }

  const { prompt, history } = body;
  if (!prompt || typeof prompt !== 'string') {
    return send(res, 400, { error: 'Missing required field: prompt' });
  }

  // Build payloads
  const contents = [];
  const messages = [];
  const systemPrompt = process.env.AI_SYSTEM_PROMPT || 'You are a helpful, concise assistant for the Unmutte app.';
  messages.push({ role: 'system', content: systemPrompt });
  if (Array.isArray(history)) {
    for (const item of history.slice(-6)) {
      const text = String(item.text || '');
      contents.push({ role: item.role === 'model' ? 'model' : 'user', parts: [{ text }] });
      messages.push({ role: item.role === 'model' ? 'assistant' : 'user', content: text });
    }
  }
  contents.push({ role: 'user', parts: [{ text: prompt }] });
  messages.push({ role: 'user', content: prompt });

  try {
    if (usingNvidia) {
      const overrideNvidiaModel = (process.env.NVIDIA_MODEL || process.env.NIM_MODEL || '').trim().replace(/^['"]|['"]$/g, '');
      const tryModels = [overrideNvidiaModel, ...NVIDIA_PREFERRED_MODELS].filter(Boolean);
      let lastErr = null;
      for (const model of tryModels) {
        try {
          const r = await fetch(NVIDIA_CHAT_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${nvidiaApiKey}`,
            },
            body: JSON.stringify({ model, messages, temperature: 0.7 }),
          });
          if (!r.ok) {
            const t = await r.text().catch(() => '');
            let j; try { j = JSON.parse(t); } catch {}
            const detail = j?.error?.message || j?.message || t || 'NVIDIA API error';
            lastErr = { status: r.status, detail, model };
            if (r.status === 404 || r.status === 403) continue; // try next model
            break;
          }
          const data = await r.json();
          const reply = data?.choices?.[0]?.message?.content || '';
          return ok(res, { text: reply, raw: data, model, provider: 'nvidia' });
        } catch (e) {
          lastErr = { status: 502, detail: String(e?.message || e), model };
          continue;
        }
      }
      return send(res, lastErr?.status || 502, { error: 'NVIDIA API error', detail: lastErr?.detail || 'All NVIDIA model attempts failed', provider: 'nvidia', tried: tryModels });
    }

    // Gemini path
    const overrideModel = (process.env.GEMINI_MODEL || '').trim().replace(/^['"]|['"]$/g, '');
    let modelsToTry = [];
    try {
      const models = await listGeminiModels(geminiApiKey);
      const normalize = (n) => String(n || '').replace(/^models\//, '');
      const supportsGen = new Set(models.filter(m => (m.supportedGenerationMethods || []).includes('generateContent')).map(m => normalize(m.name)));
      if (overrideModel && supportsGen.has(overrideModel)) modelsToTry.push(overrideModel);
      for (const m of PREFERRED_GEMINI) if (supportsGen.has(m) && !modelsToTry.includes(m)) modelsToTry.push(m);
      for (const m of supportsGen) if (!modelsToTry.includes(m)) modelsToTry.push(m);
      if (modelsToTry.length === 0) {
        modelsToTry = [overrideModel || 'gemini-1.5-flash', ...PREFERRED_GEMINI].filter(Boolean);
      }
    } catch {
      modelsToTry = [overrideModel || 'gemini-1.5-flash', ...PREFERRED_GEMINI].filter(Boolean);
    }

    let lastError = null;
    for (const model of modelsToTry) {
      const url = `${GEMINI_BASE}/${encodeURIComponent(model)}:generateContent`;
      const r = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': geminiApiKey,
        },
        body: JSON.stringify({ contents }),
      });
      if (!r.ok) {
        let txt = await r.text();
        let j; try { j = JSON.parse(txt); } catch {}
        const detail = j?.error?.message || txt;
        lastError = { status: j?.error?.code || r.status, detail, model, statusText: j?.error?.status };
        if (r.status === 400 || r.status === 404 || r.status === 403) continue;
        break;
      }
      const data = await r.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return ok(res, { text: reply, raw: data, model, provider: 'gemini' });
    }

    return send(res, lastError?.status || 502, { error: 'Gemini API error', detail: lastError?.detail || 'All model attempts failed', statusText: lastError?.statusText, tried: modelsToTry });
  } catch (err) {
    return send(res, 500, { error: 'Internal Server Error', detail: String(err?.message || err) });
  }
}
