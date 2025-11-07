
  # Create Anonymous Feedback Feature

  This is a code bundle for Create Anonymous Feedback Feature. The original project is available at https://www.figma.com/design/1KzsU9yw0AzGEypaGoHVPx/Create-Anonymous-Feedback-Feature.

  ## Run locally

  1) Install dependencies

  ```sh
  npm install
  ```

  2) Start the dev server (auto-reloads on changes)

  ```sh
  npm run dev
  ```

  Dev server runs on http://localhost:3000 (configurable in `vite.config.ts`).

  If you want the AI chat to work locally (calls `/api/chat`), run the Netlify function runtime:

  ```sh
  npm run dev:netlify
  ```
  
  Notes:
  - This uses `npx netlify-cli@17.34.0` under the hood. If you see errors, use Node 18–20 (e.g. `nvm use 20`).
  - Create `.env` from `.env.example` and set `GEMINI_API_KEY` for local function dev. Never commit real secrets.

  ## Build for production

  ```sh
  npm run build
  ```

  The static files are output to the `dist/` directory (see `vite.config.ts` `outDir`).

  ## Preview the production build

  ```sh
  npm run preview
  ```

  This serves the built site locally (default http://localhost:4173). Useful to validate the production bundle.

  ## AI Chat providers

  The AI chat uses a Netlify Function (`/.netlify/functions/gemini-chat`) that proxies requests to your chosen provider so API keys stay server-side.

  Supported providers:
  - Google Gemini (default)
  - NVIDIA API (Nemotron, etc.) via OpenAI-compatible Chat Completions

  Configure via environment variables (either in `.env` for local dev or in Netlify site settings):

  - `AI_PROVIDER` — `gemini` (default) or `nvidia`
  - If `gemini`:
    - `GEMINI_API_KEY=<your_gemini_key>`
    - Optional: `GEMINI_MODEL=gemini-2.5-flash`
  - If `nvidia`:
    - `NVIDIA_API_KEY=<your_nvidia_key>`
    - Optional: `NVIDIA_MODEL=nvidia/nemotron-4-9b-instruct`

  The frontend posts to `/api/chat`, which is redirected to the function in `netlify.toml`.

  ### Deploying on Vercel

  If you host on Vercel instead of Netlify, this project includes a Vercel Serverless Function at `api/chat.js`.
  Requests to `/api/chat` will automatically invoke the function on Vercel.

  Set these environment variables in your Vercel Project (Production and Preview as needed):

  - `AI_PROVIDER` = `gemini` or `nvidia`
  - `GEMINI_API_KEY` (when using Gemini)
  - `GEMINI_MODEL` (optional; the function auto-discovers supported models)
  - `NVIDIA_API_KEY` (when using NVIDIA)
  - `NVIDIA_MODEL` (optional; the function falls back to widely-available models if restricted)

  - `VITE_MIXPANEL_TOKEN` (optional) — your Mixpanel project token. Prefix with `VITE_` so the token is exposed to the client by Vite. Keep this token secret in repo; set it in Vercel/Netlify UI.

  Build: `npm run build` (detected automatically)
  Output dir: `dist` (Vite default here)

  Troubleshooting on Vercel:
  - If you see "AI model not available" in the UI, it often means `/api/chat` returned 404/400.
    Ensure `api/chat.js` is deployed and your environment variables are configured. Check Vercel Function logs for details.
  - Some NVIDIA models may be restricted per account/region. If you get 404/403 from NVIDIA, set `NVIDIA_MODEL=meta/llama-3.1-8b-instruct` or leave it empty to let the function try safe fallbacks.

  ## Requirements

  - Node.js 18+ recommended
  - Modern browser

  ## Troubleshooting

  - If port 3000 is taken, change the `server.port` in `vite.config.ts` or run: `npm run dev -- --port 4000`.
  - After dependency changes, delete `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`.
  