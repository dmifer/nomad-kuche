"use client";

import { useState, useRef } from "react";
import { T } from "./theme";
import { trackThenGo } from "./analytics";
import { VOUCHER_FORM_ENDPOINT, OWNER_EMAIL, VOUCHER_MIN } from "./config";

const field = {
  width: "100%", padding: "14px 14px", minHeight: 48, borderRadius: 6,
  border: "1px solid rgba(196,147,63,0.35)", background: "rgba(245,240,232,0.04)",
  color: T.ivory, fontFamily: "'Karla', sans-serif", fontSize: 16, // 16px avoids iOS zoom on focus
};

export const formStyles = `
  .nk-form label { display: block; font-family: 'Karla', sans-serif; font-size: 13px; font-weight: 600;
    letter-spacing: .04em; color: ${T.warmGrayLight}; margin-bottom: 6px; }
  .nk-form select option { color: #2A2218; }
  .nk-form input:focus, .nk-form select:focus, .nk-form textarea:focus { outline: 2px solid ${T.gold}; outline-offset: 1px; }
  .nk-form input:user-invalid, .nk-form select:user-invalid, .nk-form textarea:user-invalid { border-color: #E0735C; }
  .nk-form .nk-hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
`;

/* Shared submit logic. POST JSON, and only after a 2xx answer fire the conversion and go to the
   thank-you page. Without an endpoint, fall back to the visitor's mail app and fire nothing. */
function useSubmit({ endpoint, kind, event, legacy, lang, subject, thanksUrl }) {
  const [state, setState] = useState("idle"); // idle | sending | error
  const sent = useRef(false); // one conversion per submission, even on double taps

  const submit = async (e, extra = () => ({})) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (sent.current || state === "sending") return;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.website) return; // honeypot: bots fill it, humans never see it
    delete data.website;
    const payload = { form: kind, language: lang, _subject: subject, ...data, ...extra(data) };

    if (!endpoint) {
      const body = Object.entries(payload).filter(([k]) => !k.startsWith("_")).map(([k, v]) => `${k}: ${v}`).join("\n");
      window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setState("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      sent.current = true;
      trackThenGo(event, legacy.event, legacy.params(payload), thanksUrl);
    } catch {
      setState("error");
    }
  };
  return { state, submit };
}

const Row = ({ label, htmlFor, children }) => (
  <div style={{ marginBottom: 18 }}>
    <label htmlFor={htmlFor}>{label}</label>
    {children}
  </div>
);

const SubmitButton = ({ sending, children }) => (
  <button type="submit" disabled={sending} style={{
    padding: "14px 36px", minHeight: 48, border: "none", borderRadius: 6,
    background: T.crimson, color: "white", fontFamily: "'Karla', sans-serif",
    fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
    cursor: sending ? "wait" : "pointer", opacity: sending ? 0.7 : 1, width: "100%", maxWidth: 360,
  }}>{children}</button>
);

const Honeypot = () => (
  <div className="nk-hp" aria-hidden="true">
    <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
  </div>
);

const Status = ({ state, t }) =>
  state === "error" ? (
    <p role="alert" style={{ color: "#E0735C", fontFamily: "'Karla', sans-serif", fontSize: 14, marginTop: 14 }}>{t.error}</p>
  ) : null;

export function VoucherForm({ t, lang }) {
  const g = t.gift;
  const [option, setOption] = useState("");
  const { state, submit } = useSubmit({
    endpoint: VOUCHER_FORM_ENDPOINT, kind: "voucher", event: "voucher_request", lang,
    legacy: { event: null, params: (p) => ({ voucher_option: p.option }) },
    subject: "Nomad Küche – voucher request", thanksUrl: t.thanks.href,
  });
  const label = (v) => g.options.find((o) => o.value === v)?.label ?? v;
  return (
    <form className="nk-form" onSubmit={(e) => submit(e, (d) => ({ option_label: label(d.option) }))} style={{ marginTop: 8, maxWidth: 560 }}>
      <Row label={g.options_label} htmlFor="v-option">
        <select id="v-option" name="option" required value={option} onChange={(e) => setOption(e.target.value)} style={field}>
          <option value="" disabled>{g.optionPlaceholder}</option>
          {g.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </Row>
      {option === "free_amount" && (
        <Row label={g.amount} htmlFor="v-amount">
          <input id="v-amount" name="amount_eur" type="number" inputMode="numeric" min={VOUCHER_MIN} step="1" required placeholder={`min. ${VOUCHER_MIN}`} style={field} />
        </Row>
      )}
      <Row label={g.name} htmlFor="v-name"><input id="v-name" name="name" type="text" autoComplete="name" required style={field} /></Row>
      <Row label={g.email} htmlFor="v-email"><input id="v-email" name="email" type="email" autoComplete="email" inputMode="email" required style={field} /></Row>
      <Row label={g.recipient} htmlFor="v-rec"><input id="v-rec" name="recipient" type="text" style={field} /></Row>
      <Row label={g.message} htmlFor="v-msg"><textarea id="v-msg" name="personal_message" rows={4} style={{ ...field, resize: "vertical" }} /></Row>
      <Row label={g.delivery} htmlFor="v-del">
        <select id="v-del" name="delivery" required defaultValue="pdf" style={field}>
          {g.deliveries.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </Row>
      <Honeypot />
      <SubmitButton sending={state === "sending"}>{state === "sending" ? g.sending : g.submit}</SubmitButton>
      <Status state={state} t={g} />
      <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 12, color: T.warmGrayLight, marginTop: 14, lineHeight: 1.6, maxWidth: 480 }}>{g.note}</p>
    </form>
  );
}
