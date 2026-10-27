"use client";

import { content } from "../content";
import { PAGES } from "../pages";
import { T } from "../theme";
import Layout from "../Layout";
import { FadeIn } from "../ui";
import { VoucherForm } from "../forms";
import { StarBurst } from "../ornaments";
import { sectionPad, headingStyle, subStyle, eyebrow } from "../styles";

export default function Gift({ lang = "en" }) {
  const t = content[lang];
  return (
    <Layout lang={lang} pageKey="gift">
      <section id="gift" style={{ background: T.darkMid, position: "relative", overflow: "hidden", minHeight: "100vh" }}>
        <div style={{ position: "absolute", top: 120, right: "8%", pointerEvents: "none" }}><StarBurst size={44} opacity={0.05} color={T.gold} /></div>
        <div style={{ ...sectionPad, paddingTop: 140 }}>
          <FadeIn>
            <p style={eyebrow()}>{t.gift.kicker}</p>
            <h1 style={{ ...headingStyle(T.ivory), fontSize: "clamp(34px, 6vw, 48px)", marginBottom: 20 }}>{t.gift.title}</h1>
            <p style={{ ...subStyle(T.warmGrayLight), marginBottom: 28 }}>{t.gift.text}</p>
            <VoucherForm t={t} lang={lang} />
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, color: T.warmGrayLight, marginTop: 40 }}>
              {t.workshop_page.alsoPre}
              {t.workshop.items.map((w, i) => (
                <span key={w.id}>{i > 0 && " · "}<a href={PAGES[w.id][lang]} style={{ color: T.gold }}>{w.title}</a></span>
              ))}
            </p>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
