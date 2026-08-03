// Standalone taxes-and-reserves tool — served at its own unlinked URL
// (behind the same password gate as the brief), not part of the main page.
// One illustrative year, one idea: the cash the company keeps in reserve
// decides how much reaches you, while taxable income — a separate
// assumption — decides what you owe.

// Deal terms for a given investment. $500K raise buys the 20% Class B pool;
// Class B receives 70% of distributable cash pre-flip, 20% after.
function dtInvestorTerms(inv) {
  const pool = inv / 500000; // share of the Class B pool
  return {
    investment: inv,
    ownership: pool * 0.20, // company-level ownership — drives the K-1
    preRate: 0.70 * pool,   // effective share of distributable cash pre-flip
    postRate: 0.20 * pool,  // effective share after the preference is returned
    preference: 1.25 * inv
  };
}

// The tool itself — scenario chips, levers, and the income bar.
window.DTTaxTool = function DTTaxTool({ inv }) {
  const { useState } = React;
  const mobile = useMobile();
  const { DIST_CASH, SCENARIOS, fmt } = window.DT_DATA;
  const OOP = "#FF5D00"; // burnt orange for out-of-pocket — distinct from the amber accent

  const [selIdx, setSelIdx] = useState(0);
  const [flipped, setFlipped] = useState(false); // pre-flip vs post-flip lens
  const [ov, setOv] = useState({
    cashFlow: SCENARIOS[0].cashFlow,
    kept: SCENARIOS[0].kept,
    taxableIncome: SCENARIOS[0].taxableIncome,
    taxRate: SCENARIOS[0].taxRate
  });

  // A scenario's default reserve level can differ by waterfall position
  // (keptPost keeps the phantom preset break-even at the 1% post-flip share)
  const keptFor = (sc, flip) => (flip && sc.keptPost != null ? sc.keptPost : sc.kept);

  const pick = i => {
    setSelIdx(i);
    setOv({ cashFlow: SCENARIOS[i].cashFlow, kept: keptFor(SCENARIOS[i], flipped), taxableIncome: SCENARIOS[i].taxableIncome, taxRate: SCENARIOS[i].taxRate });
  };

  // Toggling the switch re-applies the scenario's default reserves for the
  // new position — but only if the user hasn't moved the slider themselves
  const setFlip = val => {
    setFlipped(val);
    const sc = SCENARIOS[selIdx];
    if (ov.kept === keptFor(sc, flipped)) setOv(p => ({ ...p, kept: keptFor(sc, val) }));
  };

  const s = SCENARIOS[selIdx];
  const t = dtInvestorTerms(inv);
  const rate = flipped ? t.postRate : t.preRate;

  const distributed = Math.max(0, ov.cashFlow - ov.kept);
  const gross = distributed * rate;                // your share of distributed cash
  const k1 = ov.taxableIncome * t.ownership;       // may be negative (loss allocation)
  const estTax = Math.max(0, k1 * ov.taxRate);
  const advance = Math.min(estTax, gross);         // carved out of the distribution
  const ordinary = gross - advance;
  // Round to whole dollars so exact break-even setups don't trip float dust
  const outOfPocket = Math.max(0, Math.round(estTax - advance));
  const phantom = Math.round(estTax) > Math.round(gross);

  const usd = n => (n < 0
    ? "($" + Math.abs(Math.round(n)).toLocaleString() + ")"
    : "$" + Math.round(n).toLocaleString());
  const pct = n => (n * 100).toFixed(1).replace(/\.0$/, "") + "%";

  // Income bar on a fixed axis scaled to the investment: −20% to +80% of the
  // amount invested, zero at the 20% mark. Out-of-pocket extends left of
  // zero; cash received extends right (advance muted, cash-in-pocket bright).
  const AXIS_LO = 0.2, AXIS_HI = 0.8, AXIS = AXIS_LO + AXIS_HI;
  const zeroPos = (AXIS_LO / AXIS) * 100;
  const frac = n => (Math.min(n, AXIS_HI * inv) / inv / AXIS) * 100; // value → % of track width
  const oopW = (Math.min(outOfPocket, AXIS_LO * inv) / inv / AXIS) * 100;
  const rightW = frac(gross);
  const advW = Math.min(frac(advance), rightW);
  const ticks = [-0.2, 0, 0.2, 0.4, 0.6, 0.8];

  const slide = (label, value, show, min, max, step, key) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <span className="dt-eyebrow" style={{ color: "rgba(245,241,234,0.55)" }}>{label}</span>
        <span style={{ fontFamily: "Bandit", fontSize: 18, color: "var(--accent)" }}>{show}</span>
      </div>
      <input type="range" className="dt-slider" min={min} max={max} step={step}
        value={value} onChange={e => setOv(p => ({ ...p, [key]: +e.target.value }))}/>
    </div>
  );

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1.2fr", gap: mobile ? 32 : 56 }}>

        {/* Column 1 — scenarios */}
        <div>
          <div className="dt-eyebrow" style={{ marginBottom: 14 }}>Scenario</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SCENARIOS.map((sc, i) => {
              const active = i === selIdx;
              return (
                <div key={sc.id} onClick={() => pick(i)} style={{
                  cursor: "pointer", padding: "12px 16px",
                  border: "1px solid " + (active ? "var(--accent)" : "rgba(245,241,234,0.15)"),
                  background: active ? "var(--field2)" : "transparent"
                }}>
                  <div style={{ fontWeight: 800, fontSize: 13, textTransform: "uppercase", color: active ? "var(--accent)" : "var(--fg)" }}>{sc.name}</div>
                  <div className="dt-fg-soft" style={{ fontSize: 12, marginTop: 2 }}>{sc.tag}</div>
                </div>
              );
            })}
          </div>
          <div style={{ borderLeft: "2px solid var(--accent)", padding: "2px 0 2px 16px", marginTop: 20 }}>
            <div style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(245,241,234,0.85)" }}>{s.narrative}</div>
          </div>
        </div>

        {/* Column 2 — levers */}
        <div>
          <div className="dt-eyebrow" style={{ marginBottom: 14 }}>Levers</div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            <span className="dt-eyebrow" style={{ color: "rgba(245,241,234,0.55)" }}>Projected year</span>
            <div style={{ display: "flex", gap: 5 }}>
              {DIST_CASH.map((c, i) => {
                const on = ov.cashFlow === c;
                return (
                  <button key={i} onClick={() => setOv(p => ({ ...p, cashFlow: c }))} style={{
                    padding: "6px 12px", cursor: "pointer",
                    fontFamily: "Outfit", fontWeight: 700, fontSize: 11,
                    background: on ? "var(--accent)" : "transparent",
                    color: on ? "var(--bg)" : "rgba(245,241,234,0.7)",
                    border: "1px solid " + (on ? "var(--accent)" : "rgba(245,241,234,0.2)")
                  }}>Yr {i + 1}</button>
                );
              })}
            </div>
          </div>

          {slide("Free cash flow", ov.cashFlow, fmt(ov.cashFlow), 0, 800000, 10000, "cashFlow")}
          {slide("Cash kept in the company", ov.kept, fmt(ov.kept), 0, 800000, 10000, "kept")}
          {slide("Company taxable income", ov.taxableIncome,
            ov.taxableIncome < 0 ? "(" + fmt(Math.abs(ov.taxableIncome)) + ")" : fmt(ov.taxableIncome),
            -300000, 800000, 10000, "taxableIncome")}
          {slide("Blended tax rate", ov.taxRate, Math.round(ov.taxRate * 100) + "%", 0, 0.55, 0.01, "taxRate")}

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
            <span className="dt-eyebrow" style={{ color: "rgba(245,241,234,0.55)" }}>Waterfall</span>
            <div style={{ display: "flex", gap: 5 }}>
              {[["Pre-flip", false], ["Post-flip", true]].map(([label, val]) => {
                const on = flipped === val;
                return (
                  <button key={label} onClick={() => setFlip(val)} style={{
                    padding: "6px 12px", cursor: "pointer",
                    fontFamily: "Outfit", fontWeight: 700, fontSize: 11,
                    background: on ? "var(--accent)" : "transparent",
                    color: on ? "var(--bg)" : "rgba(245,241,234,0.7)",
                    border: "1px solid " + (on ? "var(--accent)" : "rgba(245,241,234,0.2)")
                  }}>{label}</button>
                );
              })}
            </div>
            <span className="dt-fg-soft" style={{ fontSize: 11 }}>your share: {pct(rate)}</span>
          </div>
        </div>
      </div>

      {/* Your year — income bar */}
      <div className="dt-card" style={{ padding: mobile ? 24 : "32px 40px", marginTop: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
          <span className="dt-eyebrow">Your year at {usd(inv)}</span>
          <span className="dt-fg-soft" style={{ fontSize: 12 }}>
            company distributes {fmt(distributed)} · your K-1 {usd(k1)}
          </span>
        </div>

        {gross === 0 && outOfPocket === 0 ? (
          <div className="dt-fg-soft dt-serif-it" style={{ fontSize: 14, padding: "10px 0" }}>
            No distribution and no tax due this year.
          </div>
        ) : (
          <div>
            <div style={{ position: "relative", height: 32, background: "rgba(245,241,234,0.06)" }}>
              {ticks.map(f => (
                <div key={f} style={{ position: "absolute", left: ((f + AXIS_LO) / AXIS) * 100 + "%", top: 0, bottom: 0, width: 1, background: "rgba(245,241,234,0.12)" }}/>
              ))}
              {outOfPocket > 0 && (
                <div style={{ position: "absolute", left: (zeroPos - oopW) + "%", top: 0, bottom: 0, width: oopW + "%", background: OOP }}/>
              )}
              {advance > 0 && (
                <div style={{ position: "absolute", left: zeroPos + "%", top: 0, bottom: 0, width: advW + "%", background: "rgba(255,155,0,0.4)" }}/>
              )}
              {ordinary > 0 && (
                <div style={{ position: "absolute", left: (zeroPos + advW) + "%", top: 0, bottom: 0, width: (rightW - advW) + "%", background: "var(--accent)" }}/>
              )}
              <div style={{ position: "absolute", left: zeroPos + "%", top: -5, bottom: -5, width: 2, background: "var(--fg)" }}/>
            </div>
            <div style={{ position: "relative", height: 16, marginTop: 4 }}>
              {ticks.map(f => (
                <span key={f} className="dt-fg-soft" style={{ position: "absolute", left: ((f + AXIS_LO) / AXIS) * 100 + "%", transform: "translateX(-50%)", fontSize: 10 }}>
                  {f === 0 ? "0" : (f < 0 ? "−" : "") + fmt(Math.abs(f) * inv)}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: mobile ? 14 : 28, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "rgba(245,241,234,0.78)" }}>
                <span style={{ display: "inline-block", width: 10, height: 10, background: "var(--accent)", marginRight: 6 }}/>
                Cash in pocket <b style={{ color: "var(--accent)" }}>{usd(ordinary)}</b>
              </span>
              <span style={{ fontSize: 12, color: "rgba(245,241,234,0.78)" }}>
                <span style={{ display: "inline-block", width: 10, height: 10, background: "rgba(255,155,0,0.4)", marginRight: 6 }}/>
                Tax advance (pays your {usd(estTax)} tax) <b>{usd(advance)}</b>
              </span>
              <span style={{ fontSize: 12, color: "rgba(245,241,234,0.78)" }}>
                <span style={{ display: "inline-block", width: 10, height: 10, background: OOP, marginRight: 6 }}/>
                Out of pocket <b style={{ color: outOfPocket > 0 ? OOP : "inherit" }}>{usd(outOfPocket)}</b>
              </span>
            </div>
          </div>
        )}

        {phantom && (
          <div style={{ marginTop: 18, padding: "12px 16px", border: "1px solid " + OOP, fontSize: 13, lineHeight: 1.6, color: "rgba(245,241,234,0.85)" }}>
            <span className="dt-eyebrow" style={{ marginRight: 8, color: OOP }}>Phantom income</span>
            Tax ({usd(estTax)}) exceeds the cash you receive ({usd(gross)}) — you'd owe tax on income
            allocated to you even though the cash stayed in the company.
          </div>
        )}
      </div>

      <div className="dt-fg-soft dt-serif-it" style={{ fontSize: 11.5, marginTop: 16, lineHeight: 1.7 }}>
        Illustrative only, not tax advice. Tax advances aren't guaranteed and reduce future distributions.
      </div>
    </div>
  );
};

// Full standalone page: on-brand shell + investment slider + the tool.
window.DTTaxPage = function DTTaxPage() {
  const { useState } = React;
  const mobile = useMobile();
  const [inv, setInv] = useState(25000);
  const pool = inv / 500000;

  return (
    <div className="dt-page dt-grain" style={{
      "--bg": "#141414", "--accent": "#FF9B00", "--field2": "#1E1300", "--fg": "#F5F1EA",
      minHeight: "100vh"
    }}>
      <section className="dt-section" style={{ paddingTop: mobile ? 48 : 80 }}>
        <div className="dt-section-inner" style={{ maxWidth: 1080 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: mobile ? 32 : 48 }}>
            <span style={{ fontFamily: "Outfit", fontWeight: 900, fontSize: 20, letterSpacing: "-0.02em", color: "var(--accent)" }}>DOWNTONE</span>
            <span className="dt-eyebrow dt-fg-soft">Investor tool · Confidential</span>
          </div>

          <h1 className="dt-h-1" style={{ marginBottom: 12 }}>Advanced Calculator.</h1>
          <div className="dt-serif-it" style={{ fontSize: 17, color: "var(--accent)", marginBottom: 36, maxWidth: 720 }}>
            Reserves decide how much cash reaches you. Taxable income — a separate assumption —
            decides what you owe the IRS. This shows the tension between the two.
          </div>

          {/* Investment console */}
          <div className="dt-card" style={{ padding: mobile ? 24 : "28px 40px", marginBottom: mobile ? 32 : 48 }}>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr auto", gap: mobile ? 16 : 48, alignItems: "end" }}>
              <div>
                <div className="dt-eyebrow" style={{ marginBottom: 6 }}>Your investment</div>
                <div style={{ fontFamily: "Outfit", fontWeight: 900, fontSize: mobile ? 36 : 44, lineHeight: 1, letterSpacing: "-0.04em" }}>
                  ${inv.toLocaleString()}
                </div>
              </div>
              <div style={{ textAlign: mobile ? "left" : "right" }}>
                <div className="dt-eyebrow" style={{ marginBottom: 6 }}>Ownership</div>
                <div style={{ fontFamily: "Bandit", fontSize: mobile ? 26 : 32, lineHeight: 1, color: "var(--accent)" }}>
                  {(pool * 20).toFixed(1)}% <span style={{ fontFamily: "Outfit", fontSize: 12, color: "rgba(245,241,234,0.55)" }}>of company</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <input type="range" className="dt-slider" min={12500} max={125000} step={2500}
                value={inv} onChange={e => setInv(+e.target.value)}/>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span className="dt-eyebrow dt-fg-soft">$12,500</span>
                <span className="dt-eyebrow dt-fg-soft">$125,000</span>
              </div>
            </div>
          </div>

          <DTTaxTool inv={inv}/>
        </div>
      </section>
    </div>
  );
};
