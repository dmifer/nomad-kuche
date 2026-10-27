"use client";

import { content } from "../content";
import { PAGES } from "../pages";
import { T } from "../theme";
import Layout from "../Layout";
import { FadeIn } from "../ui";
import { PetroSpiral, LeafBranch, KusKanat, StarBurst } from "../ornaments";
import { sectionPad, headingStyle, subStyle, eyebrow, btnPrimary, asLink } from "../styles";

export default function About({ lang = "en" }) {
  const t = content[lang];
  const ap = t.about_page;
  return (
    <Layout lang={lang} pageKey="story">
      {/* ─── STORY ─── */}
      <section id="about" style={{ background: T.ivory, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 120, right: 60, pointerEvents: "none" }}><PetroSpiral size={70} opacity={0.06} color={T.crimson} /></div>
        <div style={{ ...sectionPad, paddingTop: 140, display: "flex", gap: 60, alignItems: "flex-start", flexWrap: "wrap" }}>
          <FadeIn style={{ flex: "1 1 400px", minWidth: 280 }}>
            <p style={eyebrow(T.crimson)}>{ap.kicker}</p>
            <h1 style={{ ...headingStyle(), fontSize: "clamp(34px, 6vw, 44px)" }}>{t.about.title[0]}<br />{t.about.title[1]}</h1>
            {t.about.paragraphs.map((para, i) => <p key={i} style={subStyle()}>{para}</p>)}
          </FadeIn>
          <FadeIn delay={0.15} style={{ flex: "1 1 320px", minWidth: 260 }}>
            <img src="/about_photo.jpg" alt={t.about.imgAlt} width={853} height={1213} decoding="async" style={{ width: "100%", height: "auto", aspectRatio: "3/4", objectFit: "cover", borderRadius: 10, display: "block" }} />
          </FadeIn>
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section style={{ background: T.crimson, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 20, left: "5%", pointerEvents: "none" }}><KusKanat size={140} opacity={0.06} color={T.ivory} /></div>
        <div style={{ ...sectionPad, textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <StarBurst size={36} opacity={0.25} color={T.ivory} style={{ margin: "0 auto 28px", display: "block" }} />
            <h2 style={{ fontFamily: "'EB Garamond', serif", fontWeight: 400, fontSize: "clamp(26px, 4vw, 40px)", color: T.ivory, lineHeight: 1.3, maxWidth: 640, margin: "0 auto 20px", fontStyle: "italic" }}>{t.culture.quote}</h2>
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 15, color: "rgba(245,240,232,0.7)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>{t.culture.text}</p>
          </FadeIn>
        </div>
      </section>

      {/* ─── FOUNDER ─── */}
      <section id="founder" style={{ background: T.ivory, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 40, right: "10%", pointerEvents: "none" }}><LeafBranch size={100} opacity={0.04} color={T.crimson} /></div>
        <div style={{ ...sectionPad, display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}>
          <FadeIn style={{ flex: "1 1 280px", minWidth: 240 }}>
            <img src="/founder.jpeg" alt={t.founder.imgAlt} width={1100} height={1486} loading="lazy" decoding="async" style={{ width: "100%", height: "auto", aspectRatio: "3/4", objectFit: "cover", borderRadius: 10, display: "block" }} />
          </FadeIn>
          <FadeIn delay={0.15} style={{ flex: "1 1 440px", minWidth: 280 }}>
            <p style={eyebrow(T.crimson)}>{t.founder.kicker}</p>
            <h2 style={headingStyle()}>{t.founder.name}</h2>
            {t.founder.paragraphs.map((para, i) => <p key={i} style={{ ...subStyle(), marginBottom: 20 }}>{para}</p>)}
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, fontStyle: "italic", color: T.crimson, lineHeight: 1.5 }}>{t.founder.closing}</p>
          </FadeIn>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ background: T.dark }}>
        <div style={{ ...sectionPad, textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ ...headingStyle(T.ivory), textAlign: "center", marginBottom: 28 }}>{ap.ctaTitle}</h2>
            <a href={`${t.home}#workshop`} style={asLink(btnPrimary)}>{ap.cta}</a>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
