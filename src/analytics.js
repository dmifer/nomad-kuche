/* GTM data layer helpers. Event names follow nomadkuche-gtm-tracking-spec.md. */

// Workshop price in EUR, passed as booking_value on booking_complete.
// Leave null until the price is confirmed (the parameter is omitted when null).
export const BOOKING_VALUE = null;

export function track(event, params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/* Consent Mode v2 */
export const CONSENT_KEY = "nk_consent";

export function applyConsent(granted) {
  if (typeof window === "undefined") return;
  const value = granted ? "granted" : "denied";
  window.dataLayer = window.dataLayer || [];
  // gtag.js / GTM expect the `arguments` object, not an array
  function gtag() { window.dataLayer.push(arguments); }
  gtag("consent", "update", {
    ad_storage: value,
    analytics_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
  try { localStorage.setItem(CONSENT_KEY, value); } catch {}
}
