"use client";

import { content } from "../content";
import { PAGES } from "../pages";
import { T } from "../theme";
import Layout from "../Layout";
import { FadeIn, TLink, ReviewsSection } from "../ui";
import { SpiralSun, KusKanat, PetroSpiral, LeafBranch, StarBurst, TileMedallion, Divider, ImgPlaceholder } from "../ornaments";
import { sectionPad, sectionPadWide, headingStyle, subStyle, eyebrow, btnPrimary, btnOutline, asLink } from "../styles";
import { MAPS_REVIEWS_URL, OWNER_EMAIL, WHATSAPP_NUMBER, WHATSAPP_URL } from "../config";

// TODO: replace the Lagman placeholder with a real photo (public/lagman_1.jpg) when available.
const WORKSHOP_IMAGES = { manty: { src: "/gallery_4.jpg", w: 990, h: 1280 }, lagman: null };

export default function Home({ lang = "en" }) {
  const t = content[lang];
  const h = t.home_page;
  const igUrl = "https://instagram.com/nomad_kuche";

  return (
    <Layout lang={lang} pageKey="home">
      {/* ─── HERO ─── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "120px 24px 48px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 60, left: "8%", pointerEvents: "none" }}><SpiralSun size={140} opacity={0.04} color={T.gold} /></div>
        <div style={{ position: "absolute", bottom: 120, right: "6%", pointerEvents: "none" }}><TileMedallion size={180} opacity={0.03} color={T.gold} /></div>
        <div style={{ position: "absolute", top: "40%", left: "3%", pointerEvents: "none" }}><PetroSpiral size={50} opacity={0.05} color={T.gold} /></div>
        <div style={{ position: "absolute", top: "30%", right: "10%", pointerEvents: "none" }}><LeafBranch size={90} opacity={0.04} color={T.gold} /></div>
        <div style={{ position: "absolute", bottom: 80, left: "20%", pointerEvents: "none" }}><StarBurst size={40} opacity={0.05} color={T.gold} /></div>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 800, height: 800, borderRadius: "50%", maxWidth: "100vw",
          background: "radial-gradient(circle, rgba(139,26,26,0.06) 0%, transparent 70%)", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, animation: "fadeUp .9s ease" }}>
          <KusKanat size={100} opacity={0.15} color={T.gold} style={{ margin: "0 auto 32px", display: "block" }} />
          <p style={{ ...eyebrow(), fontSize: 13, letterSpacing: "0.2em", marginBottom: 20 }}>{t.hero.kicker}</p>
          <h1 style={{
            fontFamily: "'EB Garamond', serif", fontWeight: 400, fontSize: "clamp(40px, 6vw, 72px)",
            color: T.ivory, lineHeight: 1.1, maxWidth: 700, margin: "0 auto 24px", letterSpacing: "-0.02em",
          }}>{t.hero.title[0]}<br />{t.hero.title[1]}<br />{t.hero.title[2]}</h1>
          <p style={{
            fontFamily: "'Karla', sans-serif", fontSize: 17, color: T.warmGrayLight,
            lineHeight: 1.7, maxWidth: 480, margin: "0 auto 44px", fontWeight: 300,
          }}>{t.hero.sub}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <TLink href="#workshop" event="reserve_click" params={{ click_text: t.reserveCta, click_url: "#workshop" }} style={asLink(btnPrimary)}>{t.reserveCta}</TLink>
            <a href={PAGES.story[lang]} style={asLink(btnOutline(T.warmGrayLight))}>{t.hero.discover}</a>
            <TLink href={igUrl} target="_blank" rel="noopener noreferrer" event="instagram_click" params={{ link_url: igUrl }} style={asLink(btnOutline(T.warmGrayLight))}>{t.hero.instagram}</TLink>
            <TLink href={MAPS_REVIEWS_URL} target="_blank" rel="noopener noreferrer" event="reviews_click" params={{ link_url: MAPS_REVIEWS_URL }} style={asLink(btnOutline(T.warmGrayLight))}>{t.hero.reviews}</TLink>
          </div>
        </div>

        {/* In normal flow (not absolute) so it can never overlap the buttons on short viewports */}
        <div style={{
          position: "relative", zIndex: 1, marginTop: 48,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "fadeIn 1.2s ease 0.5s both",
        }}>
          <span style={{ fontFamily: "'Karla', sans-serif", fontSize: 11, color: T.warmGrayLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.hero.scroll}</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${T.warmGrayLight}, transparent)` }} />
        </div>
      </section>

      {/* ─── WORKSHOP CARDS ─── */}
      <section id="workshop" style={{ background: T.ivory, position: "relative", overflow: "hidden" }}>
        <div style={sectionPadWide}>
          <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
            <Divider color={T.crimson} opacity={0.2} width={120} />
            <div style={{ height: 28 }} />
            <p style={{ ...eyebrow(T.crimson) }}>{t.workshop.kicker}</p>
            <h2 style={{ ...headingStyle(), textAlign: "center" }}>{t.workshop.title}</h2>
            <p style={{ ...subStyle(), margin: "0 auto" }}>{t.workshop.sub}</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {t.workshop.items.map((w, i) => {
              const img = WORKSHOP_IMAGES[w.id];
              return (
                <FadeIn key={w.id} delay={i * 0.12} style={{ height: "100%" }}>
                  <TLink href={PAGES[w.id][lang]} className="card-link" event="offer_cta_click" params={{ click_text: h.workshopsCta, offer_name: `workshop_${w.id}` }}>
                    <div className="card" style={{ background: "white", borderRadius: 10, overflow: "hidden", border: `1px solid ${T.ivoryDark}`, height: "100%", display: "flex", flexDirection: "column" }}>
                      {img ? (
                        <img src={img.src} alt="" width={img.w} height={img.h} loading="lazy" decoding="async" style={{ width: "100%", height: "auto", aspectRatio: "16/10", objectFit: "cover", display: "block" }} />
                      ) : (
                        <ImgPlaceholder aspect="16/10" borderRadius={0} label={t.workshop.photoSoon} />
                      )}
                      <div style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", flex: 1 }}>
                        <span style={{ fontFamily: "'Karla', sans-serif", fontSize: 11, fontWeight: 600, color: T.crimson, letterSpacing: "0.12em", textTransform: "uppercase", background: `${T.crimson}0D`, padding: "4px 12px", borderRadius: 20, alignSelf: "flex-start" }}>{h.facts}</span>
                        <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: 26, fontWeight: 500, color: T.textDark, margin: "18px 0 10px" }}>{w.title}</h3>
                        <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, color: T.warmGray, lineHeight: 1.7, flex: 1 }}>{w.sub}</p>
                        <span style={{ marginTop: 20, fontFamily: "'Karla', sans-serif", fontSize: 14, fontWeight: 600, color: T.crimson, letterSpacing: "0.04em" }}>{h.workshopsCta}</span>
                      </div>
                    </div>
                  </TLink>
                </FadeIn>
              );
            })}
            <FadeIn delay={t.workshop.items.length * 0.12} style={{ height: "100%" }}>
              <TLink href={PAGES.gift[lang]} className="card-link" event="offer_cta_click" params={{ click_text: h.gift.cta, offer_name: "gift_voucher" }}>
                <div className="card" style={{ background: "white", borderRadius: 10, overflow: "hidden", border: `1px solid ${T.ivoryDark}`, height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ aspectRatio: "16/10", background: `linear-gradient(135deg, ${T.crimson}, ${T.darkMid})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <StarBurst size={96} opacity={0.5} color={T.ivory} />
                  </div>
                  <div style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <span style={{ fontFamily: "'Karla', sans-serif", fontSize: 11, fontWeight: 600, color: T.crimson, letterSpacing: "0.12em", textTransform: "uppercase", background: `${T.crimson}0D`, padding: "4px 12px", borderRadius: 20, alignSelf: "flex-start" }}>{h.gift.tag}</span>
                    <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: 26, fontWeight: 500, color: T.textDark, margin: "18px 0 10px" }}>{h.gift.title}</h3>
                    <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, color: T.warmGray, lineHeight: 1.7, flex: 1 }}>{h.gift.text}</p>
                    <span style={{ marginTop: 20, fontFamily: "'Karla', sans-serif", fontSize: 14, fontWeight: 600, color: T.crimson, letterSpacing: "0.04em" }}>{h.gift.cta} →</span>
                  </div>
                </div>
              </TLink>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── CULTURE QUOTE ─── */}
      <section style={{ background: T.crimson, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 20, right: "8%", pointerEvents: "none" }}><SpiralSun size={120} opacity={0.08} color={T.ivory} /></div>
        <div style={{ position: "absolute", bottom: 20, left: "5%", pointerEvents: "none" }}><KusKanat size={140} opacity={0.06} color={T.ivory} /></div>
        <div style={{ ...sectionPad, textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <StarBurst size={36} opacity={0.25} color={T.ivory} style={{ margin: "0 auto 28px", display: "block" }} />
            <h2 style={{
              fontFamily: "'EB Garamond', serif", fontWeight: 400, fontSize: "clamp(28px, 4vw, 44px)",
              color: T.ivory, lineHeight: 1.3, maxWidth: 640, margin: "0 auto 20px", fontStyle: "italic",
            }}>{t.culture.quote}</h2>
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 15, color: "rgba(245,240,232,0.7)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>{t.culture.text}</p>
          </FadeIn>
        </div>
      </section>

      {/* ─── ABOUT TEASER ─── */}
      <section id="about" style={{ background: T.ivory, position: "relative", overflow: "hidden" }}>
        <div style={{ ...sectionPad, display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}>
          <FadeIn style={{ flex: "1 1 400px", minWidth: 280 }}>
            <p style={eyebrow(T.crimson)}>{t.about.kicker}</p>
            <h2 style={headingStyle()}>{t.about.title[0]}<br />{t.about.title[1]}</h2>
            <p style={subStyle()}>{t.about.paragraphs[0]}</p>
            <p style={subStyle()}>{t.about.paragraphs[3]}</p>
            <a href={PAGES.story[lang]} style={{ display: "inline-block", padding: "12px 0", fontFamily: "'Karla', sans-serif", fontSize: 14, fontWeight: 600, color: T.crimson, textDecoration: "none", letterSpacing: "0.04em" }}>{h.aboutTeaserCta}</a>
          </FadeIn>
          <FadeIn delay={0.15} style={{ flex: "1 1 320px", minWidth: 260 }}>
            <img src="/about_photo.jpg" alt={t.about.imgAlt} width={853} height={1213} loading="lazy" decoding="async" style={{ width: "100%", height: "auto", aspectRatio: "3/4", objectFit: "cover", borderRadius: 10, display: "block", maxHeight: 560 }} />
          </FadeIn>
        </div>
      </section>

      <ReviewsSection t={t} />

      {/* ─── PRIVATE EVENTS & COLLABORATIONS ─── */}
      <section id="experiences" style={{ background: T.dark, position: "relative", overflow: "hidden" }}>
        <div style={sectionPad}>
          <FadeIn style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ ...headingStyle(T.ivory), textAlign: "center" }}>{h.private.title}</h2>
            <p style={{ ...subStyle(T.warmGrayLight), margin: "0 auto" }}>{h.private.sub}</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {t.experiences.cards.slice(1).map((card, i) => (
              <FadeIn key={card.offer} delay={i * 0.12} style={{ height: "100%" }}>
                <div style={{ height: "100%", padding: "32px 28px", borderRadius: 10, border: "1px solid rgba(196,147,63,0.15)", background: "rgba(196,147,63,0.03)", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontFamily: "'Karla', sans-serif", fontSize: 11, fontWeight: 600, color: T.gold, letterSpacing: "0.12em", textTransform: "uppercase", alignSelf: "flex-start" }}>{card.tag}</span>
                  <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: 24, fontWeight: 500, color: T.ivory, margin: "14px 0 12px" }}>{card.title}</h3>
                  <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, color: T.warmGrayLight, lineHeight: 1.7, flex: 1 }}>{card.desc}</p>
                  <TLink href="#contact" event="offer_cta_click" params={{ click_text: card.ctaLabel, offer_name: card.offer }} style={{ marginTop: 16, padding: "12px 0", fontFamily: "'Karla', sans-serif", fontSize: 14, fontWeight: 600, color: T.gold, textDecoration: "none" }}>{card.ctaLabel}</TLink>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ background: T.darkMid, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 40, right: "8%", pointerEvents: "none" }}><SpiralSun size={100} opacity={0.03} color={T.gold} /></div>
        <div style={sectionPad}>
          <FadeIn>
            <p style={eyebrow()}>{t.contact.kicker}</p>
            <h2 style={{ ...headingStyle(T.ivory), marginBottom: 20 }}>{t.contact.title[0]}<br />{t.contact.title[1]}</h2>
            <p style={{ ...subStyle(T.warmGrayLight), marginBottom: 24 }}>{t.contact.text}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <TLink href={`mailto:${OWNER_EMAIL}`} event="email_click" params={{ link_url: `mailto:${OWNER_EMAIL}` }} style={{ fontFamily: "'Karla', sans-serif", fontSize: 15, color: T.gold, textDecoration: "none", display: "flex", alignItems: "center", gap: 10, padding: "10px 0" }}>
                <span style={{ fontSize: 18 }}>✉</span> {OWNER_EMAIL}
              </TLink>
              <TLink href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" event="whatsapp_click" params={{ link_url: WHATSAPP_URL }} style={{ fontFamily: "'Karla', sans-serif", fontSize: 15, color: T.gold, textDecoration: "none", display: "flex", alignItems: "center", gap: 10, padding: "10px 0" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4z" /><path d="M9 9.5c.5 2.5 2.5 4.5 5 5l1.2-1.2-2-1-.8.7c-.8-.4-1.6-1.2-2-2l.7-.8-1-2z" /></svg>
                WhatsApp {WHATSAPP_NUMBER}
              </TLink>
              <TLink href={igUrl} target="_blank" rel="noopener noreferrer" event="instagram_click" params={{ link_url: igUrl }} style={{ fontFamily: "'Karla', sans-serif", fontSize: 15, color: T.gold, textDecoration: "none", display: "flex", alignItems: "center", gap: 10, padding: "10px 0" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill={T.gold} stroke="none" /></svg>
                @nomad_kuche
              </TLink>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
