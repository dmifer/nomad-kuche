import { T } from "./theme";

/* ─── SVG Ornament Components ─── */

// Rounded so server and client render identical attribute strings
const r3 = (n) => Math.round(n * 1000) / 1000;

export const SpiralSun = ({ size = 80, opacity = 0.08, color = T.gold, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity, ...style }} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <path d="M50 50 C50 46,54 44,56 46 C58 48,56 52,52 52 C48 52,44 48,46 44 C48 40,54 38,58 42 C62 46,60 54,54 56 C48 58,42 52,44 46 C46 40,52 36,58 40" />
    <path d="M50 28 C48 22,52 18,50 14" /><path d="M50 72 C52 78,48 82,50 86" />
    <path d="M28 50 C22 48,18 52,14 50" /><path d="M72 50 C78 52,82 48,86 50" />
    <path d="M35 35 C30 30,28 26,24 24" /><path d="M65 35 C70 30,72 26,76 24" />
    <path d="M35 65 C30 70,28 74,24 76" /><path d="M65 65 C70 70,72 74,76 76" />
    <circle cx="50" cy="12" r="1.5" fill={color} stroke="none" />
    <circle cx="50" cy="88" r="1.5" fill={color} stroke="none" />
    <circle cx="12" cy="50" r="1.5" fill={color} stroke="none" />
    <circle cx="88" cy="50" r="1.5" fill={color} stroke="none" />
  </svg>
);

export const KusKanat = ({ size = 120, opacity = 0.06, color = T.gold, style = {}, flip = false }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 120 60" style={{ opacity, transform: flip ? "scaleX(-1)" : "none", ...style }} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <path d="M60 30 C50 28,40 20,30 22 C20 24,18 32,24 34 C30 36,38 30,36 24" />
    <path d="M60 30 C70 28,80 20,90 22 C100 24,102 32,96 34 C90 36,82 30,84 24" />
    <path d="M36 24 C34 20,30 20,30 24" /><path d="M84 24 C86 20,90 20,90 24" />
    <circle cx="60" cy="30" r="2" fill={color} stroke="none" />
    <path d="M42 26 L38 18" /><path d="M48 24 L46 16" />
    <path d="M72 26 L76 18" /><path d="M78 24 L80 16" />
  </svg>
);

export const PetroSpiral = ({ size = 60, opacity = 0.07, color = T.gold, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity, ...style }} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <path d="M30 30 C30 27,33 26,34 28 C35 30,33 33,30 33 C27 33,24 30,26 27 C28 24,33 22,36 26 C39 30,36 36,30 37 C24 38,20 32,22 27" />
  </svg>
);

export const LeafBranch = ({ size = 80, opacity = 0.06, color = T.gold, style = {} }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity, ...style }} fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round">
    <path d="M10 40 L70 8" />
    <path d="M20 36 L16 28" /><path d="M28 32 L24 24" /><path d="M36 28 L32 20" />
    <path d="M44 24 L40 16" /><path d="M52 20 L48 12" />
    <path d="M20 36 L26 34" /><path d="M28 32 L34 30" /><path d="M36 28 L42 26" />
    <path d="M44 24 L50 22" /><path d="M52 20 L58 18" />
  </svg>
);

export const StarBurst = ({ size = 50, opacity = 0.08, color = T.gold, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" style={{ opacity, ...style }} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
    <circle cx="25" cy="25" r="4" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
      const rad = (a * Math.PI) / 180;
      return <line key={i} x1={r3(25 + 8 * Math.cos(rad))} y1={r3(25 + 8 * Math.sin(rad))} x2={r3(25 + 16 * Math.cos(rad))} y2={r3(25 + 16 * Math.sin(rad))} />;
    })}
  </svg>
);

export const TileMedallion = ({ size = 100, opacity = 0.05, color = T.gold, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity, ...style }} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
    <circle cx="50" cy="50" r="40" /><circle cx="50" cy="50" r="30" /><circle cx="50" cy="50" r="8" />
    {[0, 60, 120, 180, 240, 300].map((a, i) => {
      const rad = (a * Math.PI) / 180;
      return <line key={i} x1={r3(50 + 10 * Math.cos(rad))} y1={r3(50 + 10 * Math.sin(rad))} x2={r3(50 + 28 * Math.cos(rad))} y2={r3(50 + 28 * Math.sin(rad))} />;
    })}
    {[30, 90, 150, 210, 270, 330].map((a, i) => {
      const rad = (a * Math.PI) / 180;
      return <circle key={i} cx={r3(50 + 35 * Math.cos(rad))} cy={r3(50 + 35 * Math.sin(rad))} r="2" fill={color} stroke="none" />;
    })}
  </svg>
);

export const Divider = ({ color = T.gold, opacity = 0.3, width = 200 }) => (
  <svg width={width} height="20" viewBox={`0 0 ${width} 20`} style={{ opacity, display: "block", margin: "0 auto" }} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
    <line x1="0" y1="10" x2={width * 0.35} y2="10" />
    <path d={`M${width * 0.38} 10 C${width * 0.42} 4,${width * 0.46} 4,${width * 0.5} 10 C${width * 0.54} 16,${width * 0.58} 16,${width * 0.62} 10`} />
    <line x1={width * 0.65} y1="10" x2={width} y2="10" />
  </svg>
);


/* ─── Image Placeholder ─── */
export const ImgPlaceholder = ({ label = "Photo", aspect = "4/3", gradient = `linear-gradient(135deg, ${T.ivoryDark}, ${T.warmGrayLight})`, borderRadius = 8, style = {} }) => (
  <div style={{
    aspectRatio: aspect, background: gradient, borderRadius,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: T.warmGray, fontFamily: "'Karla', sans-serif", fontSize: 12,
    letterSpacing: "0.1em", textTransform: "uppercase", ...style,
  }}>
    <span style={{ opacity: 0.5 }}>{label}</span>
  </div>
);
