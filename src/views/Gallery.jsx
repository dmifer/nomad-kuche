"use client";

import { content } from "../content";
import { T } from "../theme";
import Layout from "../Layout";
import { FadeIn } from "../ui";
import { sectionPadWide, headingStyle, eyebrow } from "../styles";

const img = (extra) => ({ width: "100%", objectFit: "cover", borderRadius: 10, display: "block", ...extra });

export default function Gallery({ lang = "en" }) {
  const t = content[lang];
  const a = t.gallery.alts;
  return (
    <Layout lang={lang} pageKey="gallery">
      <section id="gallery" style={{ background: T.ivory, minHeight: "100vh", position: "relative" }}>
        <div style={{ ...sectionPadWide, paddingTop: 140 }}>
          <FadeIn style={{ textAlign: "center", marginBottom: 48 }}>
            <h1 style={{ ...headingStyle(), textAlign: "center", fontSize: "clamp(34px, 6vw, 48px)" }}>{t.gallery.title}</h1>
          </FadeIn>
          <div className="gallery-grid">
            <FadeIn className="g1"><img src="/gallery_1.jpg" alt={a[0]} width={960} height={1280} decoding="async" style={img({ height: "100%" })} /></FadeIn>
            <FadeIn delay={0.1} className="g2"><img src="/gallery_2.jpg" alt={a[1]} width={960} height={1280} loading="lazy" decoding="async" style={img({ height: "auto", aspectRatio: "3/4" })} /></FadeIn>
            <FadeIn delay={0.15} className="g3"><img src="/gallery_3.jpg" alt={a[2]} width={960} height={1280} loading="lazy" decoding="async" style={img({ height: "auto", aspectRatio: "3/4" })} /></FadeIn>
            <FadeIn delay={0.2} className="g4"><img src="/gallery_4.jpg" alt={a[3]} width={990} height={1280} loading="lazy" decoding="async" style={img({ height: "auto", aspectRatio: "16/9" })} /></FadeIn>
          </div>
          <style>{`
            .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
            .gallery-grid .g1 { grid-column: 1 / 3; grid-row: 1 / 3; }
            .gallery-grid .g2 { grid-column: 3 / 4; }
            .gallery-grid .g3 { grid-column: 4 / 5; }
            .gallery-grid .g4 { grid-column: 3 / 5; }
            @media (max-width: 640px) {
              .gallery-grid { grid-template-columns: 1fr 1fr; }
              .gallery-grid .g1 { grid-column: 1 / 3; grid-row: auto; }
              .gallery-grid .g1 img { height: auto !important; aspect-ratio: 4/3; }
              .gallery-grid .g2 { grid-column: 1 / 2; }
              .gallery-grid .g3 { grid-column: 2 / 3; }
              .gallery-grid .g4 { grid-column: 1 / 3; }
            }
          `}</style>
        </div>
      </section>
    </Layout>
  );
}
