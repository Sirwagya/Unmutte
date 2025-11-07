import mixpanel from 'mixpanel-browser';

export function initAnalytics() {
  try {
    const token = (import.meta.env.VITE_MIXPANEL_TOKEN || '').toString();
    if (!token) return;
    mixpanel.init(token, { debug: false });
    // Identify anonymous user by local id so events can be grouped client-side
    try {
      let anon = localStorage.getItem('unmutte_anon_id');
      if (!anon) {
        anon = `anon_${Math.random().toString(36).slice(2, 9)}`;
        localStorage.setItem('unmutte_anon_id', anon);
      }
      mixpanel.identify(anon);
    } catch (e) {
      // ignore localStorage errors
    }
  } catch (e) {
    // Fail silently when analytics cannot initialize
    // console.warn('Mixpanel init failed', e);
  }
}

export function trackEvent(event: string, props?: Record<string, any>) {
  try {
    const token = (import.meta.env.VITE_MIXPANEL_TOKEN || '').toString();
    if (!token) return;
    mixpanel.track(event, props || {});
  } catch (e) {
    // ignore
  }
}

export default { initAnalytics, trackEvent };
