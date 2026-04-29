// Hero, nav, marquee, and the manifesto / venue moments.
//
// `variant` prop: "signature" | "editorial" | "loud"

window.DTHero = function DTHero({ variant = "signature", scrollPct = 0 }) {
  const { useState, useEffect, useMemo } = React;

  // VU strip — driven by scroll, but also has subtle idle motion to feel alive
  const tickCount = 64;
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 1000), 120);
    return () => clearInterval(id);
  }, []);
  const ticks = useMemo(() => {
    const n = Math.round(scrollPct * tickCount);
    return Array.from({ length: tickCount }, (_, i) => {
      const noise = (Math.sin((i + phase) * 0.4) + Math.sin((i + phase) * 0.13)) * 0.5;
      const idle = Math.max(0, n + Math.round(noise * 3));
      return i < idle;
    });
  }, [scrollPct, phase]);

  if (variant === "editorial") {
    // Oversized 'D' poster + stat strip
    return (
      <section style={{ position: "relative", padding: "180px 48px 96px", overflow: "hidden" }}>
        <div className="dt-d-mark" style={{ top: -100, right: -80 }}>D</div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>
          <div className="dt-eyebrow" style={{ marginBottom: 32 }}>
            301 Grand St &nbsp;·&nbsp; Confidential &nbsp;·&nbsp; April 2026
          </div>
          <h1 className="dt-h-display" style={{ maxWidth: 760 }}>
            A Cultural<br/>Hub In Lower<br/>Manhattan.
          </h1>
          <div style={{ display: "flex", gap: 64, marginTop: 80, flexWrap: "wrap" }}>
            {[
              ["Capital", "$1.15M"],
              ["Equity raise", "$700K"],
              ["IRR", "~28%"],
              ["Payback", "~3.0 yrs"],
              ["5-yr multiple", "~2.0×"]
            ].map(([k, v]) => (
              <div key={k}>
                <div className="dt-stat-num-bandit">{v}</div>
                <div className="dt-stat-label">{k}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 56 }}>
            <a href="https://app.fyxer.com/e/quoc-pham-198/30" target="_blank" rel="noopener noreferrer" className="dt-btn dt-btn-primary" style={{ textDecoration: "none" }}>Schedule a Meeting</a>
            <a href="assets/Downtone-Concept.pdf" target="_blank" rel="noopener noreferrer" className="dt-btn" style={{ textDecoration: "none" }}>Concept Deck ↓</a>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "loud") {
    // Big colour-blocked accent panel + venue photo
    return (
      <section style={{ position: "relative", padding: "120px 0 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div className="dt-eyebrow" style={{ marginBottom: 32 }}>
            301 Grand St &nbsp;·&nbsp; Confidential &nbsp;·&nbsp; April 2026
          </div>
          <h1 style={{
            fontFamily: "Outfit", fontWeight: 900,
            fontSize: "clamp(80px, 11vw, 168px)",
            lineHeight: 0.85, letterSpacing: "-0.055em",
            textTransform: "uppercase", margin: 0
          }}>
            Hi-Fi<br/><span style={{ color: "var(--accent)" }}>To&nbsp;The</span><br/>People.
          </h1>
        </div>
        <div style={{
          marginTop: 64,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0
        }}>
          <div style={{
            background: "var(--accent)", color: "var(--bg)",
            padding: "64px 56px", display: "flex", flexDirection: "column", gap: 24
          }}>
            <div className="dt-serif-it" style={{ fontSize: 32, lineHeight: 1.2 }}>
              Downtone is a sound-led hospitality space where listening deepens as the day turns into night.
            </div>
            <div style={{ marginTop: "auto", display: "flex", gap: 32, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: "Bandit", fontSize: 56, lineHeight: 1 }}>$700K</div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", marginTop: 6 }}>Equity raise</div>
              </div>
              <div>
                <div style={{ fontFamily: "Bandit", fontSize: 56, lineHeight: 1 }}>~28%</div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", marginTop: 6 }}>IRR (base)</div>
              </div>
              <div>
                <div style={{ fontFamily: "Bandit", fontSize: 56, lineHeight: 1 }}>~2.0×</div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", marginTop: 6 }}>5-yr multiple</div>
              </div>
            </div>
          </div>
          <div style={{
            backgroundImage: "url('assets/photos/venue-frontage.jpg')",
            backgroundSize: "cover", backgroundPosition: "center",
            minHeight: 480
          }}/>
        </div>
      </section>
    );
  }

  // SIGNATURE — most serious. Wordmark + scroll-driven VU strip.
  return (
    <section style={{ position: "relative", padding: "140px 48px 96px", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="dt-eyebrow" style={{ marginBottom: 48 }}>
          301 Grand St &nbsp;·&nbsp; Confidential &nbsp;·&nbsp; April 2026 &nbsp;·&nbsp; Accredited investors
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 24 }}>
          <h1 className="dt-h-display" style={{ flex: 1 }}>
            Investor<br/>Brief.
          </h1>
          <div className="dt-serif-it" style={{
            fontSize: 24, color: "var(--accent)", lineHeight: 1.3,
            maxWidth: 320, paddingBottom: 16, textAlign: "right"
          }}>
            Good sound.<br/>Culture.<br/>Community.
          </div>
        </div>

        <hr className="dt-rule" style={{ margin: "56px 0 32px" }}/>

        {/* Sub-summary row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr", gap: 32, alignItems: "start" }}>
          <div className="dt-body-lg" style={{ paddingRight: 24 }}>
            A sound-led hospitality space in Lower Manhattan where listening deepens as the day turns into night. <span className="dt-fg-soft">$700K equity raise on a $1.15M project.</span>
          </div>
          {[
            ["Capital", "$1.15M"],
            ["Equity", "$700K"],
            ["IRR", "~28%"],
            ["Payback", "~3.0 yrs"]
          ].map(([k, v]) => (
            <div key={k}>
              <div className="dt-stat-num" style={{ fontSize: 38 }}>{v}</div>
              <div className="dt-stat-label">{k}</div>
            </div>
          ))}
        </div>

        {/* Scroll-driven VU strip — feels like a tape advancing as you read. */}
        <div style={{ marginTop: 80 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div className="dt-eyebrow">Reading progress</div>
            <div className="dt-eyebrow" style={{ color: "var(--accent)" }}>{Math.round(scrollPct * 100)}%</div>
          </div>
          <div style={{ display: "flex", gap: 2, height: 28 }}>
            {ticks.map((on, i) => (
              <div key={i} style={{
                flex: 1,
                background: on ? "var(--accent)" : "rgba(245,241,234,0.10)",
                transition: "background 200ms"
              }}/>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 56 }}>
          <a href="https://app.fyxer.com/e/quoc-pham-198/30" target="_blank" rel="noopener noreferrer" className="dt-btn dt-btn-primary" style={{ textDecoration: "none" }}>Schedule a Meeting</a>
          <a href="assets/Downtone-Concept.pdf" target="_blank" rel="noopener noreferrer" className="dt-btn" style={{ textDecoration: "none" }}>Concept Deck ↓</a>
        </div>
      </div>
    </section>
  );
};

window.DTMarquee = function DTMarquee({ variant = "signature" }) {
  const items = [
    "Hi-Fi to the People",
    "Good Sound. Culture. Community.",
    "Sound as Ritual",
    "By Day. By Night.",
    "Listening as a Destination",
    "301 Grand St."
  ];
  // Repeat enough times to fill any width
  const reel = [...items, ...items, ...items, ...items];
  return (
    <div style={{
      borderTop: "1px solid rgba(245,241,234,0.15)",
      borderBottom: "1px solid rgba(245,241,234,0.15)",
      padding: "20px 0",
      background: variant === "loud" ? "var(--accent)" : "transparent",
      color: variant === "loud" ? "var(--bg)" : "inherit"
    }}>
      <div className="dt-marquee">
        <div className="dt-marquee-track">
          {reel.map((s, i) => (
            <span key={i} style={{
              fontFamily: "Outfit", fontWeight: 800,
              fontSize: 20, textTransform: "uppercase",
              letterSpacing: "0.06em", display: "inline-flex", alignItems: "center", gap: 32
            }}>
              {s}
              <span style={{
                width: 8, height: 8, borderRadius: 0,
                background: variant === "loud" ? "var(--bg)" : "var(--accent)",
                display: "inline-block"
              }}/>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

window.DTVenueMoment = function DTVenueMoment({ variant }) {
  // Full-bleed venue photo with quote
  return (
    <section style={{ position: "relative", padding: 0, overflow: "hidden" }}>
      <div style={{
        position: "relative",
        height: 520,
        backgroundImage: "url('assets/map-nyc.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "52% 58%"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
        }}/>
        {/* Location pin */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", zIndex: 2,
          transform: "translate(-50%, -100%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          pointerEvents: "none"
        }}>
          <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
            <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 22 14 22S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill="var(--accent)"/>
            <circle cx="14" cy="14" r="5" fill="var(--bg)"/>
          </svg>
          <div style={{
            marginTop: 8, fontSize: 10, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "var(--accent)",
            fontFamily: "Outfit", fontWeight: 700,
            background: "rgba(0,0,0,0.6)", padding: "4px 8px"
          }}>301 Grand St</div>
        </div>
        <div style={{
          position: "relative", maxWidth: 1200, margin: "0 auto",
          padding: "80px 48px", height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "flex-end"
        }}>
          <div className="dt-eyebrow" style={{ marginBottom: 24 }}>The Sign Is Up</div>
          <div className="dt-serif-it" style={{
            fontSize: 56, lineHeight: 1.05, color: "var(--accent)",
            maxWidth: 720, letterSpacing: "-0.01em"
          }}>
            Downtone is not a nightclub.
          </div>
          <div className="dt-body-lg" style={{ maxWidth: 520, marginTop: 16 }}>
            It is an acoustically optimized, culture-forward hospitality venue.
          </div>
        </div>
      </div>
    </section>
  );
};
