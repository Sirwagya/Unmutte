
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

  ## Requirements

  - Node.js 18+ recommended
  - Modern browser

  ## Troubleshooting

  - If port 3000 is taken, change the `server.port` in `vite.config.ts` or run: `npm run dev -- --port 4000`.
  - After dependency changes, delete `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`.
  