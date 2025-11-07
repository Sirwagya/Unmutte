import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = (import.meta.env.VITE_MIXPANEL_TOKEN || '').toString().trim();
let initialized = false;

export function initAnalytics() {
  if (initialized || !MIXPANEL_TOKEN) return;

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
  if (!initialized || !MIXPANEL_TOKEN) return;
  try {
    mixpanel.track(event, props || {});
  } catch (err) {
    // ignore tracking errors to avoid impacting UX
  }
}

export default { initAnalytics, trackEvent };
