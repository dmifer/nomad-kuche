import { useState, useEffect, useRef, useCallback } from "react";

/* ─── palette & tokens ─── */
const T = {
  crimson: "#8B1A1A",
  crimsonLight: "#A52A2A",
  gold: "#C4933F",
  goldLight: "#D4A94F",
  ivory: "#F5F0E8",
  ivoryDark: "#EDE6D8",
  dark: "#1A1410",
  darkMid: "#2A2218",
  warmGray: "#6B5E50",
  warmGrayLight: "#9B8E7E",
  textLight: "#F5F0E8",
  textDark: "#2A2218",
};

/* ─── SVG Ornament Components ─── */

const SpiralSun = ({ size = 80, opacity = 0.08, color = T.gold, style = {} }) => (
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

const KusKanat = ({ size = 120, opacity = 0.06, color = T.gold, style = {}, flip = false }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 120 60" style={{ opacity, transform: flip ? "scaleX(-1)" : "none", ...style }} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <path d="M60 30 C50 28,40 20,30 22 C20 24,18 32,24 34 C30 36,38 30,36 24" />
    <path d="M60 30 C70 28,80 20,90 22 C100 24,102 32,96 34 C90 36,82 30,84 24" />
    <path d="M36 24 C34 20,30 20,30 24" /><path d="M84 24 C86 20,90 20,90 24" />
    <circle cx="60" cy="30" r="2" fill={color} stroke="none" />
    <path d="M42 26 L38 18" /><path d="M48 24 L46 16" />
    <path d="M72 26 L76 18" /><path d="M78 24 L80 16" />
  </svg>
);

const PetroSpiral = ({ size = 60, opacity = 0.07, color = T.gold, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity, ...style }} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <path d="M30 30 C30 27,33 26,34 28 C35 30,33 33,30 33 C27 33,24 30,26 27 C28 24,33 22,36 26 C39 30,36 36,30 37 C24 38,20 32,22 27" />
  </svg>
);

const LeafBranch = ({ size = 80, opacity = 0.06, color = T.gold, style = {} }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity, ...style }} fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round">
    <path d="M10 40 L70 8" />
    <path d="M20 36 L16 28" /><path d="M28 32 L24 24" /><path d="M36 28 L32 20" />
    <path d="M44 24 L40 16" /><path d="M52 20 L48 12" />
    <path d="M20 36 L26 34" /><path d="M28 32 L34 30" /><path d="M36 28 L42 26" />
    <path d="M44 24 L50 22" /><path d="M52 20 L58 18" />
  </svg>
);

const StarBurst = ({ size = 50, opacity = 0.08, color = T.gold, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" style={{ opacity, ...style }} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round">
    <circle cx="25" cy="25" r="4" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
      const rad = (a * Math.PI) / 180;
      return <line key={i} x1={25 + 8 * Math.cos(rad)} y1={25 + 8 * Math.sin(rad)} x2={25 + 16 * Math.cos(rad)} y2={25 + 16 * Math.sin(rad)} />;
    })}
  </svg>
);

const TileMedallion = ({ size = 100, opacity = 0.05, color = T.gold, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity, ...style }} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
    <circle cx="50" cy="50" r="40" /><circle cx="50" cy="50" r="30" /><circle cx="50" cy="50" r="8" />
    {[0, 60, 120, 180, 240, 300].map((a, i) => {
      const rad = (a * Math.PI) / 180;
      return <line key={i} x1={50 + 10 * Math.cos(rad)} y1={50 + 10 * Math.sin(rad)} x2={50 + 28 * Math.cos(rad)} y2={50 + 28 * Math.sin(rad)} />;
    })}
    {[30, 90, 150, 210, 270, 330].map((a, i) => {
      const rad = (a * Math.PI) / 180;
      return <circle key={i} cx={50 + 35 * Math.cos(rad)} cy={50 + 35 * Math.sin(rad)} r="2" fill={color} stroke="none" />;
    })}
  </svg>
);

const Divider = ({ color = T.gold, opacity = 0.3, width = 200 }) => (
  <svg width={width} height="20" viewBox={`0 0 ${width} 20`} style={{ opacity, display: "block", margin: "0 auto" }} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round">
    <line x1="0" y1="10" x2={width * 0.35} y2="10" />
    <path d={`M${width * 0.38} 10 C${width * 0.42} 4,${width * 0.46} 4,${width * 0.5} 10 C${width * 0.54} 16,${width * 0.58} 16,${width * 0.62} 10`} />
    <line x1={width * 0.65} y1="10" x2={width} y2="10" />
  </svg>
);

/* ─── Intersection Observer hook ─── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const FadeIn = ({ children, delay = 0, style = {}, className = "" }) => {
  const [ref, visible] = useFadeIn(0.12);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
};

/* ─── Cal.com Inline Embed ─── */
const CalEmbed = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Cal.com requires a loader stub to be defined before the script loads.
    // This queues commands so the script can process them on ready.
    (function (C, A, L) {
      const p = (a, ar) => a.q.push(ar);
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const s = d.createElement("script");
          s.src = A;
          s.async = true;
          s.onload = () => setLoaded(true);
          d.head.appendChild(s);
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, [L, namespace, api]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", "manty-workshop", { origin: "https://cal.com" });
    window.Cal.ns["manty-workshop"]("inline", {
      elementOrSelector: "#cal-inline-embed",
      calLink: "nomadkuche/manty-workshop",
      layout: "month_view",
      config: { layout: "month_view" },
    });
    window.Cal.ns["manty-workshop"]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <div style={{
      background: "white", borderRadius: 12, overflow: "hidden",
      border: `1px solid ${T.ivoryDark}`,
      boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
      position: "relative",
    }}>
      {/* Loading state */}
      {!loaded && (
        <div style={{
          padding: "60px 40px", textAlign: "center",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 16,
          minHeight: 400,
        }}>
          <div style={{
            width: 36, height: 36,
            border: `2px solid ${T.ivoryDark}`,
            borderTopColor: T.crimson,
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }} />
          <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, color: T.warmGray }}>
            Loading booking calendar…
          </p>
        </div>
      )}
      <div id="cal-inline-embed" style={{ width: "100%", minHeight: loaded ? 500 : 0, overflow: "auto" }} />
    </div>
  );
};


/* ─── Image Placeholder ─── */
const ImgPlaceholder = ({ aspect = "4/3", gradient = `linear-gradient(135deg, ${T.ivoryDark}, ${T.warmGrayLight})`, borderRadius = 8, style = {} }) => (
  <div style={{
    aspectRatio: aspect, background: gradient, borderRadius,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: T.warmGray, fontFamily: "'Karla', sans-serif", fontSize: 12,
    letterSpacing: "0.1em", textTransform: "uppercase", ...style,
  }}>
    <span style={{ opacity: 0.5 }}>Photo</span>
  </div>
);

/* ─── Main App ─── */
export default function NomadKuche() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fonts loaded in index.html via <link> for faster rendering

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Experiences", id: "experiences" },
    { label: "Workshop", id: "workshop" },
    { label: "Gallery", id: "gallery" },
    { label: "Founder", id: "founder" },
    { label: "Contact", id: "contact" },
  ];

  const sectionPad = { padding: "100px 24px", maxWidth: 1100, margin: "0 auto" };
  const sectionPadWide = { padding: "100px 24px", maxWidth: 1200, margin: "0 auto" };

  const headingStyle = (color = T.textDark) => ({
    fontFamily: "'EB Garamond', serif", fontWeight: 500, fontSize: 40,
    color, margin: "0 0 16px", lineHeight: 1.2, letterSpacing: "-0.01em",
  });

  const subStyle = (color = T.warmGray) => ({
    fontFamily: "'Karla', sans-serif", fontSize: 15, color,
    lineHeight: 1.7, maxWidth: 560, margin: "0 0 32px",
  });

  const btnPrimary = {
    padding: "14px 36px", border: "none", borderRadius: 6,
    background: T.crimson, color: "white", fontFamily: "'Karla', sans-serif",
    fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
    cursor: "pointer", transition: "all .25s",
  };

  const btnOutline = (color = T.gold) => ({
    padding: "14px 36px", border: `1px solid ${color}`, borderRadius: 6,
    background: "transparent", color, fontFamily: "'Karla', sans-serif",
    fontSize: 14, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase",
    cursor: "pointer", transition: "all .25s",
  });

  return (
    <div style={{ background: T.dark, color: T.textLight, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${T.crimson}; color: white; }
        input::placeholder, textarea::placeholder { color: ${T.warmGrayLight}; }
      `}</style>

      {/* ─── NAV ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "12px 32px" : "20px 32px",
        background: scrolled ? "rgba(26,20,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all .35s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
          fontFamily: "'EB Garamond', serif", fontSize: 22, fontWeight: 500,
          color: T.ivory, cursor: "pointer", letterSpacing: "0.02em",
        }}>Nomad Küche</div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {navLinks.map((l) => (
            <span key={l.id} onClick={() => scrollTo(l.id)} style={{
              fontFamily: "'Karla', sans-serif", fontSize: 13, fontWeight: 500,
              color: T.warmGrayLight, cursor: "pointer", letterSpacing: "0.06em",
              textTransform: "uppercase", transition: "color .2s",
            }} onMouseEnter={(e) => e.target.style.color = T.gold}
               onMouseLeave={(e) => e.target.style.color = T.warmGrayLight}>
              {l.label}
            </span>
          ))}
          <button onClick={() => scrollTo("reserve")} style={{
            ...btnOutline(T.gold), padding: "8px 24px", fontSize: 12,
          }}>Reserve</button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          color: T.ivory, fontSize: 24, padding: 4,
        }} className="mobile-menu-btn">{menuOpen ? "✕" : "☰"}</button>

        <style>{`
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: block !important; }
          }
        `}</style>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(26,20,16,0.97)", backdropFilter: "blur(12px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 32, animation: "fadeIn .25s ease",
        }}>
          {navLinks.map((l) => (
            <span key={l.id} onClick={() => scrollTo(l.id)} style={{
              fontFamily: "'EB Garamond', serif", fontSize: 28, color: T.ivory,
              cursor: "pointer", letterSpacing: "0.02em",
            }}>{l.label}</span>
          ))}
          <button onClick={() => { setMenuOpen(false); scrollTo("reserve"); }} style={btnPrimary}>Reserve a Spot</button>
        </div>
      )}

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "120px 24px 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 60, left: "8%", pointerEvents: "none" }}><SpiralSun size={140} opacity={0.04} color={T.gold} /></div>
        <div style={{ position: "absolute", bottom: 120, right: "6%", pointerEvents: "none" }}><TileMedallion size={180} opacity={0.03} color={T.gold} /></div>
        <div style={{ position: "absolute", top: "40%", left: "3%", pointerEvents: "none" }}><PetroSpiral size={50} opacity={0.05} color={T.gold} /></div>
        <div style={{ position: "absolute", top: "30%", right: "10%", pointerEvents: "none" }}><LeafBranch size={90} opacity={0.04} color={T.gold} /></div>
        <div style={{ position: "absolute", bottom: 80, left: "20%", pointerEvents: "none" }}><StarBurst size={40} opacity={0.05} color={T.gold} /></div>

        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 800, height: 800, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(139,26,26,0.06) 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, animation: "fadeUp .9s ease" }}>
          <KusKanat size={100} opacity={0.15} color={T.gold} style={{ margin: "0 auto 32px", display: "block" }} />
          <p style={{
            fontFamily: "'Karla', sans-serif", fontSize: 13, fontWeight: 600,
            color: T.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20,
          }}>Central Asian Cuisine in Vienna</p>
          <h1 style={{
            fontFamily: "'EB Garamond', serif", fontWeight: 400, fontSize: "clamp(40px, 6vw, 72px)",
            color: T.ivory, lineHeight: 1.1, maxWidth: 700, margin: "0 auto 24px", letterSpacing: "-0.02em",
          }}>Where Nomad<br />Tradition Meets<br />the Table</h1>
          <p style={{
            fontFamily: "'Karla', sans-serif", fontSize: 17, color: T.warmGrayLight,
            lineHeight: 1.7, maxWidth: 480, margin: "0 auto 44px", fontWeight: 300,
          }}>Intimate manty workshops and culinary experiences that bring the warmth of the Silk Road to Vienna's heart.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("reserve")} style={btnPrimary}>Reserve a Spot</button>
            <button onClick={() => scrollTo("about")} style={btnOutline(T.warmGrayLight)}>Discover</button>
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "fadeIn 1.2s ease 0.5s both",
        }}>
          <span style={{ fontFamily: "'Karla', sans-serif", fontSize: 11, color: T.warmGrayLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${T.warmGrayLight}, transparent)` }} />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ background: T.ivory, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 40, right: 60, pointerEvents: "none" }}><PetroSpiral size={70} opacity={0.06} color={T.crimson} /></div>
        <div style={{ ...sectionPad, display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}>
          <FadeIn style={{ flex: "1 1 400px", minWidth: 300 }}>
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 12, fontWeight: 600, color: T.crimson, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>About</p>
            <h2 style={headingStyle()}>Food Is How<br />We Remember</h2>
            <p style={subStyle()}>Nomad Küche is a culinary project born from the belief that food carries memory — of landscapes, of family, of rituals passed down through generations. We bring Central Asian cuisine to European audiences through hands-on workshops, private events, and collaborative experiences.</p>
            <p style={{ ...subStyle(), marginBottom: 0 }}>Every dish we share is a piece of the Silk Road: handmade manty, plov cooked over open flames, salads bright with herbs from mountain valleys. We don't just cook — we tell stories.</p>
          </FadeIn>
          <FadeIn delay={0.15} style={{ flex: "1 1 360px", minWidth: 280 }}>
            <ImgPlaceholder aspect="3/4" gradient={`linear-gradient(160deg, ${T.crimson}22, ${T.gold}33, ${T.ivoryDark})`} borderRadius={10} />
          </FadeIn>
        </div>
      </section>

      {/* ─── EXPERIENCES ─── */}
      <section id="experiences" style={{ background: T.ivory, borderTop: `1px solid ${T.ivoryDark}`, position: "relative" }}>
        <div style={{ position: "absolute", bottom: 30, left: 40, pointerEvents: "none" }}><LeafBranch size={100} opacity={0.04} color={T.crimson} /></div>
        <div style={sectionPad}>
          <FadeIn style={{ textAlign: "center", marginBottom: 60 }}>
            <Divider color={T.crimson} opacity={0.2} width={120} />
            <div style={{ height: 28 }} />
            <h2 style={{ ...headingStyle(), textAlign: "center" }}>Experiences</h2>
            <p style={{ ...subStyle(), margin: "0 auto" }}>Three ways to gather around the table</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {[
              { title: "Public Workshops", desc: "Join a group of fellow food lovers for a 3–4 hour manty-making session. Learn the dough, the filling, the folds — and sit down together to eat what you've made.", tag: "Open to all", cta: "reserve", ctaLabel: "Reserve a spot →" },
              { title: "Private Events", desc: "Host an intimate dinner or hands-on workshop for your group. Whether a birthday, team event, or gathering of friends — we design the experience around you.", tag: "By request", cta: "contact", ctaLabel: "Get in touch →" },
              { title: "Collaborations", desc: "We partner with studios, cafés, and brands to create pop-up experiences, menu collaborations, and cultural events that bring something genuinely new to the table.", tag: "For partners", cta: "contact", ctaLabel: "Get in touch →" },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div style={{
                  background: "white", borderRadius: 10, padding: "36px 32px",
                  border: `1px solid ${T.ivoryDark}`, height: "100%",
                  display: "flex", flexDirection: "column",
                  transition: "box-shadow .3s, transform .3s", cursor: "default",
                }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                   onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <span style={{
                    fontFamily: "'Karla', sans-serif", fontSize: 11, fontWeight: 600,
                    color: T.crimson, letterSpacing: "0.12em", textTransform: "uppercase",
                    background: `${T.crimson}0D`, padding: "4px 12px", borderRadius: 20, alignSelf: "flex-start",
                  }}>{card.tag}</span>
                  <h3 style={{ fontFamily: "'EB Garamond', serif", fontSize: 24, fontWeight: 500, color: T.textDark, margin: "20px 0 12px" }}>{card.title}</h3>
                  <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, color: T.warmGray, lineHeight: 1.7, flex: 1 }}>{card.desc}</p>
                  <button onClick={() => scrollTo(card.cta)} style={{
                    marginTop: 20, padding: "10px 0", border: "none", background: "none",
                    fontFamily: "'Karla', sans-serif", fontSize: 13, fontWeight: 600,
                    color: T.crimson, cursor: "pointer", textAlign: "left", letterSpacing: "0.04em",
                  }}>{card.ctaLabel}</button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CULTURE ─── */}
      <section style={{ background: T.crimson, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 20, right: "8%", pointerEvents: "none" }}><SpiralSun size={120} opacity={0.08} color={T.ivory} /></div>
        <div style={{ position: "absolute", bottom: 20, left: "5%", pointerEvents: "none" }}><KusKanat size={140} opacity={0.06} color={T.ivory} /></div>
        <div style={{ ...sectionPad, textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <StarBurst size={36} opacity={0.25} color={T.ivory} style={{ margin: "0 auto 28px", display: "block" }} />
            <h2 style={{
              fontFamily: "'EB Garamond', serif", fontWeight: 400, fontSize: "clamp(28px, 4vw, 44px)",
              color: T.ivory, lineHeight: 1.3, maxWidth: 640, margin: "0 auto 20px", fontStyle: "italic",
            }}>"In our tradition, the table is never just a table. It is where generations meet."</h2>
            <p style={{
              fontFamily: "'Karla', sans-serif", fontSize: 15, color: "rgba(245,240,232,0.7)",
              lineHeight: 1.7, maxWidth: 520, margin: "0 auto",
            }}>Central Asian food is ritual — the slow folding of dough, the patience of a long simmer, the joy of sharing from a single dish. At Nomad Küche, we honor that ritual by inviting you into it.</p>
          </FadeIn>
        </div>
      </section>

      {/* ─── WORKSHOP ─── */}
      <section id="workshop" style={{ background: T.dark, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 60, left: "5%", pointerEvents: "none" }}><TileMedallion size={100} opacity={0.03} color={T.gold} /></div>
        <div style={sectionPadWide}>
          <FadeIn style={{ textAlign: "center", marginBottom: 60 }}>
            <Divider color={T.gold} opacity={0.25} width={120} />
            <div style={{ height: 28 }} />
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 12, fontWeight: 600, color: T.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Signature Experience</p>
            <h2 style={{ ...headingStyle(T.ivory), textAlign: "center" }}>The Manty Workshop</h2>
            <p style={{ ...subStyle(T.warmGrayLight), margin: "0 auto" }}>A 3–4 hour journey from raw ingredients to a shared feast</p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 56 }}>
            {[
              { num: "01", title: "Welcome & Tea", desc: "Arrive to the aroma of fresh green tea and warm bread. We set the mood and share the story behind manty." },
              { num: "02", title: "The Dough", desc: "Learn the feel of the perfect dough — elastic, smooth, rested. You'll make it with your own hands." },
              { num: "03", title: "The Filling", desc: "Prepare a fragrant mix of spiced lamb, onion, and cumin — the heart of every manty." },
              { num: "04", title: "The Fold", desc: "Master the traditional pleating technique. This is where craft meets art — each fold a small meditation." },
              { num: "05", title: "The Steam", desc: "Place your manty in the cascane and let the steam do its work. Time to talk, breathe, connect." },
              { num: "06", title: "The Feast", desc: "Sit down together and eat what you've made — with sides, sauces, salads, and stories." },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ padding: "28px 24px", borderRadius: 8, border: `1px solid rgba(196,147,63,0.1)`, background: "rgba(196,147,63,0.03)" }}>
                  <span style={{ fontFamily: "'EB Garamond', serif", fontSize: 32, fontWeight: 400, color: T.gold, opacity: 0.4 }}>{s.num}</span>
                  <h4 style={{ fontFamily: "'EB Garamond', serif", fontSize: 20, fontWeight: 500, color: T.ivory, margin: "8px 0" }}>{s.title}</h4>
                  <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 14, color: T.warmGrayLight, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div style={{
              display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap",
              marginBottom: 44, padding: "32px 0",
              borderTop: `1px solid rgba(196,147,63,0.1)`, borderBottom: `1px solid rgba(196,147,63,0.1)`,
            }}>
              {[{ value: "6–8", label: "Guests" }, { value: "3–4h", label: "Duration" }, { value: "100%", label: "Handmade" }].map((m, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'EB Garamond', serif", fontSize: 36, fontWeight: 400, color: T.gold, lineHeight: 1 }}>{m.value}</div>
                  <div style={{ fontFamily: "'Karla', sans-serif", fontSize: 12, fontWeight: 500, color: T.warmGrayLight, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 6 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn style={{ textAlign: "center" }}>
            <button onClick={() => scrollTo("reserve")} style={btnPrimary}>Reserve Your Workshop</button>
          </FadeIn>
        </div>
      </section>

      {/* ─── RESERVE (Cal.com Embed) ─── */}
      <section id="reserve" style={{ background: T.ivory, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 40, left: "6%", pointerEvents: "none" }}><StarBurst size={44} opacity={0.05} color={T.crimson} /></div>
        <div style={{ position: "absolute", bottom: 30, right: "8%", pointerEvents: "none" }}><PetroSpiral size={55} opacity={0.04} color={T.crimson} /></div>
        <div style={{ ...sectionPad, maxWidth: 900 }}>
          <FadeIn style={{ textAlign: "center", marginBottom: 40 }}>
            <Divider color={T.crimson} opacity={0.2} width={120} />
            <div style={{ height: 28 }} />
            <h2 style={{ ...headingStyle(), textAlign: "center" }}>Reserve a Spot</h2>
            <p style={{ ...subStyle(), margin: "0 auto 8px" }}>Choose a date and time that works for you. You'll receive a confirmation email with everything you need.</p>
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 13, color: T.warmGrayLight, margin: "0 auto" }}>
              For private events or other inquiries, use the{" "}
              <span onClick={() => scrollTo("contact")} style={{ color: T.crimson, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3 }}>contact form</span> below.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <CalEmbed />
          </FadeIn>

          <FadeIn delay={0.2} style={{ textAlign: "center", marginTop: 24 }}>
            <a href="https://cal.com/nomadkuche/manty-workshop" target="_blank" rel="noopener" style={{
              fontFamily: "'Karla', sans-serif", fontSize: 13, color: T.warmGray, textDecoration: "none",
            }}>
              Having trouble? <span style={{ color: T.crimson, textDecoration: "underline", textUnderlineOffset: 3 }}>Book directly on Cal.com</span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" style={{ background: T.ivory, borderTop: `1px solid ${T.ivoryDark}`, position: "relative" }}>
        <div style={{ position: "absolute", top: 40, right: 80, pointerEvents: "none" }}><StarBurst size={50} opacity={0.05} color={T.crimson} /></div>
        <div style={sectionPadWide}>
          <FadeIn style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ ...headingStyle(), textAlign: "center" }}>Gallery</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "auto auto", gap: 16 }}>
            <FadeIn delay={0} style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>
              <ImgPlaceholder aspect="1/1" gradient={`linear-gradient(135deg, ${T.crimson}33, ${T.gold}44)`} borderRadius={10} style={{ height: "100%" }} />
            </FadeIn>
            <FadeIn delay={0.1} style={{ gridColumn: "3 / 4" }}>
              <ImgPlaceholder aspect="4/3" gradient={`linear-gradient(160deg, ${T.dark}22, ${T.warmGray}33)`} borderRadius={10} />
            </FadeIn>
            <FadeIn delay={0.15} style={{ gridColumn: "4 / 5" }}>
              <ImgPlaceholder aspect="4/3" gradient={`linear-gradient(200deg, ${T.gold}22, ${T.crimson}22)`} borderRadius={10} />
            </FadeIn>
            <FadeIn delay={0.2} style={{ gridColumn: "3 / 5" }}>
              <ImgPlaceholder aspect="21/9" gradient={`linear-gradient(180deg, ${T.ivoryDark}, ${T.warmGrayLight}44)`} borderRadius={10} />
            </FadeIn>
          </div>
          <style>{`@media (max-width: 640px) { #gallery [style*="grid-template-columns"] { grid-template-columns: 1fr 1fr !important; } }`}</style>
        </div>
      </section>

      {/* ─── FOUNDER ─── */}
      <section id="founder" style={{ background: T.ivory, borderTop: `1px solid ${T.ivoryDark}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 40, right: "10%", pointerEvents: "none" }}><KusKanat size={120} opacity={0.04} color={T.crimson} flip /></div>
        <div style={{ ...sectionPad, display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}>
          <FadeIn style={{ flex: "1 1 280px", minWidth: 240 }}>
            <ImgPlaceholder aspect="3/4" gradient={`linear-gradient(170deg, ${T.gold}22, ${T.crimson}22, ${T.ivoryDark})`} borderRadius={10} />
          </FadeIn>
          <FadeIn delay={0.15} style={{ flex: "1 1 440px", minWidth: 300 }}>
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 12, fontWeight: 600, color: T.crimson, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>The Founder</p>
            <h2 style={headingStyle()}>Nargiza</h2>
            <p style={{ ...subStyle(), marginBottom: 20 }}>I grew up in a kitchen where food was never rushed. My grandmother's hands shaped manty the same way her mother's had — patiently, precisely, with love folded into every pleat.</p>
            <p style={{ ...subStyle(), marginBottom: 20 }}>When I moved to Vienna, I carried those recipes with me — not just as instructions, but as a way of being. Nomad Küche is my way of sharing that inheritance: the warmth of a Central Asian table, the joy of making something with your hands, the quiet power of sitting down together.</p>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, fontStyle: "italic", color: T.crimson, lineHeight: 1.5 }}>Every fold is a conversation with home.</p>
          </FadeIn>
        </div>
      </section>

      {/* ─── COLLABORATIONS ─── */}
      <section style={{ background: T.dark, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 30, left: "12%", pointerEvents: "none" }}><PetroSpiral size={60} opacity={0.05} color={T.gold} /></div>
        <div style={{ ...sectionPad, textAlign: "center" }}>
          <FadeIn>
            <Divider color={T.gold} opacity={0.25} width={100} />
            <div style={{ height: 28 }} />
            <h2 style={{ ...headingStyle(T.ivory), textAlign: "center", marginBottom: 20 }}>Let's Create Together</h2>
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 15, color: T.warmGrayLight, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 32px" }}>
              We work with studios, cafés, cultural spaces, and brands who share our love for authentic food experiences. Pop-ups, workshop series, menu development — if it brings people around a table, we're in.
            </p>
            <button onClick={() => scrollTo("contact")} style={btnOutline(T.gold)}>Get in Touch</button>
          </FadeIn>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ background: T.darkMid, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 40, right: "8%", pointerEvents: "none" }}><SpiralSun size={100} opacity={0.03} color={T.gold} /></div>
        <div style={sectionPad}>
          <FadeIn>
            <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 12, fontWeight: 600, color: T.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>Contact</p>
            <h2 style={{ ...headingStyle(T.ivory), marginBottom: 20 }}>Start a<br />Conversation</h2>
            <p style={{ ...subStyle(T.warmGrayLight), marginBottom: 32 }}>Whether you're inquiring about a workshop, planning a private event, or exploring a partnership — we'd love to hear from you.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <a href="mailto:hello@nomadkuche.com" style={{ fontFamily: "'Karla', sans-serif", fontSize: 15, color: T.gold, textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>✉</span> hello@nomadkuche.com
              </a>
              <a href="https://instagram.com/nomadkuche" target="_blank" rel="noopener" style={{ fontFamily: "'Karla', sans-serif", fontSize: 15, color: T.gold, textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>◎</span> @nomadkuche
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: T.dark, padding: "40px 24px", borderTop: `1px solid rgba(196,147,63,0.08)`, textAlign: "center" }}>
        <KusKanat size={60} opacity={0.12} color={T.gold} style={{ margin: "0 auto 16px", display: "block" }} />
        <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 18, color: T.ivory, marginBottom: 8, letterSpacing: "0.02em" }}>Nomad Küche</p>
        <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 12, color: T.warmGrayLight, letterSpacing: "0.06em" }}>Vienna · Central Asian Cuisine · Est. 2025</p>
        <p style={{ fontFamily: "'Karla', sans-serif", fontSize: 11, color: T.warmGray, marginTop: 20, opacity: 0.6 }}>© 2025 Nomad Küche. All rights reserved.</p>
      </footer>
    </div>
  );
}
