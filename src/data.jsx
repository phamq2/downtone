// Shared data and helpers for the investor page

// Reactive mobile hook — returns true when viewport ≤ 768px
window.useMobile = function useMobile() {
  const mq = window.matchMedia("(max-width: 768px)");
  const [m, setM] = React.useState(mq.matches);
  React.useEffect(() => {
    const fn = e => setM(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return m;
};

window.DT_DATA = (function() {
  const NAV = [
    ["overview", "Overview"],
    ["space", "Space"],
    ["opportunity", "Offer"],
    ["projection", "Returns"],
    ["funding", "Funding"],
    ["timeline", "Timeline"],
    ["why", "Thesis"],
    ["positioning", "Positioning"],
    ["assumptions", "Model"],
    ["financials", "Financials"],
    ["risks", "Risks"]
  ];

  // Sketchfab design models of the venue — one entry per floor. When the
  // second floor's model is ready, add it here and the floor toggle appears
  // automatically in the Space section.
  const SPACE_MODELS = [
    {
      id: "53b5fcbf979740cda38d7b20ef0ba363",
      label: "Ground Floor",
      stat: "70 seats · 8am–2am",
      points: [
        "Primary revenue driver, anchored by the bar",
        "Coffee, bar, and kitchen program (finishing kitchen)"
      ],
      title: "DOWNTONE_ROUGH_COLOR",
      url: "https://sketchfab.com/3d-models/downtone-rough-color-53b5fcbf979740cda38d7b20ef0ba363",
      author: "HouseUnderMagic",
      authorUrl: "https://sketchfab.com/HouseUnderMagic"
    },
    {
      id: "1b7b7845f98e4b05ac12ab8d16e71b34",
      label: "Lower Level",
      stat: "25 seats · Programming-led",
      points: [
        "Dedicated listening room, plus prep kitchen and back of house",
        "Ticketed listening sessions, private events, curated activations",
        "Secondary revenue driver and brand builder"
      ],
      title: "DOWNTONE_CELLAR_ROUGH",
      url: "https://sketchfab.com/3d-models/downtone-cellar-rough-1b7b7845f98e4b05ac12ab8d16e71b34",
      author: "HouseUnderMagic",
      authorUrl: "https://sketchfab.com/HouseUnderMagic"
    }
  ];

  const TIER_MIN = { Founder: 12500, Insider: 50000, Premium: 100000 };

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

  const YR_DIST = [310000, 360000, 140000, 140000, 140000];
  const YR_TOTAL = 1090000;

  // Company distributable cash by year — numeric source for both the
  // financials statement row and the investor scenario model.
  const DIST_CASH = [440000, 653000, 699000, 701000, 708000];

  // Scenario presets for the advanced taxes-and-reserves view in Returns.
  // A single illustrative year: `cashFlow` is the company's distributable
  // cash before the reserve decision, `kept` is cash held back (reserves +
  // reinvestment) — the key lever. taxableIncome is deliberately independent
  // of cash flow: depreciation, amortization, and tax-allocation schedules
  // separate the two, and none are modeled here. Values are illustrative
  // placeholders.
  const SCENARIOS = [
    { id: "plan", name: "At plan",
      tag: "Everything distributed.",
      narrative: "The company hits plan and pays out all distributable cash — no extra reserves held. Your distribution comfortably covers the tax on your K-1 allocation, so the tax advance is just a slice of money you were receiving anyway. This is the clean case: cash and taxes move together.",
      cashFlow: 440000, kept: 0, taxableIncome: 250000, taxRate: 0.40 },
    { id: "reserve", name: "Prudent reserve",
      tag: "Cushion held back first.",
      narrative: "Same year, but the company holds back $150K to build its operating cushion — the prudent move for a young venue. Less cash reaches you, but your taxes stay fully covered by the advance. You trade some of this year's distribution for a safer company.",
      cashFlow: 440000, kept: 150000, taxableIncome: 250000, taxRate: 0.40 },
    { id: "phantom", name: "Phantom income",
      tag: "Taxed on cash you didn't get.",
      narrative: "The company is profitable on paper but keeps most of its cash. Your K-1 shows income even though little cash reaches you — phantom income. As set here, the tax advance exactly covers your tax and you break even: no cash in pocket, nothing owed. Drag reserves any higher and the advance falls short — the difference comes out of your pocket.",
      // kept is tuned so the advance exactly equals the tax (break-even);
      // keptPost is the equivalent break-even reserve level post-flip (1% share)
      cashFlow: 440000, kept: 360000, keptPost: 160000, taxableIncome: 560000, taxRate: 0.50 },
    { id: "loss", name: "Loss year",
      tag: "No income, no tax, no cash.",
      narrative: "The company posts a taxable loss. Cash is tight, nothing is distributed, and there is no tax to owe — so no advance is needed. The allocated loss may offset your other income, subject to basis, at-risk, and passive-activity limitations.",
      cashFlow: 0, kept: 0, taxableIncome: -200000, taxRate: 0.40 }
  ];

  const DAYPARTS = [
    ["Breakfast", "8a–12p", "80",  "$6.00"],
    ["Lunch",     "12p–5p", "105", "$12.93"],
    ["PM",        "5p–2a",  "180", "$42.95"],
    ["Brunch*",   "10a–3p", "99",  "$25.70"]
  ];

  const SEASON = [
    ["J", 85], ["F", 90], ["M", 100], ["A", 105],
    ["M", 110], ["J", 100], ["J", 90], ["A", 90],
    ["S", 105], ["O", 110], ["N", 105], ["D", 110]
  ];

  // [label, budget, description]
  const USE_OF_FUNDS = [
    ["Build Out",                           475000, "GC, millwork, MEP, and the Sound Room."],
    ["Equipment & FF&E",                    318000, "Espresso, hi-fi, furniture, and kitchen gear."],
    ["Working Capital + Contingency",       205000, "Operating cushion and overrun reserve."],
    ["Soft Costs",                          183000, "Architecture, engineering, and permits."],
    ["Pre-Opening + Startup",               100000, "Hiring, training, inventory, and launch."],
    ["Deposits & Financing",                 96000, "Lease/utility deposits and financing costs."],
    ["Pre-Opening Burn (rent + utilities)",  85000, "Rent and utilities carried before opening."]
  ];

  const DOW = [
    ["Mon", 70], ["Tue", 78], ["Wed", 88],
    ["Thu", 105], ["Fri", 135], ["Sat", 145], ["Sun", 100]
  ];

  const PHASES = [
    {
      name: "Mobilize", date: "May–June 2026",
      kind: "done",
      headline: "Concept becomes executable build plan",
      points: [
        "Lease signed; CB stipulation for liquor license secured",
        "SBA financing secured; capital stack confirmed",
        "Architect, expeditor, MEP, and GC paths confirmed",
        "Ground floor + lower level built simultaneously"
      ]
    },
    {
      name: "Design", date: "July–Aug 2026",
      kind: "active",
      headline: "Drawings finalized across both floors",
      points: [
        "Design development closes out — bar, coffee, service flow, seating locked",
        "Sound system placement and acoustic strategy confirmed for both floors",
        "MEP coordinated; permit package prepared",
        "Long-lead equipment scoped against real quotes"
      ]
    },
    {
      name: "Permits & GC", date: "Sept–Oct 2026",
      kind: "next",
      headline: "Permits filed, contractor bid and locked in",
      points: [
        "Permit package submitted; expeditor drives DOB approvals",
        "GC bids collected against finished drawings; contractor selected",
        "Construction contract, schedule, and budget locked",
        "Long-lead equipment ordered so delivery meets the build"
      ]
    },
    {
      name: "Buildout", date: "Nov 2026 – Mar 2027",
      kind: "future",
      headline: "Construction, equipment install, sound system tuning",
      points: [
        "Demolition, framing, MEP, and bar/coffee infrastructure go in",
        "Acoustic treatments and sound system installed and tuned across both floors",
        "Furniture, millwork, signage, POS, security, and connectivity installed",
        "Hiring plan finalized; GM and COO operating systems built"
      ]
    },
    {
      name: "Training", date: "April 2027",
      kind: "future",
      headline: "Built space becomes an operating venue",
      points: [
        "Hire and train baristas, bartenders, servers, and support",
        "All menus finalized and costed — coffee, bar, food",
        "Sound system tuned for day and night modes",
        "Service simulations run, SOPs prepared, soft-opening calendar confirmed"
      ]
    },
    {
      name: "Soft Launch", date: "May 2027",
      kind: "future",
      headline: "Open carefully, learn quickly, stabilize",
      points: [
        "Friends and family, then limited public soft open — day-to-night online",
        "Menus, staffing, seating, and service pacing adjust to real demand",
        "Daily reporting on revenue, labor, COGS, and guest feedback",
        "Opening press and community communications launch"
      ]
    },
    {
      name: "Lower Level Launch", date: "September 2027",
      kind: "future",
      headline: "Sound Room programming goes live",
      points: [
        "Lower level built and tuned alongside the ground floor — opens once main service is stable",
        "Ticketed listening, private dining, and curated activations begin",
        "Members and Founder-tier events activated downstairs",
        "Second revenue engine layers onto an already-stabilized main floor"
      ]
    }
  ];

  const FIN_ROWS = [
    ["Total Revenue",  ["$3.46M","$3.99M","$4.11M","$4.23M","$4.36M"],      "100%",  "—",      "sub"],
    ["Cost of Goods",  ["$1.02M","$1.17M","$1.21M","$1.25M","$1.28M"],      "29.5%", "28–35%", "det"],
    ["Gross Profit",   ["$2.44M","$2.81M","$2.90M","$2.98M","$3.07M"],      "70.5%", "—",      "sub"],
    ["Payroll",        ["$1.15M","$1.20M","$1.24M","$1.28M","$1.32M"],      "33.2%", "25–35%", "det"],
    ["Controllable",   ["$505K","$570K","$579K","$584K","$597K"],            "14.6%", "12–18%", "det"],
    ["Occupancy",      ["$300K","$315K","$328K","$338K","$348K"],            "8.7%",  "6–10%",  "det"],
    ["EBITDA",         ["$452K","$685K","$711K","$746K","$774K"],            "13.1%", "8–15%",  "hl"],
    ["Lower Level",    ["$91K","$136K","$181K","$181K","$181K"],             "",      "",       "det"],
    ["Debt Service",   ["($103K)","($168K)","($194K)","($227K)","($247K)"], "",      "",       "det"],
    ["Distrib. Cash",  DIST_CASH.map(fmt),                                   "",      "",       "hl"]
  ];

  const RISKS = [
    ["Projections are estimates",
     "All projections are forward-looking estimates. Actual results may differ materially. Distributions may be lower, delayed, or not paid."],
    ["Revenue may underperform",
     "At 90% of projections, the business remains solvent by Year 2. At 75%, Year 1 EBITDA is negative, though the $175K reserve + $100K credit line provides buffer."],
    ["Key-person dependency",
     "Substantially dependent on the operator. Operating agreement includes key-person provisions and a salaried GM ($80K) for continuity."],
    ["Liquidity & liability",
     "No public market. Transfer subject to operator approval. Expect a multi-year hold. Liability limited to amount invested."],
    ["Distributions not guaranteed",
     "Paid from distributable cash flow after expenses, debt, and reserves. Early-stage venture with no operating history."]
  ];

  // Each thesis belief: a title, a few body paragraphs (lead), and a punch
  // line — the standout statement rendered in the accent serif.
  const WHY = [
    {
      t: "Hospitality first.",
      lead: [
        "Modern hospitality is too often optimized for novelty, visibility, and consumption. Beautiful spaces can feel emotionally cold — aesthetics prized over comfort, atmosphere, and the simple feeling of wanting to stay.",
        "Downtone starts from a different belief:"
      ],
      punch: "Hospitality comes first. Everything else exists to deepen that experience."
    },
    {
      t: "Sound shapes feeling.",
      lead: [
        "Music is often treated as decoration. We treat sound as part of the hospitality experience itself — it shapes mood, pacing, conversation, and memory, and how a room is remembered."
      ],
      punch: "Good sound should feel communal, not exclusive."
    },
    {
      t: "Ritual over novelty.",
      lead: [
        "The strongest hospitality spaces become part of people’s routines — morning coffee, one drink after work, familiar faces, a favorite seat. Downtone is designed around repeat behavior, not constant reinvention."
      ],
      punch: "A healthy Tuesday matters more than a packed special event."
    },
    {
      t: "Culture is earned.",
      lead: [
        "Programming can deepen a room, but it can’t substitute for one. Meaning emerges through consistency, trust, and repetition over time. We’re not trying to manufacture culture."
      ],
      punch: "We are creating the conditions for it to emerge."
    }
  ];



  // Positioning section. Coordinates are 0–100 on each axis (X = hospitality
  // economics, Y = cultural differentiation). Downtone is featured but
  // intentionally not isolated in the extreme corner.
  const POSITIONING = {
    intro: "Downtone sits at the intersection of hospitality performance and cultural gravity. Rather than operating as only a café, cocktail bar, or listening venue, Downtone is designed as an all-day hospitality engine where sound shapes the experience from morning coffee through late-night cocktails and listening.",
    takeaway: "The result is a differentiated hospitality model designed for high dwell time, strong beverage economics, repeat visitation, and cultural defensibility.",
    // Daypart bars are 0–100 relative throughput (AM, LUN, EVE, LATE).
    // Avg check is a directional per-cover estimate.
    nodes: [
      {
        id: "downtone", name: "Downtone", short: "DOWNTONE",
        descriptor: "Sound-led hospitality, all day",
        x: 76, y: 78, featured: true,
        dayparts: [60, 90, 100, 60],
        avgCheck: "~$30",
        why: "Sound-led hospitality designed to monetize across morning coffee, afternoon work, aperitivo, and late-night listening on a single ground floor.",
        takeaway: "Operates as the all-day hospitality engine the category currently lacks.",
        points: [
          "70 ground-floor seats + 25-seat Sound Room",
          "Sound system as defining experience",
          "Cultural lineage from Dub-Stuy",
          "Lower level built simultaneously, programming launches September 2027"
        ]
      },
      {
        id: "dcp", name: "Double Chicken Please", short: "DOUBLE\nCHICKEN\nPLEASE",
        descriptor: "Cocktail destination",
        x: 88, y: 48,
        dayparts: [0, 0, 55, 100],
        avgCheck: "~$60",
        why: "Demonstrates how a tightly run cocktail program sustains destination demand and high-margin throughput in Lower Manhattan.",
        takeaway: "Validates the beverage economics ceiling. Downtone broadens the daypart and adds cultural identity.",
        points: [
          "~85 seats",
          "Cocktails as primary revenue",
          "Critical and cultural credibility",
          "Single daypart limits revenue ceiling"
        ]
      },
      {
        id: "pr", name: "Public Records", short: "PUBLIC\nRECORDS",
        descriptor: "Cultural venue and platform",
        x: 45, y: 92,
        dayparts: [20, 30, 70, 100],
        avgCheck: "~$45",
        why: "Shows the gravitational pull of music programming and curated identity in building a cultural destination.",
        takeaway: "Cultural credibility matters. Downtone borrows that signal while running on a less programming-dependent operating model.",
        points: [
          "Multi-room venue (sound room, restaurant, garden)",
          "Ticketed programming drives gravity",
          "Strong dwell time and brand loyalty",
          "Capital-intensive and team-heavy to operate"
        ]
      },
      {
        id: "eavesdrop", name: "Eavesdrop", short: "EAVESDROP",
        descriptor: "Music-forward restaurant and bar",
        x: 55, y: 60,
        dayparts: [0, 10, 100, 70],
        avgCheck: "~$45",
        why: "Music-forward dining shows food and beverage can coexist with sound as a defining experience layer.",
        takeaway: "Confirms guest appetite for music as ambience. Downtone extends earlier into the day and emphasizes coffee-led economics.",
        points: [
          "~50 seats",
          "Music as ambience, not destination",
          "Food and beverage as primary revenue",
          "Newer concept, repeat behavior still proving out"
        ]
      },
      {
        id: "silence", name: "Silence Please", short: "SILENCE\nPLEASE",
        descriptor: "Listening space",
        x: 14, y: 75,
        dayparts: [60, 100, 25, 0],
        avgCheck: "~$18",
        why: "A focused, listening-first format that proves there is real demand for attentive sound experiences.",
        takeaway: "Validates the audience for listening-led programming. Downtone integrates that culture into a much broader hospitality model.",
        points: [
          "~30 seats",
          "Listening-first format",
          "Highly curated programming",
          "Hospitality breadth limited by format"
        ]
      },
      {
        id: "madradio", name: "Mad Radio", short: "MAD\nRADIO",
        descriptor: "Cultural platform",
        x: 55, y: 82,
        dayparts: [0, 5, 60, 100],
        avgCheck: "~$25",
        why: "Shows that programming and community can be the primary engine even at a smaller, simpler operating scale.",
        takeaway: "Validates the cultural platform model. Downtone shares the community grounding but distributes revenue across a much broader daypart.",
        points: [
          "Cultural platform with community grounding",
          "Programming-heavy, club-like format",
          "Limited hospitality emphasis",
          "Evening and late-night focus"
        ]
      },
      {
        id: "lacabra", name: "La Cabra", short: "LA CABRA",
        descriptor: "Design café",
        x: 38, y: 34,
        dayparts: [100, 80, 30, 0],
        avgCheck: "~$18",
        why: "Sets the visual bar for design-led specialty coffee. Architecture and craft are the brand.",
        takeaway: "Confirms the pull of design polish in coffee economics. Downtone extends that polish across the full day and into evening service.",
        points: [
          "Architecturally iconic flagship locations",
          "Daytime coffee, pastry, and bakery",
          "Design and craft as the primary brand signal",
          "Single-daypart, no evening monetization"
        ]
      },
      {
        id: "oldtown", name: "Old Town Bar", short: "OLD TOWN\nBAR",
        descriptor: "Neighborhood bar",
        x: 72, y: 30,
        dayparts: [0, 60, 100, 70],
        avgCheck: "~$45",
        why: "Open since 1892 — proof that disciplined neighborhood hospitality sustains repeat behavior for generations, without programming.",
        takeaway: "Validates the durability of consistency and density. Downtone adds cultural and daytime layers on top of the same neighborhood discipline.",
        points: [
          "Operating in Flatiron since 1892",
          "Lunch through late-night service",
          "Bar-led, classic food menu alongside",
          "Multi-generational repeat clientele"
        ]
      }
    ],
    // Approximate category economics for the comparison table — directional
    // estimates only. covers = est. covers/day; low/high = annual revenue $M.
    // Downtone is anchored to its own model (~365 covers, ~$11K/day, $3.5–4.4M).
    econ: {
      dcp:       { covers: 250, low: 4.5, high: 5.8 },
      pr:        { covers: 475, low: 7.0, high: 8.0 },
      oldtown:   { covers: 250, low: 3.5, high: 4.5 },
      downtone:  { covers: 365, low: 3.5, high: 4.4 },
      eavesdrop: { covers: 160, low: 2.0, high: 3.0 },
      lacabra:   { covers: 350, low: 1.8, high: 2.4 },
      madradio:  { covers: 260, low: 2.0, high: 2.5 },
      silence:   { covers: 90,  low: 0.5, high: 0.8 }
    }
  };

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

  return { NAV, SPACE_MODELS, TIER_MIN, PERKS, YR_DIST, YR_TOTAL, DIST_CASH, SCENARIOS, DAYPARTS, SEASON, DOW, USE_OF_FUNDS, PHASES, FIN_ROWS, RISKS, WHY, POSITIONING, PAIRS, fmt };
})();
