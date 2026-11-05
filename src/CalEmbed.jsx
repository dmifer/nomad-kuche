"use client";

import { useState, useEffect, useRef } from "react";
import { T } from "./theme";
import { WORKSHOPS } from "./config";
import { btnOutline } from "./styles";
import { track, trackConversion, getSource, BOOKING_VALUE } from "./analytics";

/* ─── Cal.com Inline Embed ─── */
let lastBookingAt = 0;
const seenBookings = new Set();
export const CalEmbed = ({ workshopId, loadingText, unavailableText }) => {
  const w = WORKSHOPS[workshopId];
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Cal.com requires a loader stub to be defined before the script loads.
    // This queues commands so the script can process them on ready.
    (function (C, A, L) {
      const p = (a, ar) => a.q.push(ar);
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const s = d.createElement("script");
          s.src = A;
          s.async = true;
          s.onload = () => setLoaded(true);
          d.head.appendChild(s);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, [L, namespace, api]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", w.slug, { origin: "https://cal.com" });
    window.Cal.ns[w.slug]("inline", {
      elementOrSelector: "#cal-inline-embed",
      calLink: `nomadkuche/${w.slug}`,
      layout: "month_view",
      config: { layout: "month_view", source: getSource() },
    });
    window.Cal.ns[w.slug]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    // Cal.com embed success callback -> booking_complete (debounced in case both actions fire)
    // One event per booking: skip a repeated booking uid, and debounce the two Cal actions.
    const onBooked = (e) => {
      const uid = e?.detail?.data?.uid;
      if (uid) {
        if (seenBookings.has(uid)) return;
        seenBookings.add(uid);
      }
      const now = Date.now();
      if (now - lastBookingAt < 5000) return;
      lastBookingAt = now;
      trackConversion(w.event, "booking_complete", {
        booking_type: w.bookingType,
        booking_currency: "EUR",
        ...(BOOKING_VALUE != null && { booking_value: BOOKING_VALUE }),
      });
    };
    ["bookingSuccessful", "bookingSuccessfulV2"].forEach((action) => {
      window.Cal.ns[w.slug]("on", { action, callback: onBooked });
    });
  }, [w]);

  // Treat the widget as loaded once Cal.com renders its iframe. The script's onload
  // only fires for the first mount, so a remount would otherwise stay "not loaded".
  useEffect(() => {
    const el = document.getElementById("cal-inline-embed");
    if (!el) return;
    const check = () => { if (el.querySelector("iframe")) setLoaded(true); };
    check();
    const mo = new MutationObserver(check);
    mo.observe(el, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  // Embed did not load within 5s -> booking_widget_error
  useEffect(() => {
    if (loaded) return;
    const id = setTimeout(() => { setFailed(true); track("booking_widget_error"); }, 5000);
    return () => clearTimeout(id);
  }, [loaded]);

  return (
    <div style={{
      background: "white", borderRadius: 12, overflow: "hidden",
      border: `1px solid ${T.ivoryDark}`,
      boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
      position: "relative",
    }}>
      {/* Loading state */}
      {!loaded && (
        <div style={{
          padding: "60px 24px", textAlign: "center",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 16,
          minHeight: 400,
        }}>
          {!failed && <div style={{
            width: 36, height: 36,
            border: `2px solid ${T.ivoryDark}`,
            borderTopColor: T.crimson,
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }} />}
          <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, color: T.warmGray }}>
            {failed ? unavailableText : loadingText}
          </p>
        </div>
      )}
      <div id="cal-inline-embed" style={{ width: "100%", minHeight: loaded ? 500 : 0, overflow: "auto" }} />
    </div>
  );
};


/* Mounts children only once the placeholder nears the viewport (lazy third-party embed). */
export const LazyMount = ({ children, minHeight = 400, rootMargin = "400px" }) => {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || on) return;
    if (!("IntersectionObserver" in window)) { setOn(true); return; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } }, { rootMargin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [on, rootMargin]);
  return on ? children : <div ref={ref} style={{ minHeight }} />;
};



/* "No suitable dates / want a discount" button that reveals a Brevo signup form on demand. */
const BREVO_FORM_URL = "https://8ce25402.sibforms.com/v2/serve/MUIFAC_-ETXf-ixWjd0fAsO1yC8SkcS2wrpoTXH4KoBFcs0giObhbFgLOp5M6YGyN86ud6re-8gOsdk4pkuvHKHqSlRf7WmbRTs761pHDtZNsD-N7lt-0Pi1fKvZ_jJ4MFYgMQ5WdMMYA8zFRCorm66CG2UyFe6uxpkOtRiABO4mWFKpIcw_NW3zLqaQuT_xvNgN874ugPHh2PVFCw==";
export const NoDatesForm = ({ label, closeLabel, workshopId }) => {
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    if (!open) return;
    setNarrow(window.innerWidth < 560);
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => { track("no_dates_click", { workshop: workshopId }); setOpen(true); }}
        style={{ ...btnOutline(T.crimson), padding: "12px 24px" }}
      >
        {label}
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
        >
          <div
            role="dialog" aria-modal="true" aria-label={label}
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", background: "#1A1410", borderRadius: 12, padding: "40px 16px 16px", width: "100%", maxWidth: 572, maxHeight: "100%", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
          >
            <button
              type="button" aria-label={closeLabel} onClick={() => setOpen(false)}
              style={{ position: "absolute", top: 6, right: 6, width: 44, height: 44, border: "none", background: "transparent", fontSize: 28, lineHeight: 1, color: T.warmGray, cursor: "pointer" }}
            >×</button>
            <iframe
              title={label}
              width="540" height={narrow ? 620 : 420}
              src={BREVO_FORM_URL}
              frameBorder="0" scrolling="no" allowFullScreen
              style={{ display: "block", marginLeft: "auto", marginRight: "auto", maxWidth: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
