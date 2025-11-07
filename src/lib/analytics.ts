declare const __MIXPANEL_TOKEN__: string;

declare global {
  interface Window {
    mixpanel?: {
      init?: (...args: any[]) => void;
      identify?: (...args: any[]) => void;
      track?: (event: string, props?: Record<string, any>) => void;
    };
  }
}

const MIXPANEL_TOKEN = typeof __MIXPANEL_TOKEN__ !== 'undefined' ? __MIXPANEL_TOKEN__ : '';

export function initAnalytics() {
  if (!MIXPANEL_TOKEN || typeof window === 'undefined') return;
  const instance = window.mixpanel;
  if (!instance) return;

  try {
    let anonId: string | null = null;
    try {
      anonId = localStorage.getItem('unmutte_anon_id');
      if (!anonId) {
        anonId = `anon_${Math.random().toString(36).slice(2, 9)}`;
        localStorage.setItem('unmutte_anon_id', anonId);
      }
    } catch (storageErr) {
      // Ignore storage errors (privacy mode, etc.)
    }

    if (anonId && typeof instance.identify === 'function') {
      instance.identify(anonId);
    }
  } catch (e) {
    // Fail silently if Mixpanel is unavailable
  }
}

export function trackEvent(event: string, props?: Record<string, any>) {
  if (!MIXPANEL_TOKEN || typeof window === 'undefined') return;
  const instance = window.mixpanel;
  if (!instance || typeof instance.track !== 'function') return;
  try {
    instance.track(event, props || {});
  } catch (e) {
    // ignore tracking errors
  }
}

export default { initAnalytics, trackEvent };
