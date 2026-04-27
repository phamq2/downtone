// Lower sections: why now, assumptions/model, financials, risks, contact, footer.

window.DTWhy = function DTWhy() {
  const { WHY } = window.DT_DATA;
  return (
    <section id="why" className="dt-section">
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">06 / Why Now</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">The cultural read</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 80, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 96 }}>
            <h2 className="dt-h-1" style={{ marginBottom: 24 }}>Why This.<br/>Why Now.</h2>
            <div className="dt-serif-it" style={{ fontSize: 24, color: "var(--accent)", lineHeight: 1.3 }}>
              People are looking for real spaces again.
            </div>
          </div>
          <div className="dt-hairline-list">
            {WHY.map(([t, b], i) => (
              <div key={i} style={{ padding: "32px 0" }}>
                <div className="dt-eyebrow" style={{ color: "var(--accent)", marginBottom: 12 }}>{t}</div>
                <div className="dt-body" style={{ fontSize: 16 }}>{b}</div>
              </div>
            ))}
            <div style={{ padding: "32px 0 0" }}>
              <div className="dt-h-2" style={{ color: "var(--accent)" }}>Downtone is that home.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.DTCommunity = function DTCommunity() { return null; };

window.DTAssumptions = function DTAssumptions() {
  const { DAYPARTS, SEASON, DOW } = window.DT_DATA;
  return (
    <section id="assumptions" className="dt-section">
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">07 / Model</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">How the day works</span>
        </div>

        <h2 className="dt-h-1" style={{ marginBottom: 16 }}>Assumptions.</h2>
        <div className="dt-body-lg" style={{ marginBottom: 56, maxWidth: 700 }}>
          Revenue is driven by four distinct dayparts across a 75-seat main floor.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56 }}>
          <div>
            <div className="dt-eyebrow" style={{ marginBottom: 16 }}>Operations</div>
            <div className="dt-body" style={{ marginBottom: 24 }}>Open 7 days, 8am–2am (18 hours). Coffee + pastry AM, cocktails + curated sound PM.</div>

            <div className="dt-hairline-list">
              <div style={{ padding: "12px 0", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 16 }} className="dt-eyebrow dt-fg-soft">
                <div>Daypart</div><div style={{ textAlign: "right" }}>Hours</div><div style={{ textAlign: "right" }}>Avg covers</div><div style={{ textAlign: "right" }}>Avg check</div>
              </div>
              {DAYPARTS.map((r, i) => (
                <div key={i} style={{ padding: "16px 0", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 16, alignItems: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em", textTransform: "uppercase" }}>{r[0]}</div>
                  <div className="dt-fg-soft" style={{ textAlign: "right", fontSize: 13 }}>{r[1]}</div>
                  <div style={{ textAlign: "right", fontSize: 16 }}>{r[2]}</div>
                  <div style={{ textAlign: "right", fontFamily: "Bandit", fontSize: 18, color: "var(--accent)" }}>{r[3]}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginTop: 32 }}>
              {[
                ["378", "Daily covers"],
                ["$23.78", "Blended check"],
                ["~$9.4K", "Daily gross · Yr 2"],
                ["~$5.9K", "Break-even / day"]
              ].map(([v, k]) => (
                <div key={k}>
                  <div style={{ fontFamily: "Bandit", fontSize: 28, color: "var(--accent)", lineHeight: 1 }}>{v}</div>
                  <div className="dt-stat-label">{k}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="dt-eyebrow" style={{ marginBottom: 16 }}>Monthly Seasonality</div>
            <div className="dt-fg-soft" style={{ fontSize: 12, marginBottom: 16 }}>Revenue index vs. annual avg (100 = avg)</div>
            <div style={{ display: "flex", gap: 6, alignItems: "flex-end", marginBottom: 40 }}>
              {SEASON.map(([m, v], i) => {
                const h = Math.max(4, ((v - 60) / 60) * 120);
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div className="dt-fg-soft" style={{ fontSize: 11 }}>{v}</div>
                    <div style={{ width: "100%", height: h, background: "var(--accent)" }}/>
                    <div className="dt-fg-soft" style={{ fontSize: 11 }}>{m}</div>
                  </div>
                );
              })}
            </div>

            <div className="dt-eyebrow" style={{ marginBottom: 16 }}>Day-of-Week Sensitivity</div>
            <div className="dt-fg-soft" style={{ fontSize: 12, marginBottom: 16 }}>Revenue index vs. weekly avg (100 = avg)</div>
            <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
              {DOW.map(([d, v], i) => {
                const h = Math.max(4, ((v - 60) / 90) * 120);
                const isWeekend = i >= 4;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div className="dt-fg-soft" style={{ fontSize: 11 }}>{v}</div>
                    <div style={{ width: "100%", height: h, background: isWeekend ? "var(--accent)" : "rgba(245,241,234,0.25)" }}/>
                    <div className="dt-fg-soft" style={{ fontSize: 11 }}>{d}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <hr className="dt-rule" style={{ margin: "64px 0 32px" }}/>

        <div className="dt-eyebrow" style={{ marginBottom: 24 }}>Cost Structure & Margins</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
          {[
            ["31.7%", "COGS", "Bev 29% / Food 46%"],
            ["34.3%", "Payroll", "Hourly + salary + benefits"],
            ["16.2%", "Controllable", "Ops, marketing, admin"],
            ["9.4%", "Occupancy", "Rent, insurance, utilities"],
            ["12.9%", "EBITDA margin", "Stabilized · 7.1% Yr 1"]
          ].map(([v, k, sub], i) => (
            <div key={k} style={{ borderTop: "2px solid " + (i === 4 ? "var(--accent)" : "rgba(245,241,234,0.15)"), paddingTop: 16 }}>
              <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 30, color: i === 4 ? "var(--accent)" : "var(--fg)" }}>{v}</div>
              <div className="dt-stat-label" style={{ marginTop: 4 }}>{k}</div>
              <div className="dt-fg-soft" style={{ fontSize: 12, marginTop: 6 }}>{sub}</div>
            </div>
          ))}
        </div>

        <hr className="dt-rule" style={{ margin: "48px 0 32px" }}/>

        <div className="dt-eyebrow" style={{ marginBottom: 24 }}>Space Metrics</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
          {[
            ["1,400", "Main flr · sqft"],
            ["2,600", "Total · sqft"],
            ["75", "Seats"],
            ["~$2,080", "Rev / sqft"],
            ["6.2%", "Rent / rev"]
          ].map(([v, k]) => (
            <div key={k}>
              <div style={{ fontFamily: "Bandit", fontSize: 36, color: "var(--accent)", lineHeight: 1 }}>{v}</div>
              <div className="dt-stat-label">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.DTFinancials = function DTFinancials() {
  const { FIN_ROWS } = window.DT_DATA;
  return (
    <section id="financials" className="dt-section" style={{ background: "var(--field2)" }}>
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">08 / Financials</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">5-year income statement</span>
        </div>

        <h2 className="dt-h-1" style={{ marginBottom: 16 }}>Five-Year Statement.</h2>
        <div className="dt-body-lg" style={{ marginBottom: 56, maxWidth: 700 }}>
          Modeled using hospitality benchmarks calibrated to the LES / Chinatown market.
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 880 }}>
            <thead>
              <tr>
                {["", "Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5", "% Rev", "Industry"].map((h, i) => (
                  <th key={i} style={{
                    textAlign: i === 0 ? "left" : "right",
                    padding: "12px 12px 16px",
                    fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: i === 6 ? "var(--accent)" : "rgba(245,241,234,0.55)",
                    fontWeight: 500,
                    borderBottom: "1px solid rgba(245,241,234,0.30)"
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FIN_ROWS.map(([label, vals, pct, ind, kind], i) => {
                const hl = kind === "hl";
                const sub = kind === "sub";
                return (
                  <tr key={i} style={{
                    background: hl ? "rgba(255,155,0,0.07)" : "transparent",
                    borderBottom: "1px solid rgba(245,241,234,0.10)"
                  }}>
                    <td style={{ padding: "16px 12px", textAlign: "left", fontSize: 14, fontWeight: hl || sub ? 700 : 500, color: hl ? "var(--accent)" : "var(--fg)" }}>{label}</td>
                    {vals.map((v, j) => (
                      <td key={j} style={{
                        padding: "16px 12px", textAlign: "right",
                        fontSize: 14,
                        fontWeight: hl || sub ? 700 : 400,
                        color: hl ? "var(--accent)" : sub ? "var(--fg)" : "rgba(245,241,234,0.78)"
                      }}>{v}</td>
                    ))}
                    <td style={{ padding: "16px 12px", textAlign: "right", fontSize: 13, color: "rgba(245,241,234,0.55)" }}>{pct}</td>
                    <td style={{ padding: "16px 12px", textAlign: "right", fontSize: 13, color: "rgba(245,241,234,0.55)" }}>{ind}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="dt-fg-soft dt-serif-it" style={{ fontSize: 13, marginTop: 16 }}>
          *Distributable cash flow is net of operator draw ($100K/yr), working capital maintenance ($100K floor), and basement reserve ($100K in Year 1). % Rev based on Year 2 stabilized.
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--accent)" }}>
          <div className="dt-eyebrow" style={{ marginBottom: 16 }}>Projected Milestones · 3% Annual Growth</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[["Year 10", "$4.3M", "$555K"], ["Year 15", "$5.0M", "$643K"]].map(([y, r, e]) => (
              <div key={y} style={{ background: "var(--bg)", padding: 32, display: "flex", gap: 32, alignItems: "center" }}>
                <div style={{ fontFamily: "Bandit", fontSize: 32, color: "var(--accent)" }}>{y}</div>
                <div>
                  <div className="dt-stat-label">Revenue</div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>~{r}</div>
                </div>
                <div>
                  <div className="dt-stat-label">EBITDA</div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>~{e}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

window.DTRisks = function DTRisks() {
  const { RISKS } = window.DT_DATA;
  return (
    <section id="risks" className="dt-section">
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">09 / Risks</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">Read carefully</span>
        </div>

        <h2 className="dt-h-1" style={{ marginBottom: 16 }}>Risk Factors.</h2>
        <div className="dt-body-lg" style={{ marginBottom: 56, maxWidth: 700 }}>
          Investors should carefully consider the following. This is not an exhaustive list.
        </div>

        <div className="dt-hairline-list">
          {RISKS.map(([t, b], i) => (
            <div key={i} style={{ padding: "32px 0", display: "grid", gridTemplateColumns: "80px 1fr 2fr", gap: 24, alignItems: "start" }}>
              <div style={{ fontFamily: "Bandit", fontSize: 40, color: "var(--accent)", lineHeight: 1 }}>0{i + 1}</div>
              <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.01em", textTransform: "uppercase" }}>{t}</div>
              <div className="dt-body">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.DTContact = function DTContact() {
  return (
    <section id="contact" className="dt-section" style={{ background: "var(--accent)", color: "var(--bg)", paddingTop: 120, paddingBottom: 120 }}>
      <div className="dt-section-inner">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "end" }}>
          <h2 style={{
            fontFamily: "Outfit", fontWeight: 900,
            fontSize: "clamp(72px, 9vw, 140px)",
            lineHeight: 0.88, letterSpacing: "-0.05em",
            textTransform: "uppercase", margin: 0
          }}>
            Let’s Build<br/>Together.
          </h2>
          <div style={{ fontSize: 18, lineHeight: 1.55, fontWeight: 500 }}>
            The next step is a conversation. We’d love to walk you through the space, share the vision, and answer questions.
          </div>
        </div>

        <div style={{
          marginTop: 80,
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: 0,
          borderTop: "1px solid rgba(0,0,0,0.2)",
          borderBottom: "1px solid rgba(0,0,0,0.2)"
        }}>
          <div style={{ padding: 40, borderRight: "1px solid rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12, opacity: 0.7 }}>Contact</div>
            <div style={{ fontWeight: 800, fontSize: 22, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Quoc Pham</div>
            <div style={{ fontStyle: "italic", fontFamily: "Instrument Serif", fontSize: 18, marginTop: 4 }}>Founder / Creative Director</div>
            <div style={{ marginTop: 16, fontSize: 15 }}>(206) 819-8383<br/>quoc@downtone.nyc</div>
          </div>
          <div style={{ padding: 40, borderRight: "1px solid rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12, opacity: 0.7 }}>Schedule</div>
            <div style={{ fontWeight: 800, fontSize: 22, textTransform: "uppercase" }}>Zoom →</div>
            <div style={{ marginTop: 16, fontSize: 15 }}>calendly.com/downtone<br/>30 min · video</div>
          </div>
          <div style={{ padding: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12, opacity: 0.7 }}>Web</div>
            <div style={{ fontWeight: 800, fontSize: 22, textTransform: "uppercase" }}>downtone.nyc</div>
            <div style={{ marginTop: 16, fontSize: 15 }}>301 Grand St<br/>New York · 10002</div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.DTFooter = function DTFooter() {
  return (
    <footer style={{
      padding: "48px",
      maxWidth: 1200, margin: "0 auto",
      display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32,
      borderTop: "1px solid rgba(245,241,234,0.10)"
    }}>
      <img src="assets/Downtone-logo-white.svg" alt="Downtone" style={{ height: 22, width: "auto", alignSelf: "flex-start" }}/>
      <div className="dt-fg-soft" style={{ fontSize: 11, lineHeight: 1.7, maxWidth: 720 }}>
        Confidential. Intended solely for accredited investors. Projections are forward-looking estimates and not a guarantee of returns. Investment in early-stage hospitality ventures involves significant risk, including loss of principal. This is not an offer to sell securities.
      </div>
    </footer>
  );
};
