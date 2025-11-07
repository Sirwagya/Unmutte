
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { inject } from "@vercel/analytics";
  import { initAnalytics } from "./lib/analytics";

  // Initialize analytics (safe no-op when Mixpanel token is absent)
  initAnalytics();

  const viteEnv = (import.meta as unknown as { env?: { PROD?: boolean } }).env;
  if (viteEnv?.PROD) {
    inject();
  }

  createRoot(document.getElementById("root")!).render(<App />);
  