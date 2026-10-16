"use client";

import { useState, useEffect } from "react";
import { applyConsent, CONSENT_KEY } from "./analytics";
import { content } from "./content";

export const OPEN_CONSENT_EVENT = "nk:open-consent";

export default function ConsentBanner({ lang = "en" }) {
  const t = content[lang].consent;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored = null;
    try { stored = localStorage.getItem(CONSENT_KEY); } catch {}
    if (!stored) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (granted) => { applyConsent(granted); setOpen(false); };

  // Accept and reject share one style so neither is visually favoured.
  const btn = {
    flex: "1 1 140px", padding: "12px 20px", borderRadius: 6, cursor: "pointer",
    border: "1px solid #C4933F", background: "transparent", color: "#F5F0E8",
    fontFamily: "'Karla', sans-serif", fontSize: 13, fontWeight: 600,
    letterSpacing: "0.06em", textTransform: "uppercase",
  };

  return (
    <div role="dialog" aria-live="polite" aria-label={t.title} style={{
      position: "fixed", left: 16, right: 16, bottom: 16, zIndex: 2000,
      maxWidth: 560, margin: "0 auto", padding: 20, borderRadius: 10,
      background: "rgba(26,20,16,0.97)", border: "1px solid rgba(196,147,63,0.35)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.35)", color: "#F5F0E8",
    }}>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, marginBottom: 6 }}>{t.title}</p>
      <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 13, lineHeight: 1.6, color: "#9B8E7E", marginBottom: 16 }}>{t.text}</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button onClick={() => choose(false)} style={btn}>{t.reject}</button>
        <button onClick={() => choose(true)} style={btn}>{t.accept}</button>
      </div>
    </div>
  );
}
