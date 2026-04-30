// Top-level page component composing all sections, plus scroll-tracker for the
// VU strip in the hero. The page is rendered inside a fixed-height artboard,
// so we use a local scroll container rather than window.

window.DTPage = function DTPage({ variant = "signature", colorPair = null }) {
  const { useEffect, useRef, useState } = React;
  const { NAV, PAIRS } = window.DT_DATA;
  const mobile = useMobile();

  const scrollRef = useRef(null);
  const [pct, setPct] = useState(0);
  const [active, setActive] = useState("overview");

  // Resolve color pair for the page (variant default vs. user override)
  const variantDefault = variant === "signature" ? "black-amber"
                       : variant === "editorial" ? "wine-lilac"
                       : "purple-orange";
  const pair = PAIRS.find(p => p.id === (colorPair || variantDefault)) || PAIRS[0];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = el.scrollHeight - el.clientHeight;
        setPct(max > 0 ? Math.max(0, Math.min(1, el.scrollTop / max)) : 0);
        let best = "overview", bestDist = Infinity;
        const baseTop = el.getBoundingClientRect().top;
        NAV.forEach(([id]) => {
          const n = el.querySelector("#" + id);
          if (!n) return;
          const localTop = n.getBoundingClientRect().top - baseTop;
          const d = Math.abs(localTop - 80);
          if (localTop <= 200 && d < bestDist) { bestDist = d; best = id; }
        });
        setActive(best);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function goTo(id) {
    const el = scrollRef.current;
    if (!el) return;
    const n = el.querySelector("#" + id);
    if (!n) return;
    const top = n.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop - 64;
    el.scrollTo({ top, behavior: "smooth" });
  }

  const pageStyle = {
    "--bg": pair.bg,
    "--accent": pair.accent,
    "--field2": pair.field2,
    "--fg": "#F5F1EA",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden"
  };

  // Editorial uses olive-magenta if user picks editorial default but PAIRS list
  // for variants varies — the resolved 'pair' above already handles this.

  return (
    <div ref={scrollRef} className={"dt-page " + (window.DT_GRAIN === false ? "" : "dt-grain")} style={pageStyle}>
      {/* Tape progress bar (top, hairline, accent fill) */}
      <div className="dt-tape">
        <div className="dt-tape-fill" style={{ width: (pct * 100) + "%" }}/>
      </div>

      {/* Nav */}
      <div className="dt-nav">
        <div className="dt-nav-inner">
          <a
            href="https://www.downtone.nyc"
            className="dt-nav-logo"
            role="img"
            aria-label="Downtone"
            style={{
              "--logo-mask": "url('assets/Downtone-logo-white.svg')",
              width: 110,
              display: "block"
            }}
          />
          <div className="dt-nav-links">
            {NAV.map(([id, label]) => (
              <span key={id}
                    onClick={() => goTo(id)}
                    className={"dt-nav-link " + (active === id ? "active" : "")}>
                {label}
              </span>
            ))}
          </div>
          <a href="https://app.fyxer.com/e/quoc-pham-198/30" target="_blank" rel="noopener noreferrer" className="dt-btn dt-btn-primary" style={{ padding: "10px 18px", fontSize: 11, textDecoration: "none", whiteSpace: "nowrap" }}>
            {mobile ? "Meet" : "Schedule a Meeting"}
          </a>
        </div>
      </div>

      <DTHero variant={variant} scrollPct={pct}/>
      <DTMarquee variant={variant}/>
      <DTOverview/>
      <DTOpportunity/>
      <DTProjection/>
      <DTFunding/>
      <DTTimeline/>
      <DTVenueMoment variant={variant}/>
      <DTWhy/>
      <DTCommunity/>
      <DTAssumptions/>
      <DTFinancials/>
      <DTRisks/>
      <DTContact/>
      <DTFooter/>
    </div>
  );
};
