// All 16 icon SVGs preserved exactly as designed in v0.2.

export const ICON_KEYS = [
  "macro-radar",
  "global-economy",
  "interest-rates",
  "economic-growth",
  "market-trends",
  "data-analysis",
  "event-calendar",
  "risk-management",
  "price-action",
  "asset-allocation",
  "commodities",
  "inflation",
  "employment",
  "central-banks",
  "geopolitical-risk",
  "sentiment-index"
];

export const ICON_LABELS = {
  "macro-radar": "Macro Radar",
  "global-economy": "Global Economy",
  "interest-rates": "Interest Rates",
  "economic-growth": "Economic Growth",
  "market-trends": "Market Trends",
  "data-analysis": "Data Analysis",
  "event-calendar": "Event Calendar",
  "risk-management": "Risk Management",
  "price-action": "Price Action",
  "asset-allocation": "Asset Allocation",
  "commodities": "Commodities",
  "inflation": "Inflation",
  "employment": "Employment",
  "central-banks": "Central Banks",
  "geopolitical-risk": "Geopolitical Risk",
  "sentiment-index": "Sentiment Index"
};

const PATHS = {
  "macro-radar": (
    <>
      <circle cx="32" cy="32" r="26" />
      <circle cx="32" cy="32" r="18" />
      <circle cx="32" cy="32" r="10" />
      <line x1="32" y1="6" x2="32" y2="58" />
      <line x1="6" y1="32" x2="58" y2="32" />
      <circle cx="44" cy="22" r="2.6" fill="currentColor" />
    </>
  ),
  "global-economy": (
    <>
      <circle cx="32" cy="32" r="24" />
      <ellipse cx="32" cy="32" rx="10" ry="24" />
      <line x1="8" y1="32" x2="56" y2="32" />
      <path d="M12 20c10 6 30 6 40 0M12 44c10-6 30-6 40 0" />
    </>
  ),
  "interest-rates": (
    <>
      <path d="M8 22 32 10l24 12" />
      <line x1="8" y1="22" x2="56" y2="22" />
      <line x1="14" y1="22" x2="14" y2="48" />
      <line x1="24" y1="22" x2="24" y2="48" />
      <line x1="40" y1="22" x2="40" y2="48" />
      <line x1="50" y1="22" x2="50" y2="48" />
      <line x1="6" y1="50" x2="58" y2="50" />
    </>
  ),
  "economic-growth": (
    <>
      <path d="M8 54h48" />
      <rect x="14" y="38" width="6" height="16" />
      <rect x="26" y="28" width="6" height="26" />
      <rect x="38" y="20" width="6" height="34" />
      <path d="M14 30 26 22 38 14 50 6" />
      <path d="M50 14V6h-8" />
    </>
  ),
  "market-trends": (
    <>
      <line x1="8" y1="56" x2="56" y2="56" />
      <line x1="20" y1="14" x2="20" y2="46" />
      <rect x="16" y="20" width="8" height="18" />
      <line x1="36" y1="10" x2="36" y2="50" />
      <rect x="32" y="22" width="8" height="22" />
      <line x1="50" y1="20" x2="50" y2="44" />
      <rect x="46" y="26" width="8" height="14" />
    </>
  ),
  "data-analysis": (
    <>
      <circle cx="28" cy="28" r="16" />
      <line x1="40" y1="40" x2="56" y2="56" />
      <rect x="20" y="28" width="4" height="8" />
      <rect x="28" y="22" width="4" height="14" />
      <rect x="36" y="26" width="4" height="10" />
    </>
  ),
  "event-calendar": (
    <>
      <rect x="8" y="14" width="48" height="42" rx="4" />
      <line x1="8" y1="26" x2="56" y2="26" />
      <line x1="20" y1="8" x2="20" y2="20" />
      <line x1="44" y1="8" x2="44" y2="20" />
      <path d="M22 40l6 6 12-12" />
    </>
  ),
  "risk-management": (
    <>
      <path d="M32 6l20 8v14c0 14-9 24-20 30-11-6-20-16-20-30V14z" />
      <path d="M22 32l8 8 14-14" />
    </>
  ),
  "price-action": (
    <>
      <line x1="16" y1="8" x2="16" y2="56" />
      <rect x="12" y="14" width="8" height="22" />
      <line x1="32" y1="14" x2="32" y2="56" />
      <rect x="28" y="22" width="8" height="20" />
      <line x1="48" y1="10" x2="48" y2="52" />
      <rect x="44" y="18" width="8" height="26" />
    </>
  ),
  "asset-allocation": (
    <>
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="10" />
      <path d="M32 10v22M54 32H32M32 54V32" />
    </>
  ),
  "commodities": (
    <>
      <path d="M32 6c-8 14-16 22-16 32a16 16 0 0 0 32 0c0-10-8-18-16-32z" />
      <path d="M24 38c0 6 4 10 10 10" />
    </>
  ),
  "inflation": (
    <>
      <ellipse cx="32" cy="14" rx="18" ry="6" />
      <path d="M14 14v12c0 3 8 6 18 6s18-3 18-6V14" />
      <path d="M14 26v12c0 3 8 6 18 6s18-3 18-6V26" />
      <path d="M14 38v12c0 3 8 6 18 6s18-3 18-6V38" />
      <path d="M30 22v8M30 22h4" />
    </>
  ),
  "employment": (
    <>
      <rect x="8" y="20" width="48" height="34" rx="3" />
      <path d="M22 20v-6h20v6" />
      <line x1="8" y1="34" x2="56" y2="34" />
      <rect x="28" y="32" width="8" height="6" />
    </>
  ),
  "central-banks": (
    <>
      <path d="M8 22 32 10l24 12" />
      <rect x="8" y="22" width="48" height="4" />
      <line x1="14" y1="26" x2="14" y2="48" />
      <line x1="22" y1="26" x2="22" y2="48" />
      <line x1="32" y1="26" x2="32" y2="48" />
      <line x1="42" y1="26" x2="42" y2="48" />
      <line x1="50" y1="26" x2="50" y2="48" />
      <rect x="6" y="48" width="52" height="6" />
    </>
  ),
  "geopolitical-risk": (
    <>
      <circle cx="32" cy="32" r="22" />
      <line x1="10" y1="32" x2="54" y2="32" />
      <ellipse cx="32" cy="32" rx="10" ry="22" />
      <path d="M14 22c8 4 28 4 36 0M14 42c8-4 28-4 36 0" />
    </>
  ),
  "sentiment-index": (
    <>
      <path d="M8 44a24 24 0 0 1 48 0" />
      <line x1="8" y1="44" x2="56" y2="44" />
      <line x1="32" y1="44" x2="44" y2="22" />
      <circle cx="32" cy="44" r="2.4" fill="currentColor" />
    </>
  )
};

export function Icon({ icon, ...rest }) {
  const paths = PATHS[icon];
  if (!paths) return null;
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...rest}>
      {paths}
    </svg>
  );
}
