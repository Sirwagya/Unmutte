import mixpanel from 'mixpanel-browser';

const RAW_TOKEN = (import.meta.env.VITE_MIXPANEL_TOKEN || '').toString();
const MIXPANEL_TOKEN = RAW_TOKEN.trim();
const IS_PLACEHOLDER = /REPLACE_WITH_MIXPANEL_PROJECT_TOKEN/i.test(MIXPANEL_TOKEN);
let initialized = false;
let heartbeatTimer: number | null = null;

export function initAnalytics() {
  if (initialized || !MIXPANEL_TOKEN || IS_PLACEHOLDER) {
    if (import.meta.env.DEV) {
      // Helpful hint in dev if analytics isn't configured
      console.info('[analytics] Mixpanel disabled: missing or placeholder token');
    }
    return;
  }

  try {
    mixpanel.init(MIXPANEL_TOKEN, {
      autocapture: true,
      record_sessions_percent: 100,
      persistence: 'localStorage',
      ip: false, // reduce PII automatically collected
    });
    initialized = true;

    try {
      let anonId = localStorage.getItem('unmutte_anon_id');
      if (!anonId) {
        anonId = `anon_${Math.random().toString(36).slice(2, 9)}`;
        localStorage.setItem('unmutte_anon_id', anonId);
      }
      mixpanel.identify(anonId);
    } catch (storageErr) {
      // localStorage may be unavailable in some privacy contexts; ignore
    }
  } catch (err) {
    // Swallow errors—if Mixpanel fails to init, the app should keep running.
  }
}

export function trackEvent(event: string, props?: Record<string, any>) {
  if (!initialized || !MIXPANEL_TOKEN || IS_PLACEHOLDER) return;
  try {
    mixpanel.track(event, props || {});
  } catch (err) {
    // ignore tracking errors to avoid impacting UX
  }
}

// Session lifecycle helpers
export function startSession() {
  if (!initialized || !MIXPANEL_TOKEN || IS_PLACEHOLDER) return;
  try {
    const sessionId = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    (window as any).__unmutte_session_id = sessionId;
    trackEvent('session_start', {
      sessionId,
      path: location.pathname + location.hash,
      referrer: document.referrer || undefined,
      mode: import.meta.env.MODE,
    });

    // Heartbeat every 120s
    if (heartbeatTimer) {
      window.clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
    heartbeatTimer = window.setInterval(() => {
      trackEvent('session_heartbeat', {
        sessionId,
        ts: Date.now(),
        path: location.pathname + location.hash,
      });
    }, 120_000);

    const endHandler = () => {
      try {
        trackEvent('session_end', { sessionId, ts: Date.now() });
      } catch {}
    };
    window.addEventListener('pagehide', endHandler);
    window.addEventListener('beforeunload', endHandler);
  } catch {}
}

export function stopSession() {
  if (heartbeatTimer) {
    window.clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
}

export default { initAnalytics, trackEvent, startSession, stopSession };
