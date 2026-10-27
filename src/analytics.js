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

/* Traffic source for bookings, passed to the Cal.com "source" booking question.
   Format "<source> / <medium>", e.g. "instagram / social", "tiktok / referral", "instagram / in-app".
   Priority:
     1. utm_source (+ utm_medium), normalised ("IG" -> "instagram")
     2. external referrer, mapped to a friendly name (l.instagram.com -> "instagram")
     3. in-app browser (Instagram / TikTok / Facebook strip the referrer, but name themselves in the user agent)
     4. the source stored earlier in this session (the site has several pages, so the landing
        source must survive Home -> workshop navigation)
     5. "direct"
   Always kept in sessionStorage for the browser session (cleared when the tab closes), whatever the cookie choice. */

const SOURCE_KEY = "nk_source";

const UTM_ALIASES = { ig: "instagram", insta: "instagram", tt: "tiktok", fb: "facebook", yt: "youtube", wa: "whatsapp", li: "linkedin" };

// [name, referrer-host pattern]
const REFERRERS = [
  ["instagram", /(^|\.)instagram\.com$/],
  ["tiktok", /(^|\.)tiktok\.com$/],
  ["facebook", /(^|\.)(facebook\.com|fb\.com|fb\.me)$/],
  ["whatsapp", /(^|\.)(whatsapp\.com|wa\.me)$/],
  ["youtube", /(^|\.)(youtube\.com|youtu\.be)$/],
  ["linkedin", /(^|\.)(linkedin\.com|lnkd\.in)$/],
  ["pinterest", /(^|\.)pinterest\.[a-z.]+$/],
  ["twitter", /(^|\.)(twitter\.com|x\.com|t\.co)$/],
  ["reddit", /(^|\.)reddit\.com$/],
  ["google", /(^|\.)google\.[a-z.]+$/],
  ["bing", /(^|\.)bing\.com$/],
  ["duckduckgo", /(^|\.)duckduckgo\.com$/],
];

// In-app browsers, by user agent
const IN_APP = [
  ["instagram", /Instagram/i],
  ["tiktok", /musical_ly|BytedanceWebview|TikTok|trill/i],
  ["facebook", /FBAN|FBAV|FB_IAB/i],
];

const clean = (v) => String(v || "").trim().toLowerCase().slice(0, 60);

function detectSource() {
  const q = new URLSearchParams(window.location.search);

  const utm = clean(q.get("utm_source"));
  if (utm) {
    const medium = clean(q.get("utm_medium"));
    const name = UTM_ALIASES[utm] || utm;
    return medium ? `${name} / ${medium}` : name;
  }

  if (document.referrer) {
    let host = "";
    try { host = new URL(document.referrer).hostname.toLowerCase().replace(/^www\./, ""); } catch {}
    const own = window.location.hostname.toLowerCase().replace(/^www\./, "");
    if (host && host !== own) {
      const known = REFERRERS.find(([, re]) => re.test(host));
      return `${known ? known[0] : clean(host)} / referral`;
    }
  }

  const ua = navigator.userAgent || "";
  const app = IN_APP.find(([, re]) => re.test(ua));
  if (app) return `${app[0]} / in-app`;

  return null; // nothing new on this page view
}

function readSource() {
  if (typeof window === "undefined") return "";
  let found = null;
  try { found = detectSource(); } catch {}
  let kept = null;
  try { kept = sessionStorage.getItem(SOURCE_KEY); } catch {}
  const source = found || kept || "direct";
  if (found) { try { sessionStorage.setItem(SOURCE_KEY, found); } catch {} }
  return source;
}

// Evaluated once per page load so the landing referrer/UTMs are not lost to later scrolling/SPA changes.
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
