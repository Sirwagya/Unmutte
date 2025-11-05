
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

  ## Build for production

  ```sh
  npm run build
  ```

  The static files are output to the `build/` directory (see `vite.config.ts` `outDir`).

  ## Preview the production build

  ```sh
  npm run preview
  ```

  This serves the built site locally (default http://localhost:4173). Useful to validate the production bundle.

  ## Requirements

  - Node.js 18+ recommended
  - Modern browser

  ## Troubleshooting

  - If port 3000 is taken, change the `server.port` in `vite.config.ts` or run: `npm run dev -- --port 4000`.
  - After dependency changes, delete `node_modules` and reinstall: `rm -rf node_modules package-lock.json && npm install`.
  