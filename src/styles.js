import { T } from "./theme";

export const sectionPad = { padding: "100px 24px", maxWidth: 1100, margin: "0 auto" };
export const sectionPadWide = { padding: "100px 24px", maxWidth: 1200, margin: "0 auto" };

export const headingStyle = (color = T.textDark) => ({
  fontFamily: "'EB Garamond', serif", fontWeight: 500, fontSize: 40,
  color, margin: "0 0 16px", lineHeight: 1.2, letterSpacing: "-0.01em",
});

export const subStyle = (color = T.warmGray) => ({
  fontFamily: "'Karla', sans-serif", fontSize: 15, color,
  lineHeight: 1.7, maxWidth: 560, margin: "0 0 32px",
});

export const eyebrow = (color = T.gold) => ({
  fontFamily: "'Karla', sans-serif", fontSize: 12, fontWeight: 600, color,
  letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16,
});

export const btnPrimary = {
  padding: "14px 36px", minHeight: 48, border: "none", borderRadius: 6,
  background: T.crimson, color: "white", fontFamily: "'Karla', sans-serif",
  fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
  cursor: "pointer", transition: "all .25s",
};

export const btnOutline = (color = T.gold) => ({
  padding: "14px 36px", minHeight: 48, border: `1px solid ${color}`, borderRadius: 6,
  background: "transparent", color, fontFamily: "'Karla', sans-serif",
  fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
  cursor: "pointer", transition: "all .25s",
});

// For <a> elements styled as buttons
export const asLink = (style) => ({ ...style, display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" });
