// Each of the 16 macro modules. The slug matches the icon key from components/Icons.jsx.
// `widgets` is rendered as a flexible grid on the module page.
// `cols` controls the grid (1, 2, or 3).

export const MODULES = [
  {
    slug: "macro-radar",
    eyebrow: "01 · Macro radar",
    title: "All macro inputs in one sweep.",
    summary:
      "Treasury yields, dollar strength, and the global economic calendar — the radar everything else triangulates against.",
    cols: 2,
    widgets: [
      {
        title: "Economic Calendar",
        subtitle: "Live · global",
        type: "economicCalendar",
        tall: true
      },
      {
        title: "US 10Y Yield",
        subtitle: "TVC:US10Y",
        type: "advancedChart",
        config: { symbol: "TVC:US10Y" }
      },
      {
        title: "Dollar Index",
        subtitle: "TVC:DXY",
        type: "advancedChart",
        config: { symbol: "TVC:DXY" }
      },
      {
        title: "Macro Market Overview",
        subtitle: "Indices · bonds · FX",
        type: "marketOverview",
        tall: true,
        wide: true
      }
    ]
  },
  {
    slug: "global-economy",
    eyebrow: "02 · Global economy",
    title: "Cross-border health, in one frame.",
    summary:
      "Major regional indices, FX strength, and global rates — see where capital is rotating across geographies.",
    cols: 2,
    widgets: [
      {
        title: "Forex Heatmap",
        subtitle: "Major currency strength",
        type: "forexHeatmap",
        tall: true
      },
      {
        title: "Forex Cross Rates",
        subtitle: "Live grid",
        type: "forexCrossRates",
        tall: true
      },
      {
        title: "Global Indices",
        subtitle: "Multi-region",
        type: "marketOverview",
        wide: true,
        tall: true
      }
    ]
  },
  {
    slug: "interest-rates",
    eyebrow: "03 · Interest rates",
    title: "The rates curve, end to end.",
    summary:
      "From the front end to the long bond, rates dictate discount factors. Watch yield levels, term spreads, and rate-sensitive proxies.",
    cols: 2,
    widgets: [
      { title: "US 2Y", subtitle: "TVC:US02Y", type: "advancedChart", config: { symbol: "TVC:US02Y" } },
      { title: "US 10Y", subtitle: "TVC:US10Y", type: "advancedChart", config: { symbol: "TVC:US10Y" } },
      { title: "US 30Y", subtitle: "TVC:US30Y", type: "advancedChart", config: { symbol: "TVC:US30Y" } },
      { title: "TLT (Long bonds ETF)", subtitle: "NASDAQ:TLT", type: "advancedChart", config: { symbol: "NASDAQ:TLT" } }
    ]
  },
  {
    slug: "economic-growth",
    eyebrow: "04 · Economic growth",
    title: "Growth proxies you can actually trade.",
    summary:
      "Real-economy proxies — small caps, transports, copper-vs-gold — alongside the global growth calendar.",
    cols: 2,
    widgets: [
      { title: "Russell 2000 (IWM)", subtitle: "Small caps", type: "advancedChart", config: { symbol: "AMEX:IWM" } },
      { title: "Transports (IYT)", subtitle: "Cyclical bellwether", type: "advancedChart", config: { symbol: "AMEX:IYT" } },
      { title: "Copper / Gold", subtitle: "Growth ratio", type: "advancedChart", config: { symbol: "COMEX:HG1!/COMEX:GC1!" } },
      { title: "Growth Calendar", subtitle: "Live", type: "economicCalendar", tall: true, wide: true }
    ]
  },
  {
    slug: "market-trends",
    eyebrow: "05 · Market trends",
    title: "Where leadership and breadth are pointing.",
    summary:
      "Sector heatmap, top movers, and the broad-index advanced chart — read momentum and rotation in one scan.",
    cols: 1,
    widgets: [
      { title: "S&P 500 — Sector Heatmap", subtitle: "Live", type: "stockHeatmap", tall: true },
      { title: "Stock Screener", subtitle: "Top movers", type: "screener", tall: true }
    ]
  },
  {
    slug: "data-analysis",
    eyebrow: "06 · Data analysis",
    title: "Drill into one symbol at a time.",
    summary:
      "A symbol-level workbench: full chart, technical analysis gauge, and quick-glance fundamentals. Change the symbol on the chart and the rest stays in step.",
    cols: 2,
    widgets: [
      { title: "Advanced Chart", subtitle: "SPY default", type: "advancedChart", tall: true, wide: true, config: { symbol: "SPY" } },
      { title: "Technical Gauge", subtitle: "Multi-interval", type: "technicalAnalysis", config: { symbol: "SPY" } },
      { title: "Symbol Info", subtitle: "Snapshot", type: "symbolInfo", config: { symbol: "SPY" } }
    ]
  },
  {
    slug: "event-calendar",
    eyebrow: "07 · Event calendar",
    title: "Macro events that move the tape.",
    summary:
      "All upcoming high-impact data releases, central-bank decisions, and economic events filtered by importance.",
    cols: 1,
    widgets: [
      { title: "Economic Calendar — High impact", subtitle: "Live", type: "economicCalendar", tall: true, config: { importanceFilter: "0,1" } },
      { title: "Top Market Stories", subtitle: "News timeline", type: "topStories", tall: true }
    ]
  },
  {
    slug: "risk-management",
    eyebrow: "08 · Risk management",
    title: "Where stress is hiding.",
    summary:
      "Volatility, credit spreads, and the rates-equity stress map. Risk premia rise here before it shows up in price.",
    cols: 2,
    widgets: [
      { title: "VIX", subtitle: "Implied vol", type: "advancedChart", config: { symbol: "TVC:VIX" } },
      { title: "MOVE Index", subtitle: "Rates vol", type: "advancedChart", config: { symbol: "TVC:MOVE" } },
      { title: "HYG (High-yield credit)", subtitle: "Credit spread proxy", type: "advancedChart", config: { symbol: "AMEX:HYG" } },
      { title: "TLT (Long duration)", subtitle: "Duration proxy", type: "advancedChart", config: { symbol: "NASDAQ:TLT" } }
    ]
  },
  {
    slug: "price-action",
    eyebrow: "09 · Price action",
    title: "Pure tape, candle by candle.",
    summary:
      "Index and bellwether-name charts side by side, with full chart tools. Switch symbols on the fly.",
    cols: 1,
    widgets: [
      { title: "S&P 500 (SPY)", subtitle: "Daily", type: "advancedChart", tall: true, config: { symbol: "AMEX:SPY" } },
      { title: "Nasdaq 100 (QQQ)", subtitle: "Daily", type: "advancedChart", tall: true, config: { symbol: "NASDAQ:QQQ" } }
    ]
  },
  {
    slug: "asset-allocation",
    eyebrow: "10 · Asset allocation",
    title: "How the major buckets are performing.",
    summary:
      "Equities, bonds, gold, dollar, real assets — read relative performance to see where capital is sitting.",
    cols: 2,
    widgets: [
      { title: "SPY", subtitle: "US Equities", type: "miniChart", config: { symbol: "AMEX:SPY" } },
      { title: "TLT", subtitle: "Long bonds", type: "miniChart", config: { symbol: "NASDAQ:TLT" } },
      { title: "GLD", subtitle: "Gold", type: "miniChart", config: { symbol: "AMEX:GLD" } },
      { title: "DXY", subtitle: "Dollar index", type: "miniChart", config: { symbol: "TVC:DXY" } },
      { title: "VNQ", subtitle: "Real estate", type: "miniChart", config: { symbol: "AMEX:VNQ" } },
      { title: "DBC", subtitle: "Broad commodities", type: "miniChart", config: { symbol: "AMEX:DBC" } }
    ]
  },
  {
    slug: "commodities",
    eyebrow: "11 · Commodities",
    title: "Energy, metals, and softs.",
    summary:
      "The commodities complex tells you what real-economy supply, demand, and inflation pressure look like.",
    cols: 2,
    widgets: [
      { title: "Crude Oil (CL1!)", subtitle: "Front-month futures", type: "advancedChart", config: { symbol: "NYMEX:CL1!" } },
      { title: "Gold (GC1!)", subtitle: "Front-month futures", type: "advancedChart", config: { symbol: "COMEX:GC1!" } },
      { title: "Copper (HG1!)", subtitle: "Front-month futures", type: "advancedChart", config: { symbol: "COMEX:HG1!" } },
      { title: "Natural Gas (NG1!)", subtitle: "Front-month futures", type: "advancedChart", config: { symbol: "NYMEX:NG1!" } }
    ]
  },
  {
    slug: "inflation",
    eyebrow: "12 · Inflation",
    title: "Real and breakeven inflation.",
    summary:
      "TIP / IEF spread for real yields, breakeven proxies, and the upcoming inflation calendar (CPI / PPI / PCE).",
    cols: 2,
    widgets: [
      { title: "TIP (TIPS ETF)", subtitle: "Inflation-linked bonds", type: "advancedChart", config: { symbol: "AMEX:TIP" } },
      { title: "Real Yield (10Y)", subtitle: "TVC:US10Y - inflation", type: "advancedChart", config: { symbol: "TVC:US10Y" } },
      { title: "Crude Oil", subtitle: "Cost-push proxy", type: "advancedChart", config: { symbol: "NYMEX:CL1!" } },
      { title: "Inflation Calendar", subtitle: "CPI · PPI · PCE", type: "economicCalendar", tall: true, wide: true }
    ]
  },
  {
    slug: "employment",
    eyebrow: "13 · Employment",
    title: "Jobs strength and labor market signals.",
    summary:
      "NFP and unemployment data drive the Fed reaction function. Watch the calendar plus consumer-facing equity proxies.",
    cols: 2,
    widgets: [
      { title: "Employment Calendar", subtitle: "NFP · jobless claims", type: "economicCalendar", tall: true },
      { title: "Consumer Discretionary (XLY)", subtitle: "Labor strength proxy", type: "advancedChart", config: { symbol: "AMEX:XLY" } },
      { title: "Russell 2000 (IWM)", subtitle: "Domestic labor proxy", type: "advancedChart", config: { symbol: "AMEX:IWM" } },
      { title: "Top Market Stories", subtitle: "Live", type: "topStories", tall: true }
    ]
  },
  {
    slug: "central-banks",
    eyebrow: "14 · Central banks",
    title: "Policy paths, priced in real time.",
    summary:
      "Fed, ECB, and BoJ rate proxies plus the yield curve shape. Where central-bank decisions show up first.",
    cols: 2,
    widgets: [
      { title: "Fed Funds (proxy)", subtitle: "TVC:US02Y", type: "advancedChart", config: { symbol: "TVC:US02Y" } },
      { title: "EUR 10Y (Bund)", subtitle: "TVC:DE10Y", type: "advancedChart", config: { symbol: "TVC:DE10Y" } },
      { title: "JPY 10Y (JGB)", subtitle: "TVC:JP10Y", type: "advancedChart", config: { symbol: "TVC:JP10Y" } },
      { title: "Central Bank Calendar", subtitle: "Decisions ahead", type: "economicCalendar", tall: true, wide: true }
    ]
  },
  {
    slug: "geopolitical-risk",
    eyebrow: "15 · Geopolitical risk",
    title: "Where conflict and policy hit markets.",
    summary:
      "FX strength, energy, gold, and defense-sector proxies. When geopolitics shift, these move together.",
    cols: 2,
    widgets: [
      { title: "Dollar Index (DXY)", subtitle: "Safe-haven flows", type: "advancedChart", config: { symbol: "TVC:DXY" } },
      { title: "Gold (GLD)", subtitle: "Safe-haven flows", type: "advancedChart", config: { symbol: "AMEX:GLD" } },
      { title: "Crude Oil (CL1!)", subtitle: "Energy supply risk", type: "advancedChart", config: { symbol: "NYMEX:CL1!" } },
      { title: "Defense ETF (ITA)", subtitle: "Defense proxy", type: "advancedChart", config: { symbol: "BATS:ITA" } }
    ]
  },
  {
    slug: "sentiment-index",
    eyebrow: "16 · Sentiment index",
    title: "Mood of the tape.",
    summary:
      "Volatility, retail-favorite momentum, and crypto risk-on as a proxy for speculative appetite.",
    cols: 2,
    widgets: [
      { title: "VIX", subtitle: "Fear gauge", type: "advancedChart", config: { symbol: "TVC:VIX" } },
      { title: "ARKK", subtitle: "Speculative growth", type: "advancedChart", config: { symbol: "AMEX:ARKK" } },
      { title: "Bitcoin", subtitle: "Risk-on proxy", type: "advancedChart", config: { symbol: "BITSTAMP:BTCUSD" } },
      { title: "Crypto Heatmap", subtitle: "24h change", type: "cryptoHeatmap", tall: true, wide: true }
    ]
  }
];

export const MODULE_BY_SLUG = Object.fromEntries(MODULES.map((m) => [m.slug, m]));
