/**
 * Analytics + UTM attribution.
 * Pushes events to window.dataLayer (GTM-compatible). Wire a real GTM
 * container by adding the GTM snippet to client/index.html — this works
 * standalone either way.
 */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
const STORAGE_KEY = "lwsa_attribution";

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const hasUtm = UTM_KEYS.some((k) => params.has(k));
  const existing = getAttribution();

  if (hasUtm || !existing) {
    const attribution = existing || {};
    UTM_KEYS.forEach((k) => {
      if (params.has(k)) attribution[k] = params.get(k);
    });
    attribution.landing_page = attribution.landing_page || window.location.pathname + window.location.search;
    attribution.first_touch_at = attribution.first_touch_at || new Date().toISOString();
    attribution.referrer = attribution.referrer || document.referrer || "direct";
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    } catch (e) {
      /* ignore */
    }
  }
}

export function getAttribution() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function track(eventName, props = {}) {
  window.dataLayer = window.dataLayer || [];
  const payload = {
    event: eventName,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...props
  };
  window.dataLayer.push(payload);
  if (import.meta.env.DEV) {
    console.log("[track]", eventName, payload);
  }
}
