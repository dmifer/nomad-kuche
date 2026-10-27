import { content } from "./content";
import { T } from "./theme";
import Layout from "./Layout";

const serif = "'EB Garamond', serif";
const sans = "'Karla', sans-serif";

function Shell({ lang, pageKey, children }) {
  return (
    <Layout lang={lang} pageKey={pageKey}>
      <main style={{ background: T.dark, color: T.textLight, minHeight: "70vh", padding: "130px 24px 64px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>{children}</div>
      </main>
    </Layout>
  );
}

const h1 = { fontFamily: serif, fontWeight: 500, fontSize: "clamp(32px, 6vw, 44px)", margin: "0 0 28px", lineHeight: 1.2 };

export function ImpressumPage({ lang }) {
  const t = content[lang];
  const p = t.legal.impressum;
  return (
    <Shell lang={lang} pageKey="impressum">
      <h1 style={h1}>{p.title}</h1>
      <dl style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.7 }}>
        {p.rows.map((r) => (
          <div key={r.label} style={{ padding: "14px 0", borderTop: "1px solid rgba(196,147,63,0.15)" }}>
            <dt style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: T.warmGrayLight }}>{r.label}</dt>
            <dd style={{ margin: 0, overflowWrap: "anywhere" }}>
              {r.href ? <a href={r.href} style={{ color: T.gold }} {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{r.value}</a> : r.value}
            </dd>
          </div>
        ))}
      </dl>
    </Shell>
  );
}

export function PrivacyPage({ lang }) {
  const t = content[lang];
  const p = t.legal.privacy;
  return (
    <Shell lang={lang} pageKey="privacy">
      <h1 style={{ ...h1, marginBottom: 12 }}>{p.title}</h1>
      <p style={{ fontFamily: sans, fontSize: 13, color: T.warmGrayLight, marginBottom: 20 }}>{p.updated}</p>
      {p.sections.map((s) => (
        <section key={s.h} style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 24, marginBottom: 10 }}>
            {s.h}
          </h2>
          {s.p.map((para, i) => (
            <p key={i} style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.75, color: T.warmGrayLight, marginBottom: 12, overflowWrap: "anywhere" }}>{para}</p>
          ))}
        </section>
      ))}
    </Shell>
  );
}

export function ThankYouPage({ lang }) {
  const t = content[lang];
  const k = t.thanks;
  return (
    <Shell lang={lang} pageKey="thanks">
      <h1 style={h1}>{k.title}</h1>
      <p style={{ fontFamily: sans, fontSize: 17, lineHeight: 1.7, color: T.warmGrayLight, marginBottom: 32 }}>{k.text}</p>
      <h2 style={{ fontFamily: serif, fontWeight: 500, fontSize: 24, marginBottom: 12 }}>{k.next}</h2>
      <ol style={{ fontFamily: sans, fontSize: 15, lineHeight: 1.7, color: T.warmGrayLight, paddingLeft: 22, marginBottom: 36 }}>
        {k.steps.map((s) => <li key={s} style={{ marginBottom: 8 }}>{s}</li>)}
      </ol>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href={t.home} style={{ padding: "14px 28px", minHeight: 48, borderRadius: 6, background: T.crimson, color: "white", fontFamily: sans, fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>{k.back}</a>
        <a href="https://instagram.com/nomad_kuche" target="_blank" rel="noopener noreferrer" style={{ padding: "14px 28px", minHeight: 48, borderRadius: 6, border: `1px solid ${T.gold}`, color: T.gold, fontFamily: sans, fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", textDecoration: "none" }}>{k.instagram}</a>
      </div>
    </Shell>
  );
}
