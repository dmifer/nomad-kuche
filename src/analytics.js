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

/* Traffic source for bookings. Kept in memory only (no cookie/storage) and passed to the
   Cal.com "source" booking question, so it needs no consent. */
function readSource() {
  if (typeof window === "undefined") return "";
  const clean = (v) => String(v || "").trim().slice(0, 60);
  try {
    const q = new URLSearchParams(window.location.search);
    const src = clean(q.get("utm_source"));
    if (src) {
      const medium = clean(q.get("utm_medium"));
      return medium ? `${src} / ${medium}` : src;
    }
    if (document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host && host !== window.location.hostname.replace(/^www\./, "")) return clean(host);
    }
  } catch {}
  return "direct";
}

// Evaluated once at page load so the landing referrer/UTMs are not lost on later navigation.
const landingSource = readSource();
export const getSource = () => landingSource;

/* Conversion helpers (nomadkuche-developer-spec.md, phase 2).
   Pushes the spec event name and the legacy GTM-spec event, so existing triggers keep working.
   Mark only one of each pair as a GA4 key event to avoid double counting. */
export function trackConversion(event, legacy, params = {}) {
  track(event, params);
  if (legacy) track(legacy, params);
}

/* Fire a conversion, then navigate once GTM has processed it (or after a short timeout). */
export function trackThenGo(event, legacy, params, url) {
  let gone = false;
  const go = () => { if (!gone) { gone = true; window.location.assign(url); } };
  track(event, { ...params, eventCallback: go, eventTimeout: 800 });
  if (legacy) track(legacy, params);
  setTimeout(go, 900);
}
