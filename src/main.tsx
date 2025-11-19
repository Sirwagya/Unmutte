
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { inject } from "@vercel/analytics";
  import { initAnalytics, trackEvent, startSession } from "./lib/analytics";

  // Initialize analytics (safe no-op when Mixpanel token is absent)
  initAnalytics();
  startSession();
  // Fire a lightweight app load event for verification
  if (typeof window !== 'undefined') {
    const fire = () => trackEvent('app_loaded', { mode: import.meta.env.MODE });
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(fire, { timeout: 2000 });
    } else {
      setTimeout(fire, 0);
    }
  }

  if (import.meta.env.PROD) {
    inject();
  }

  createRoot(document.getElementById("root")!).render(<App />);
  