"use client";

import { useState, useEffect } from "react";
import { content } from "./content";
import { PAGES } from "./pages";
import { T } from "./theme";
import { track } from "./analytics";
import { OPEN_CONSENT_EVENT } from "./ConsentBanner";
import { formStyles } from "./forms";
import { KusKanat } from "./ornaments";
import { btnPrimary, btnOutline, asLink } from "./styles";
import { OWNER_EMAIL, WHATSAPP_NUMBER, WHATSAPP_URL } from "./config";

const SECTION_IDS = ["about", "experiences", "workshop", "reviews", "reserve", "gift", "gallery", "founder", "contact"];

const GLOBAL_CSS = `
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
  @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { scroll-behavior: smooth; overflow-x: hidden; max-width: 100%; background: ${T.dark}; }
  ::selection { background: ${T.crimson}; color: white; }
  input::placeholder, textarea::placeholder { color: ${T.warmGrayLight}; }
  ${formStyles}
  a.card-link { text-decoration: none; color: inherit; display: block; height: 100%; }
  a.card-link:hover .card { box-shadow: 0 12px 40px rgba(0,0,0,0.08); transform: translateY(-4px); }
  .card { transition: box-shadow .3s, transform .3s; }
  .rev-track { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 0 0 8px; scrollbar-width: none; }
  .rev-track::-webkit-scrollbar { display: none; }
  .rev-card { flex: 0 0 340px; scroll-snap-align: start; min-height: 260px; background: white; border: 1px solid ${T.ivoryDark}; border-radius: 10px; padding: 24px; display: flex; flex-direction: column; }
  .rev-dots { display: flex; justify-content: center; gap: 2px; margin-top: 8px; }
  .rev-dots button { width: 44px; height: 44px; background: none; border: none; cursor: pointer; display: grid; place-items: center; }
  .rev-dots span { width: 8px; height: 8px; border-radius: 50%; background: ${T.warmGrayLight}; opacity: .5; }
  .rev-dots button[aria-current="true"] span { background: ${T.crimson}; opacity: 1; }
  .sticky-cta { display: none; }
  .float-cta { position: fixed; right: 24px; bottom: 24px; z-index: 900; opacity: 0; transform: translateY(16px); pointer-events: none;
    transition: opacity .3s ease, transform .3s ease; box-shadow: 0 8px 28px rgba(0,0,0,0.35), 0 0 0 2px rgba(245,240,232,0.85); border-radius: 999px; }
  .float-cta[data-show="true"] { opacity: 1; transform: translateY(0); pointer-events: auto; }
  .float-cta:hover { filter: brightness(1.12); }
  .desktop-nav { display: flex; }
  .mobile-menu-btn { display: none; }
  .nav-link:hover { color: ${T.gold} !important; }
  @media (max-width: 1100px) {
    .desktop-nav { gap: 14px !important; }
    .nav-link { font-size: 12px !important; letter-spacing: 0.04em !important; }
  }
  @media (max-width: 860px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }
  }
  @media (max-width: 768px) {
    .float-cta { display: none !important; }
    .rev-track { padding: 0 24px 8px; margin: 0 -24px; }
    .rev-card { flex: 0 0 84%; scroll-snap-align: center; }
    .sticky-cta { display: block; position: fixed; left: 0; right: 0; bottom: 0; z-index: 900; padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
      background: rgba(26,20,16,0.94); backdrop-filter: blur(10px); border-top: 1px solid rgba(196,147,63,0.25);
      transform: translateY(110%); transition: transform .3s ease; }
    .sticky-cta[data-show="true"] { transform: translateY(0); }
    .sticky-cta a { width: 100%; }
    .nk-footer { padding-bottom: 96px !important; }
    .nav-pad { padding-left: 16px !important; padding-right: 16px !important; }
  }
`;

/* Shared page frame: nav, mobile menu, sticky CTA, footer.
   pageKey picks the active nav item and the language-switch target.
   hasReserve: the page has a #reserve booking section, so "Reserve" scrolls to it. */
export default function Layout({ lang = "en", pageKey, hasReserve = false, children }) {
  const t = content[lang];
  const other = lang === "en" ? "de" : "en";
  const sw = { ...t.switch, href: PAGES[pageKey][other] };
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reserveInView, setReserveInView] = useState(false);

  const reserveHref = hasReserve ? "#reserve" : `${t.home}#workshop`;
  const linkHref = (l) => (l.key === "contact" ? `${t.home}#contact` : PAGES[l.key][lang]);
  const stickyShown = scrolled && !reserveInView && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // section_view: once per section, when it crosses the middle of the viewport
  useEffect(() => {
    const seen = new Set();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !seen.has(e.target.id)) {
          seen.add(e.target.id);
          track("section_view", { section_name: e.target.id, page: pageKey });
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });
    SECTION_IDS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [pageKey]);

  // Sticky mobile CTA hides while the booking section is on screen
  useEffect(() => {
    const el = document.getElementById("reserve");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setReserveInView(e.isIntersecting), { threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onReserve = (text) => () => { track("reserve_click", { click_text: text, click_url: reserveHref }); setMenuOpen(false); };
  const onNav = (l) => () => { track("nav_click", { section_name: l.key }); setMenuOpen(false); };
  const onSwitch = () => track("language_switch", { link_url: sw.href });

  const navLinkStyle = (l) => ({
    fontFamily: "'Karla', sans-serif", fontSize: 13, fontWeight: 500,
    color: l.key === pageKey ? T.gold : T.warmGrayLight, letterSpacing: "0.06em",
    textTransform: "uppercase", textDecoration: "none", transition: "color .2s",
  });

  return (
    <div style={{ background: T.dark, color: T.textLight, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{GLOBAL_CSS}</style>

      {/* ─── NAV ─── */}
      <nav className="nav-pad" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "12px 32px" : "20px 32px",
        background: scrolled || menuOpen ? "rgba(26,20,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all .35s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href={t.home} style={{
          fontFamily: "'EB Garamond', serif", fontSize: 22, fontWeight: 500,
          color: T.ivory, letterSpacing: "0.02em", textDecoration: "none", position: "relative", zIndex: 1001,
        }}>Nomad Küche</a>

        <div style={{ gap: 20, alignItems: "center" }} className="desktop-nav">
          {t.nav.map((l) => (
            <a key={l.key} href={linkHref(l)} onClick={onNav(l)} className="nav-link" style={navLinkStyle(l)}>{l.label}</a>
          ))}
          <a href={reserveHref} onClick={onReserve(t.reserveShort)} style={asLink({ ...btnOutline(T.gold), padding: "8px 24px", fontSize: 12, minHeight: 40 })}>{t.reserveShort}</a>
          <a href={sw.href} hrefLang={sw.hrefLang} lang={sw.hrefLang} title={sw.title} onClick={onSwitch} style={{
            fontFamily: "'Karla', sans-serif", fontSize: 13, fontWeight: 600,
            color: T.warmGrayLight, letterSpacing: "0.1em", textDecoration: "none",
          }}>{sw.label}</a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" aria-label="Menu" aria-expanded={menuOpen} style={{
          background: "none", border: "none", cursor: "pointer", color: T.ivory,
          fontSize: 24, minWidth: 44, minHeight: 44, position: "relative", zIndex: 1001,
        }}>{menuOpen ? "✕" : "☰"}</button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(26,20,16,0.97)", backdropFilter: "blur(12px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 14, animation: "fadeIn .25s ease",
        }}>
          {t.nav.map((l) => (
            <a key={l.key} href={linkHref(l)} onClick={onNav(l)} style={{
              fontFamily: "'EB Garamond', serif", fontSize: 28, color: l.key === pageKey ? T.gold : T.ivory,
              letterSpacing: "0.02em", textDecoration: "none", padding: "8px 24px", minHeight: 44,
            }}>{l.label}</a>
          ))}
          <a href={reserveHref} onClick={onReserve(t.reserveCta)} style={{ ...asLink(btnPrimary), marginTop: 12 }}>{t.reserveCta}</a>
          <a href={sw.href} hrefLang={sw.hrefLang} lang={sw.hrefLang} title={sw.title} onClick={onSwitch} style={{
            fontFamily: "'Karla', sans-serif", fontSize: 14, fontWeight: 600, padding: 12,
            color: T.warmGrayLight, letterSpacing: "0.1em", textDecoration: "none",
          }}>{sw.label}</a>
        </div>
      )}

      {children}

      {/* ─── FOOTER ─── */}
      <footer className="nk-footer" style={{ background: T.dark, padding: "56px 24px 40px", borderTop: "1px solid rgba(196,147,63,0.08)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 36 }}>
          <div>
            <KusKanat size={60} opacity={0.12} color={T.gold} style={{ marginBottom: 16, display: "block" }} />
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 20, color: T.ivory, marginBottom: 8 }}>Nomad Küche</p>
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 12, color: T.warmGrayLight, letterSpacing: "0.04em", lineHeight: 1.7 }}>{t.footer.tagline}</p>
          </div>
          <FooterCol title={t.footer_cols.explore}>
            {t.nav.map((l) => <FooterLink key={l.key} href={linkHref(l)}>{l.label}</FooterLink>)}
          </FooterCol>
          <FooterCol title={t.footer_cols.contact}>
            <FooterLink href={`mailto:${OWNER_EMAIL}`} onClick={() => track("email_click", { link_url: `mailto:${OWNER_EMAIL}` })}>{OWNER_EMAIL}</FooterLink>
            <FooterLink href={WHATSAPP_URL} external onClick={() => track("whatsapp_click", { link_url: WHATSAPP_URL })}>WhatsApp {WHATSAPP_NUMBER}</FooterLink>
            <FooterLink href="https://instagram.com/nomad_kuche" external onClick={() => track("instagram_click", { link_url: "https://instagram.com/nomad_kuche" })}>@nomad_kuche</FooterLink>
          </FooterCol>
          <FooterCol title={t.footer_cols.legal}>
            <FooterLink href={PAGES.impressum[lang]}>{t.legal.footerLabel}</FooterLink>
            <FooterLink href={PAGES.privacy[lang]}>{t.legal.privacyLabel}</FooterLink>
            <button onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))} style={{ ...footLink, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>{t.consent.settings}</button>
          </FooterCol>
        </div>
        <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 11, color: T.warmGray, marginTop: 40, opacity: 0.7, textAlign: "center" }}>{t.footer.copyright}</p>
      </footer>

      {/* Floating CTA (tablet/desktop): bottom right, same show/hide rules as the mobile bar */}
      <a className="float-cta" data-show={stickyShown} href={reserveHref} onClick={onReserve(t.reserveCta)} tabIndex={stickyShown ? 0 : -1} aria-hidden={!stickyShown} style={asLink({ ...btnPrimary, borderRadius: 999, padding: "14px 28px" })}>{t.reserveCta}</a>

      {/* Sticky mobile CTA: hidden until the page is scrolled and while booking is in view */}
      <div className="sticky-cta" data-show={stickyShown} aria-hidden={!stickyShown}>
        <a href={reserveHref} onClick={onReserve(t.reserveCta)} tabIndex={stickyShown ? 0 : -1} style={asLink(btnPrimary)}>{t.reserveCta}</a>
      </div>
    </div>
  );
}

const footLink = { display: "block", padding: "8px 0", minHeight: 40, fontFamily: "'Karla', sans-serif", fontSize: 14, color: T.warmGrayLight, textDecoration: "none" };

const FooterCol = ({ title, children }) => (
  <div>
    <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: T.gold, marginBottom: 8 }}>{title}</p>
    {children}
  </div>
);

const FooterLink = ({ href, external, children, onClick }) => (
  <a href={href} onClick={onClick} style={footLink} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>
);
