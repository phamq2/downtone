// Shared data and helpers for the investor page

window.DT_DATA = (function() {
  const NAV = [
    ["overview", "Overview"],
    ["opportunity", "Offer"],
    ["projection", "Returns"],
    ["funding", "Funding"],
    ["timeline", "Timeline"],
    ["why", "Why Now"],
    ["assumptions", "Model"],
    ["financials", "Financials"],
    ["risks", "Risks"]
  ];

  const TIER_MIN = { Founder: 17500, Insider: 70000, Premium: 140000 };

  const PERKS = {
    Founder: [
      "Name on the Founders Wall",
      "Priority access to all ticketed events",
      "Annual investor appreciation evening"
    ],
    Insider: [
      "One private Sound Room event (30 guests, beverage package)",
      "Complimentary daily coffee membership"
    ],
    Premium: [
      "One private Sound Room event per year (recurring)",
      "Reserved seating at any public event",
      "“Presented by” naming on one series per year"
    ]
  };

  const YR_DIST = [89806, 268546, 373746, 439393, 205105];
  const YR_TOTAL = 1376596;

  const DAYPARTS = [
    ["Breakfast", "8a–12p", "75", "$10.88"],
    ["Lunch",     "12p–5p", "112", "$12.93"],
    ["Dinner",    "5p–9p", "118", "$37.70"],
    ["Late Night", "9p–2a", "73", "$31.20"]
  ];

  const SEASON = [
    ["J", 85], ["F", 90], ["M", 100], ["A", 105],
    ["M", 110], ["J", 100], ["J", 90], ["A", 90],
    ["S", 105], ["O", 110], ["N", 105], ["D", 110]
  ];

  const PHASES = [
    {
      tag: "00", name: "Phase 0", date: "May–Sep 2026",
      kind: "active",
      headline: "Soft launch · coffee + programming",
      points: [
        "Coffee program launches",
        "Curated events + programming",
        "Validate revenue assumptions",
        "Build community + email list",
        "Operator capital funds this"
      ]
    },
    {
      tag: "01", name: "Construction", date: "Sep–Nov 2026",
      kind: "next",
      headline: "Buildout, hiring & sound system",
      points: [
        "Full ground floor buildout",
        "SBA + investor capital deployed",
        "Hiring: GM, bar, baristas",
        "Sound system + acoustics",
        "Permitting + inspections"
      ]
    },
    {
      tag: "02", name: "Launch", date: "Dec 2026+",
      kind: "future",
      headline: "Day-to-night operations begin",
      points: [
        "Day-to-night operations",
        "Coffee → cocktails → listening",
        "Positive EBITDA by end of Y1",
        "Sound Room programming begins",
        "Stabilized by mid-Year 2"
      ]
    }
  ];

  const FIN_ROWS = [
    ["Total Revenue",        ["$2.91M","$3.41M","$3.51M","$3.61M","$3.72M"], "100%",   "—",       "sub"],
    ["Cost of Goods",        ["$930K","$1.09M","$1.12M","$1.15M","$1.19M"],  "31.9%",  "28–35%",  "det"],
    ["Gross Profit",         ["$1.98M","$2.32M","$2.39M","$2.46M","$2.53M"], "68.1%",  "—",       "sub"],
    ["Payroll & Benefits",   ["$1.00M","$1.05M","$1.08M","$1.11M","$1.15M"], "30.8%",  "25–35%",  "det"],
    ["Controllable Exp.",    ["$471K","$541K","$550K","$556K","$569K"],      "15.9%",  "12–18%",  "det"],
    ["Occupancy Costs",      ["$273K","$281K","$290K","$298K","$307K"],      "8.3%",   "6–10%",   "det"],
    ["EBITDA — Main Floor",  ["$207K","$415K","$435K","$460K","$479K"],      "12.2%",  "8–15%",   "hl"],
    ["Basement Phase 2",     ["—","$54K","$135K","$179K","$179K"],            "",       "",        "det"],
    ["Less: SBA Service",    ["($73K)","($73K)","($73K)","($73K)","($73K)"], "",       "",        "det"],
    ["Distributable Cash*",  ["$89K","$385K","$497K","$567K","$585K"],        "",       "",        "hl"]
  ];

  const RISKS = [
    ["Projections are estimates",
     "All projections are forward-looking estimates. Actual results may differ materially. Distributions may be lower, delayed, or not paid."],
    ["Revenue may underperform",
     "At 90% of projections, the business remains solvent by Year 2. At 75%, Year 1 EBITDA is negative, though the $226K reserve provides a buffer."],
    ["Key-person dependency",
     "Substantially dependent on the operator. Operating agreement includes key-person provisions and a salaried GM ($80K) for continuity."],
    ["Liquidity & liability",
     "No public market. Transfer subject to operator approval. Expect a multi-year hold. Liability limited to amount invested."],
    ["Distributions not guaranteed",
     "Paid from distributable cash flow after expenses, debt, draw, and reserves. Early-stage venture with no operating history."]
  ];

  const WHY = [
    ["The correction.",
     "The rise of third spaces is not a trend — it’s a correction. After years of isolation and digital overload, people are seeking genuine connection, sensory richness, and belonging. Vinyl sales are at a 30-year high. Listening bars are spreading globally. The experience economy continues to outpace traditional hospitality."],
    ["The alternative.",
     "Most of what’s being built is exclusive — members clubs, luxury lounges, velvet ropes. Downtone is the opposite. Rooted in community, accessibility, and culture."],
    ["The neighborhood.",
     "Lower Manhattan is at a crossroads. The spaces that defined Chinatown and the LES’s creative identity are disappearing. Downtone is built to be a gathering place that belongs to the community — not above it."],
    ["The foundation.",
     "Quoc Pham has spent 12 years proving people will show up when you give them great sound and a reason to be in the same room together — building a globally recognized collective, a record label, and a community that spans continents, all without a permanent home."]
  ];

  function fmt(n) {
    return Math.abs(n) >= 1e6
      ? "$" + (n / 1e6).toFixed(2) + "M"
      : Math.abs(n) >= 1e3
        ? "$" + Math.round(n / 1e3).toLocaleString() + "K"
        : "$" + Math.round(n).toLocaleString();
  }

  // Approved color pairings — dark base + bright accent. Plus a 'field2'
  // (a second dark base) used for color-blocked cards. We pick a different
  // dark from the palette so cards stand off the field.
  const PAIRS = [
    { id: "black-amber",   bg: "#141414", accent: "#FF9B00", field2: "#1E1300" },
    { id: "green-pink",    bg: "#002100", accent: "#FFA0F1", field2: "#001500" },
    { id: "olive-peach",   bg: "#201900", accent: "#FFC0B9", field2: "#161000" },
    { id: "olive-lilac",   bg: "#201900", accent: "#A19AFF", field2: "#161000" },
    { id: "olive-magenta", bg: "#201900", accent: "#FF6BF0", field2: "#161000" },
    { id: "wine-red",      bg: "#330000", accent: "#FF0000", field2: "#220000" },
    { id: "purple-orange", bg: "#1E0039", accent: "#FF5D00", field2: "#150029" },
    { id: "plum-blue",     bg: "#21132D", accent: "#005CFF", field2: "#170d20" },
    { id: "mauve-green",   bg: "#362734", accent: "#00EB72", field2: "#251a24" },
    { id: "wine-lilac",    bg: "#330000", accent: "#A19AFF", field2: "#220000" }
  ];

  return { NAV, TIER_MIN, PERKS, YR_DIST, YR_TOTAL, DAYPARTS, SEASON, PHASES, FIN_ROWS, RISKS, WHY, PAIRS, fmt };
})();
