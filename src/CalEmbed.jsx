"use client";

import { useState, useEffect, useRef } from "react";
import { T } from "./theme";
import { WORKSHOPS } from "./config";
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

