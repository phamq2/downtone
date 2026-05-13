// Lower sections: why now, assumptions/model, financials, risks, contact, footer.

window.DTWhy = function DTWhy() {
  const { WHY } = window.DT_DATA;
  const mobile = useMobile();
  return (
    <section id="why" className="dt-section">
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">06 / Why Now</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">The cultural read</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1.3fr", gap: mobile ? 32 : 80, alignItems: "start" }}>
          <div style={{ position: mobile ? "static" : "sticky", top: 96 }}>
            <h2 className="dt-h-1" style={{ marginBottom: 24 }}>Why This.<br/>Why Now.</h2>
            <div className="dt-serif-it" style={{ fontSize: mobile ? 20 : 24, color: "var(--accent)", lineHeight: 1.3 }}>
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

window.DTPositioning = function DTPositioning() {
  const { POSITIONING } = window.DT_DATA;
  const { useState } = React;
  const mobile = useMobile();
  const [activeId, setActiveId] = useState("downtone");
  const active = POSITIONING.nodes.find(n => n.id === activeId) || POSITIONING.nodes[0];

  return (
    <section id="positioning" className="dt-section" style={{ paddingBottom: mobile ? 48 : 64 }}>
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">07 / Positioning</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">Where Downtone fits in the category</span>
        </div>

        <h2 className="dt-h-1" style={{ marginBottom: 24 }}>Positioning.</h2>

        <div className="dt-body-lg" style={{ maxWidth: 760, marginBottom: 16 }}>
          {POSITIONING.intro}
        </div>
        <div className="dt-serif-it" style={{ maxWidth: 760, marginBottom: 64, color: "var(--accent)", fontSize: mobile ? 18 : 20, lineHeight: 1.4 }}>
          {POSITIONING.takeaway}
        </div>

        <div className="dt-eyebrow" style={{ marginBottom: 24 }}>The category map</div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.05fr 1fr", gap: mobile ? 32 : 56, alignItems: "start" }}>
          {/* Quadrant chart */}
          <div>
            <div style={{ position: "relative", paddingLeft: 76, paddingBottom: 44 }}>
              {/* Y-axis */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 44, width: 76, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                <div className="dt-eyebrow dt-fg-soft" style={{ fontSize: 9, alignSelf: "flex-end", marginRight: 16 }}>Platform</div>
                <div className="dt-eyebrow" style={{
                  fontSize: 10, color: "var(--accent)",
                  transform: "rotate(-90deg)", whiteSpace: "nowrap"
                }}>Cultural Differentiation</div>
                <div className="dt-eyebrow dt-fg-soft" style={{ fontSize: 9, alignSelf: "flex-end", marginRight: 16 }}>None</div>
              </div>

              {/* Plot area */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", border: "1px solid rgba(245,241,234,0.18)", background: "var(--field2)" }}>
                {/* Quadrant cross */}
                <div style={{ position: "absolute", left: 0, right: 0, top: "50%", borderTop: "1px dashed rgba(245,241,234,0.10)" }}/>
                <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", borderLeft: "1px dashed rgba(245,241,234,0.10)" }}/>

                {/* Whitespace label (subtle) */}
                <div className="dt-eyebrow" style={{
                  position: "absolute", top: 10, right: 12,
                  fontSize: 9, color: "var(--accent)", opacity: 0.55, letterSpacing: "0.18em"
                }}>Whitespace</div>

                {/* Nodes — dot anchored at (x%, y%), label positioned below */}
                {POSITIONING.nodes.map(n => {
                  const isActive = n.id === activeId;
                  const isFeatured = n.featured;
                  const dotSize = isFeatured ? 16 : 10;
                  return (
                    <div
                      key={n.id}
                      onMouseEnter={() => setActiveId(n.id)}
                      onClick={() => setActiveId(n.id)}
                      style={{
                        position: "absolute",
                        left: `${n.x}%`,
                        top: `${100 - n.y}%`,
                        width: dotSize, height: dotSize,
                        marginLeft: -dotSize / 2,
                        marginTop: -dotSize / 2,
                        borderRadius: "50%",
                        background: isFeatured || isActive ? "var(--accent)" : "rgba(245,241,234,0.55)",
                        boxShadow: isFeatured ? "0 0 0 1px var(--accent)" : "none",
                        cursor: "pointer",
                        zIndex: isFeatured ? 3 : isActive ? 2 : 1,
                        transition: "background 200ms"
                      }}
                    >
                      {/* Featured pulse ring */}
                      {isFeatured && (
                        <div className="dt-breathe" style={{
                          position: "absolute", inset: -10,
                          borderRadius: "50%",
                          border: "1px solid var(--accent)",
                          opacity: 0.45,
                          pointerEvents: "none"
                        }}/>
                      )}
                      {/* Label */}
                      <div style={{
                        position: "absolute",
                        top: `calc(100% + ${isFeatured ? 18 : 8}px)`,
                        left: "50%",
                        transform: "translateX(-50%)",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        lineHeight: 1.15,
                        fontSize: mobile ? 9 : 10,
                        letterSpacing: "0.10em",
                        textTransform: "uppercase",
                        fontWeight: isFeatured ? 800 : 600,
                        color: isFeatured ? "var(--accent)" : isActive ? "var(--fg)" : "rgba(245,241,234,0.65)",
                        transition: "color 200ms"
                      }}>
                        {n.short.split("\n").map((line, i, arr) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < arr.length - 1 && <br/>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* X-axis */}
              <div style={{ position: "absolute", left: 76, right: 0, bottom: 0, height: 44, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="dt-eyebrow dt-fg-soft" style={{ fontSize: 9 }}>LOW</div>
                <div className="dt-eyebrow" style={{ fontSize: 10, color: "var(--accent)" }}>Hospitality Economics</div>
                <div className="dt-eyebrow dt-fg-soft" style={{ fontSize: 9 }}>HIGH</div>
              </div>
            </div>

          </div>

          {/* Active node card */}
          <div style={{
            background: "var(--field2)",
            padding: mobile ? 24 : 32,
            border: "1px solid rgba(245,241,234,0.15)",
            borderLeft: "2px solid var(--accent)",
            transition: "border-color 200ms"
          }}>
            <div className="dt-eyebrow" style={{ color: "var(--accent)", marginBottom: 16 }}>
              {active.featured ? "Downtone" : "Reference"}
            </div>
            <div style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4, textTransform: "uppercase" }}>
              {active.name}
            </div>
            <div className="dt-fg-soft dt-serif-it" style={{ fontSize: 15, marginBottom: 24 }}>
              {active.descriptor}
            </div>

            {/* Spec strip — daypart pattern + avg check */}
            <div style={{
              display: "flex",
              gap: 16,
              alignItems: "stretch",
              marginBottom: 24,
              padding: 16,
              background: "rgba(245,241,234,0.04)",
              border: "1px solid rgba(245,241,234,0.10)"
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="dt-eyebrow dt-fg-soft" style={{ fontSize: 9, marginBottom: 10 }}>Daypart pattern · est. throughput</div>
                <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 48 }}>
                  {active.dayparts.map((v, i) => (
                    <div key={i} style={{
                      flex: 1,
                      height: Math.max(2, v * 0.46) + "px",
                      background: v > 0 ? "var(--accent)" : "rgba(245,241,234,0.18)",
                      opacity: v > 0 ? Math.max(0.35, v / 100) : 0.4,
                      transition: "height 250ms, opacity 250ms"
                    }}/>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                  {["AM", "LUN", "EVE", "LATE"].map((l, i) => (
                    <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 9, letterSpacing: "0.10em", color: "rgba(245,241,234,0.45)" }}>{l}</div>
                  ))}
                </div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(245,241,234,0.15)", paddingLeft: 16, display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 92 }}>
                <div className="dt-eyebrow dt-fg-soft" style={{ fontSize: 9, marginBottom: 6 }}>Avg check</div>
                <div style={{ fontFamily: "Bandit", fontSize: 24, color: "var(--accent)", lineHeight: 1 }}>{active.avgCheck}</div>
                <div className="dt-fg-soft" style={{ fontSize: 10, marginTop: 4 }}>per cover</div>
              </div>
            </div>

            <div className="dt-eyebrow dt-fg-soft" style={{ fontSize: 10, marginBottom: 8 }}>Why it matters</div>
            <div className="dt-body" style={{ fontSize: 14, marginBottom: 24, color: "rgba(245,241,234,0.85)" }}>
              {active.why}
            </div>

            <div className="dt-eyebrow dt-fg-soft" style={{ fontSize: 10, marginBottom: 12 }}>Characteristics</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {active.points.map((pt, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 4, height: 4, background: "var(--accent)", marginTop: 8, flexShrink: 0 }}/>
                  <div style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(245,241,234,0.82)" }}>{pt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer — sits under the quadrant column only, matching its width */}
        <div style={{
          marginTop: mobile ? 32 : 40,
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1.05fr 1fr",
          gap: mobile ? 32 : 56
        }}>
          <div className="dt-serif-it" style={{
            paddingTop: 24,
            borderTop: "1px solid rgba(245,241,234,0.15)",
            fontSize: mobile ? 16 : 18,
            lineHeight: 1.5,
            color: "rgba(245,241,234,0.70)",
            textAlign: "center"
          }}>
            All figures shown are approximations. Comparative positioning is directional and intended to illustrate business model characteristics rather than precise operating metrics.
          </div>
        </div>
      </div>
    </section>
  );
};

window.DTCommunity = function DTCommunity() {
  const mobile = useMobile();
  return (
    <section style={{ padding: 0, overflow: "hidden" }}>
      <div style={{
        height: mobile ? 240 : 520,
        backgroundImage: "url('assets/posters-collage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}/>
    </section>
  );
};

window.DTAssumptions = function DTAssumptions() {
  const { DAYPARTS, SEASON, DOW } = window.DT_DATA;
  const mobile = useMobile();
  return (
    <section id="assumptions" className="dt-section">
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">08 / Model</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">How the day works</span>
        </div>

        <h2 className="dt-h-1" style={{ marginBottom: 16 }}>Assumptions.</h2>
        <div className="dt-body-lg" style={{ marginBottom: 56, maxWidth: 700 }}>
          Revenue is driven by four distinct dayparts across a 75-seat main floor.
        </div>

        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.4fr 1fr", gap: mobile ? 40 : 56 }}>
          <div>
            <div className="dt-eyebrow" style={{ marginBottom: 16 }}>Operations</div>
            <div className="dt-body" style={{ marginBottom: 24 }}>Open 7 days, 8am–2am (18 hours). Coffee + pastry AM, cocktails + curated sound PM.</div>

            <div className="dt-hairline-list" style={{ overflowX: mobile ? "auto" : "visible" }}>
              <div style={{ padding: "12px 0", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 16, minWidth: mobile ? 340 : "auto" }} className="dt-eyebrow dt-fg-soft">
                <div>Daypart</div><div style={{ textAlign: "right" }}>Hours</div><div style={{ textAlign: "right" }}>Avg covers</div><div style={{ textAlign: "right" }}>Avg check</div>
              </div>
              {DAYPARTS.map((r, i) => (
                <div key={i} style={{ padding: "16px 0", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 16, alignItems: "center", minWidth: mobile ? 340 : "auto" }}>
                  <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em", textTransform: "uppercase" }}>{r[0]}</div>
                  <div className="dt-fg-soft" style={{ textAlign: "right", fontSize: 13 }}>{r[1]}</div>
                  <div style={{ textAlign: "right", fontSize: 16 }}>{r[2]}</div>
                  <div style={{ textAlign: "right", fontFamily: "Bandit", fontSize: 18, color: "var(--accent)" }}>{r[3]}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginTop: 32 }}>
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
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: 24 }}>
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
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)", gap: 24 }}>
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
  const mobile = useMobile();
  return (
    <section id="financials" className="dt-section" style={{ background: "var(--field2)" }}>
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">09 / Financials</span>
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
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16 }}>
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
  const mobile = useMobile();
  return (
    <section id="risks" className="dt-section">
      <div className="dt-section-inner">
        <div className="dt-section-eyebrow">
          <span className="dt-section-num">10 / Risks</span>
          <span className="dot"/>
          <span className="dt-eyebrow dt-fg-soft">Read carefully</span>
        </div>

        <h2 className="dt-h-1" style={{ marginBottom: 16 }}>Risk Factors.</h2>
        <div className="dt-body-lg" style={{ marginBottom: 56, maxWidth: 700 }}>
          Investors should carefully consider the following. This is not an exhaustive list.
        </div>

        <div className="dt-hairline-list">
          {RISKS.map(([t, b], i) => (
            <div key={i} style={{ padding: "32px 0", display: "grid", gridTemplateColumns: mobile ? "1fr" : "80px 1fr 2fr", gap: mobile ? 8 : 24, alignItems: "start" }}>
              <div style={{ fontFamily: "Bandit", fontSize: mobile ? 28 : 40, color: "var(--accent)", lineHeight: 1 }}>0{i + 1}</div>
              <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.01em", textTransform: "uppercase" }}>{t}</div>
              {!mobile && <div className="dt-body">{b}</div>}
              {mobile && <div className="dt-body" style={{ gridColumn: "1 / -1" }}>{b}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.DTContact = function DTContact() {
  const mobile = useMobile();
  return (
    <section id="contact" className="dt-section" style={{ background: "var(--accent)", color: "var(--bg)", paddingTop: mobile ? 80 : 120, paddingBottom: mobile ? 80 : 120 }}>
      <div className="dt-section-inner">
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.4fr 1fr", gap: mobile ? 24 : 64, alignItems: "end" }}>
          <h2 style={{
            fontFamily: "Outfit", fontWeight: 900,
            fontSize: "clamp(56px, 9vw, 140px)",
            lineHeight: 0.88, letterSpacing: "-0.05em",
            textTransform: "uppercase", margin: 0
          }}>
            Let's Build<br/>Together.
          </h2>
          <div style={{ fontSize: mobile ? 16 : 18, lineHeight: 1.55, fontWeight: 500 }}>
            The next step is a conversation. We'd love to walk you through the space, share the vision, and answer questions.
          </div>
        </div>

        <div style={{
          marginTop: mobile ? 48 : 80,
          display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr",
          gap: 0,
          borderTop: "1px solid rgba(0,0,0,0.2)",
          borderBottom: "1px solid rgba(0,0,0,0.2)"
        }}>
          <div style={{ padding: mobile ? 28 : 40, borderRight: mobile ? "none" : "1px solid rgba(0,0,0,0.2)", borderBottom: mobile ? "1px solid rgba(0,0,0,0.2)" : "none" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12, opacity: 0.7 }}>Contact</div>
            <div style={{ fontWeight: 800, fontSize: 22, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Quoc Pham</div>
            <div style={{ fontStyle: "italic", fontFamily: "Instrument Serif", fontSize: 18, marginTop: 4 }}>Founder / Creative Director</div>
            <div style={{ marginTop: 16, fontSize: 15 }}>
              (206) 819-8383<br/>
              <a href="mailto:quoc@downtone.nyc" style={{ color: "inherit" }}>quoc@downtone.nyc</a>
            </div>
          </div>
          <div style={{ padding: mobile ? 28 : 40, borderRight: mobile ? "none" : "1px solid rgba(0,0,0,0.2)", borderBottom: mobile ? "1px solid rgba(0,0,0,0.2)" : "none" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12, opacity: 0.7 }}>Schedule</div>
            <a href="https://app.fyxer.com/e/quoc-pham-198/30" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 800, fontSize: 22, textTransform: "uppercase", color: "inherit", textDecoration: "none" }}>Meeting →</a>
            <div style={{ marginTop: 16, fontSize: 15 }}>30 min · video</div>
          </div>
          <div style={{ padding: mobile ? 28 : 40 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12, opacity: 0.7 }}>Web</div>
            <a href="https://www.downtone.nyc" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 800, fontSize: 22, textTransform: "uppercase", color: "inherit", textDecoration: "none" }}>downtone.nyc →</a>
            <div style={{ marginTop: 16, fontSize: 15 }}>301 Grand St<br/>New York · 10002</div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.DTFooter = function DTFooter() {
  const mobile = useMobile();
  return (
    <footer style={{
      padding: mobile ? "40px 24px" : "48px",
      maxWidth: 1200, margin: "0 auto",
      display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 2fr", gap: mobile ? 24 : 32,
      borderTop: "1px solid rgba(245,241,234,0.10)"
    }}>
      <img src="assets/Downtone-logo-white.svg" alt="Downtone" style={{ height: 22, width: "auto", alignSelf: "flex-start" }}/>
      <div className="dt-fg-soft" style={{ fontSize: 11, lineHeight: 1.7, maxWidth: 720 }}>
        Confidential. Intended solely for accredited investors. Projections are forward-looking estimates and not a guarantee of returns. Investment in early-stage hospitality ventures involves significant risk, including loss of principal. This is not an offer to sell securities.
      </div>
    </footer>
  );
};
