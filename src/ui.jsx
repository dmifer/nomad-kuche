"use client";

import { useState, useEffect, useRef } from "react";
import { T } from "./theme";
import { track } from "./analytics";
import { reviews, reviewsMeta } from "./reviews";
import { MAPS_REVIEWS_URL } from "./config";
import { headingStyle, sectionPad, btnOutline, asLink } from "./styles";

/* ─── Intersection Observer hook ─── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export const FadeIn = ({ children, delay = 0, style = {}, className = "" }) => {
  const [ref, visible] = useFadeIn(0.12);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
};

/* Link that pushes a data layer event on click. */
export const TLink = ({ event, params, onClick, ...rest }) => (
  <a {...rest} onClick={(e) => { if (event) track(event, params); onClick?.(e); }} />
);

/* Reviews: CSS scroll-snap carousel on mobile, grid on desktop. Reviews stay in their original language. */
const ReviewCard = ({ r, more, less }) => {
  const [open, setOpen] = useState(false);
  const long = r.text.length > 220;
  return (
    <figure className="rev-card" lang={r.lang}>
      {r.placeholder && <span style={{ alignSelf: "flex-start", marginBottom: 10, padding: "2px 10px", borderRadius: 20, background: "#E0A85C", color: T.dark, fontFamily: "'Karla', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>PLACEHOLDER (dev only)</span>}
      <div aria-label={`${r.rating} / 5`} style={{ color: T.gold, letterSpacing: 2, fontSize: 16 }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
      <blockquote style={{
        fontFamily: "'Karla', sans-serif", fontSize: 15, lineHeight: 1.7, color: T.textDark, margin: "12px 0 16px", flex: 1,
        ...(long && !open ? { display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical", overflow: "hidden" } : {}),
      }}>{r.text}</blockquote>
      {long && <button onClick={() => setOpen(!open)} style={{ alignSelf: "flex-start", background: "none", border: "none", cursor: "pointer", color: T.crimson, fontFamily: "'Karla', sans-serif", fontSize: 13, fontWeight: 600, padding: "8px 0", minHeight: 44 }}>{open ? less : more}</button>}
      <figcaption style={{ fontFamily: "'Karla', sans-serif", fontSize: 13, color: T.warmGray }}><strong style={{ color: T.textDark }}>{r.name}</strong> · {r.date}</figcaption>
    </figure>
  );
};

const ReviewsCarousel = ({ items, t }) => {
  const ref = useRef(null);
  const pausedUntil = useRef(0);
  const idxRef = useRef(0);
  const [idx, setIdx] = useState(0);

  const goTo = (i) => {
    const el = ref.current;
    if (el && el.children[i]) el.scrollTo({ left: el.children[i].offsetLeft - el.offsetLeft, behavior: "smooth" });
  };
  const onScroll = () => {
    const el = ref.current;
    if (!el || !el.firstChild) return;
    const step = el.firstChild.getBoundingClientRect().width + 16;
    const i = Math.min(items.length - 1, Math.round(el.scrollLeft / step));
    idxRef.current = i;
    setIdx(i);
  };
  const pause = (ms = 8000) => { pausedUntil.current = Date.now() + ms; };

  // Auto-advance one card every few seconds, looping. Pauses while the visitor interacts.
  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const el = ref.current;
      if (!el || Date.now() < pausedUntil.current || document.hidden) return;
      if (el.scrollWidth <= el.clientWidth + 4) return; // everything already visible
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      goTo(atEnd ? 0 : Math.min(items.length - 1, idxRef.current + 1));
    }, 4500);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <>
      <div ref={ref} className="rev-track" onScroll={onScroll}
        onMouseEnter={() => pause(60000)} onMouseLeave={() => pause(1500)}
        onTouchStart={() => pause()} onPointerDown={() => pause()} onFocus={() => pause(60000)} onBlur={() => pause(1500)}>
        {items.map((r, i) => <ReviewCard key={i} r={r} more={t.more} less={t.less} />)}
      </div>
      <div className="rev-dots">
        {items.map((_, i) => (
          <button key={i} aria-label={`${t.dots} ${i + 1}`} aria-current={i === idx} onClick={() => { pause(); goTo(i); }}><span /></button>
        ))}
      </div>
    </>
  );
};

/* Reviews section (manual data in src/reviews.js). Renders nothing while there are no reviews. */
export function ReviewsSection({ t }) {
  if (reviews.length === 0) return null;
  const r = t.reviews;
  return (
    <section id="reviews" style={{ background: T.ivory, borderTop: `1px solid ${T.ivoryDark}`, overflow: "hidden" }}>
      <div style={sectionPad}>
        <FadeIn style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ ...headingStyle(), textAlign: "center", marginBottom: 8 }}>{r.title}</h2>
          {reviewsMeta.rating != null && (
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 15, color: T.warmGray }}>
              <span style={{ color: T.gold }}>{reviewsMeta.rating.toFixed(1)} ★</span> {r.onGoogle}
              {reviewsMeta.count != null && ` · ${reviewsMeta.count} ${r.countSuffix}`}
            </p>
          )}
        </FadeIn>
        <ReviewsCarousel items={reviews} t={r} />
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
          <TLink href={MAPS_REVIEWS_URL} target="_blank" rel="noopener noreferrer" event="reviews_click" params={{ link_url: MAPS_REVIEWS_URL }} style={asLink(btnOutline(T.crimson))}>{r.readAll}</TLink>
          {reviewsMeta.leaveReviewUrl && (
            <TLink href={reviewsMeta.leaveReviewUrl} target="_blank" rel="noopener noreferrer" event="reviews_click" params={{ link_url: reviewsMeta.leaveReviewUrl }} style={asLink(btnOutline(T.warmGray))}>{r.leave}</TLink>
          )}
        </div>
      </div>
    </section>
  );
}
