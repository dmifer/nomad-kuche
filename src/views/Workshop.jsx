"use client";

import { content } from "../content";
import { PAGES } from "../pages";
import { WORKSHOPS } from "../config";
import { T } from "../theme";
import Layout from "../Layout";
import { FadeIn, ReviewsSection } from "../ui";
import { CalEmbed, LazyMount } from "../CalEmbed";
import { track, getSource } from "../analytics";
import { StarBurst, PetroSpiral, Divider, ImgPlaceholder } from "../ornaments";
import { sectionPad, sectionPadWide, headingStyle, subStyle, eyebrow, btnPrimary, asLink } from "../styles";

const PHOTOS = {
  manty: [
    { src: "/gallery_1.jpg", w: 960, h: 1280, alt: 0 },
    { src: "/gallery_3.jpg", w: 960, h: 1280, alt: 2 },
    { src: "/gallery_4.jpg", w: 990, h: 1280, alt: 3 },
  ],
  lagman: [{ src: "/lagman_1.jpg", w: 745, h: 881, alt: "item" }],
};

export default function Workshop({ lang = "en", id }) {
  const t = content[lang];
  const wp = t.workshop_page;
  const w = t.workshop.items.find((x) => x.id === id);
  const other = t.workshop.items.find((x) => x.id !== id);
  const slug = WORKSHOPS[id].slug;
  const photos = PHOTOS[id];

  return (
    <Layout lang={lang} pageKey={id} hasReserve>
      {/* ─── HEADER ─── */}
      <section style={{ background: T.dark, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 120, right: "8%", pointerEvents: "none" }}><PetroSpiral size={80} opacity={0.05} color={T.gold} /></div>
        <div style={{ ...sectionPad, paddingTop: 140, paddingBottom: 56, textAlign: "center" }}>
          <p style={eyebrow()}>{t.workshop.kicker}</p>
          <h1 style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400, fontSize: "clamp(36px, 6vw, 60px)", color: T.ivory, lineHeight: 1.15, margin: "0 auto 16px", maxWidth: 720 }}>{w.title}</h1>
          <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 17, color: T.warmGrayLight, fontStyle: "italic", maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.6 }}>{w.sub}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", marginBottom: 40 }}>
            {t.workshop.metrics.map((m) => (
              <div key={m.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 34, color: T.gold, lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontFamily: "'Karla', sans-serif", fontSize: 12, fontWeight: 500, color: T.warmGrayLight, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>{m.label}</div>
              </div>
            ))}
          </div>
          <a href="#reserve" onClick={() => track("reserve_click", { click_text: t.workshop.cta, click_url: "#reserve" })} style={asLink(btnPrimary)}>{t.workshop.cta}</a>
        </div>
      </section>

      {/* ─── PHOTOS ─── */}
      <section style={{ background: T.dark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 72px" }}>
          {photos.length > 1 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {photos.map((p) => (
                <img key={p.src} src={p.src} alt={t.gallery.alts[p.alt]} width={p.w} height={p.h} loading="lazy" decoding="async" style={{ width: "100%", height: "auto", aspectRatio: "4/3", objectFit: "cover", borderRadius: 10, display: "block" }} />
              ))}
            </div>
          ) : photos.length === 1 ? (
            <img src={photos[0].src} alt={photos[0].alt === "item" ? w.photoAlt : t.gallery.alts[photos[0].alt]} width={photos[0].w} height={photos[0].h} decoding="async" style={{ display: "block", margin: "0 auto", width: "100%", maxWidth: 520, height: "auto", borderRadius: 10 }} />
          ) : (
            <ImgPlaceholder aspect="16/7" borderRadius={10} gradient={`linear-gradient(135deg, ${T.darkMid}, ${T.warmGray})`} label={t.workshop.photoSoon} style={{ color: T.ivory }} />
          )}
        </div>
      </section>

      {/* ─── STEPS ─── */}
      <section id="workshop" style={{ background: T.dark, position: "relative", overflow: "hidden", borderTop: "1px solid rgba(196,147,63,0.1)" }}>
        <div style={sectionPadWide}>
          <FadeIn style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ ...headingStyle(T.ivory), textAlign: "center" }}>{wp.stepsTitle}</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {w.steps.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.08} style={{ height: "100%" }}>
                <div style={{ height: "100%", padding: "28px 24px", borderRadius: 8, border: "1px solid rgba(196,147,63,0.1)", background: "rgba(196,147,63,0.03)" }}>
                  <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 32, color: T.gold, opacity: 0.4 }}>{s.num}</span>
                  <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: 20, fontWeight: 500, color: T.ivory, margin: "8px 0" }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, color: T.warmGrayLight, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection t={t} />

      {/* ─── RESERVE (Cal.com) ─── */}
      <section id="reserve" style={{ background: T.ivory, position: "relative", overflow: "hidden", borderTop: `1px solid ${T.ivoryDark}` }}>
        <div style={{ position: "absolute", top: 40, left: "6%", pointerEvents: "none" }}><StarBurst size={44} opacity={0.05} color={T.crimson} /></div>
        <div style={{ ...sectionPad, maxWidth: 900 }}>
          <FadeIn style={{ textAlign: "center", marginBottom: 40 }}>
            <Divider color={T.crimson} opacity={0.2} width={120} />
            <div style={{ height: 28 }} />
            <h2 style={{ ...headingStyle(), textAlign: "center" }}>{t.reserve.title}</h2>
            <p style={{ ...subStyle(), margin: "0 auto 8px" }}>{t.reserve.text}</p>
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 13, color: T.warmGrayLight, margin: "0 auto" }}>
              {t.reserve.privatePre}
              <a href={`${t.home}#contact`} style={{ color: T.crimson, textDecoration: "underline", textUnderlineOffset: 3 }}>{t.reserve.privateLink}</a>{t.reserve.privatePost}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <LazyMount>
              <CalEmbed workshopId={id} loadingText={t.reserve.loading} unavailableText={t.reserve.unavailable} />
            </LazyMount>
          </FadeIn>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <a href={`https://cal.com/nomadkuche/${slug}`} target="_blank" rel="noopener" onClick={(e) => { e.currentTarget.href = `https://cal.com/nomadkuche/${slug}?source=${encodeURIComponent(getSource())}`; track("cal_fallback_click"); }} style={{ display: "inline-block", padding: "12px 8px", fontFamily: "'Karla', sans-serif", fontSize: 13, color: T.warmGray, textDecoration: "none" }}>
              {t.reserve.troublePre}<span style={{ color: T.crimson, textDecoration: "underline", textUnderlineOffset: 3 }}>{t.reserve.troubleLink}</span>
            </a>
          </div>

          <div style={{ textAlign: "center", marginTop: 32, fontFamily: "'Karla', sans-serif", fontSize: 14, color: T.warmGray, lineHeight: 2 }}>
            <p>{wp.alsoPre}<a href={PAGES[other.id][lang]} style={{ color: T.crimson, fontWeight: 600 }}>{other.title}</a></p>
            <p>{wp.giftPre}<a href={PAGES.gift[lang]} style={{ color: T.crimson, fontWeight: 600 }}>{wp.giftLink}</a></p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
