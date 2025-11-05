// Netlify Function: gemini-chat
// Proxies chat requests to Google Gemini API without exposing the API key to the client.

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

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

  const apiKey = process.env.GEMINI_API_KEY;
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

    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
      body: JSON.stringify({ contents }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return jsonResponse(resp.status, { error: 'Gemini API error', detail: text });
    }

    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return jsonResponse(200, { text, raw: data });
  } catch (err) {
    console.error('gemini-chat error', err);
    return jsonResponse(500, { error: 'Internal Server Error' });
  }
};
