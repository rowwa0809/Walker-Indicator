# Walker Indicator

**Option Trading · Macro Economic Radar.**

A retail-friendly **macro intelligence dashboard** for options traders. Each macro module — rates, growth, inflation, volatility, sentiment, and more — opens its own live page with TradingView charts, screeners, and the economic calendar. The Narrative Intelligence Layer reads from your Supabase `macro-radar` project and explains why the tape is behaving the way it is, in plain English.

> Walker Indicator is **informational software, not financial advice**. It does not place trades or recommend buy/sell actions.

## What's in v0.3

- **Next.js App Router** with React 18.
- **16 clickable macro modules** at `/modules/<slug>` — all rendered with live TradingView widgets.
- **Persistent ticker tape** across every page (S&P, Nasdaq, Dow, VIX, US10Y, DXY, Gold, Crude, BTC).
- **Narrative Intelligence Layer** powered by Supabase (`narrative_signals` table) with a curated mock fallback.
- **Walker + radar brand lockup** and the **16 custom icon set** preserved verbatim from the design.

## How to run (Windows / Mac / Linux)

You need **Node 18.18+**. Get it from <https://nodejs.org>.

```bash
# 1. install dependencies (first time only — pulls in Next.js + React)
npm install

# 2. run the dev server
npm run dev
# → ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

Open <http://localhost:3000>. Click any of the 16 module cards to drill into that theme's live charts.

To stop the server: **Ctrl+C** in the terminal.

### Routes

| Route                  | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| `/`                    | Landing — hero, narratives, iconography, brand viz  |
| `/modules/<slug>`      | One of 16 macro modules (live TradingView widgets)  |
| `/api/narratives`      | JSON — Supabase if configured, else curated fallback |
| `/api/healthz`         | Liveness + Supabase wiring status                   |

Module slugs: `macro-radar`, `global-economy`, `interest-rates`, `economic-growth`, `market-trends`, `data-analysis`, `event-calendar`, `risk-management`, `price-action`, `asset-allocation`, `commodities`, `inflation`, `employment`, `central-banks`, `geopolitical-risk`, `sentiment-index`.

## Supabase wiring

The narrative panel reads from the **`macro-radar`** Supabase project (`maouzuvydhmlwijmabcc`). The migration creates a dedicated `public.narrative_signals` table — additive, doesn't modify your existing schema — and seeds the four demo narratives.

**Never commit service-role keys.** Put credentials in `.env.local` (already in `.gitignore`):

```
NEXT_PUBLIC_SUPABASE_URL=https://maouzuvydhmlwijmabcc.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<rotate-then-paste-server-only-key>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-key>
```

Next.js loads `.env.local` automatically — just `npm run dev` after you create the file. Hit `/api/healthz` to confirm `"supabase":"configured"`.

If the Supabase request fails or times out (5s), the server falls back to `data/narratives.json` and surfaces a `warning` in the API response.

### Re-applying the schema

The committed migration is `supabase/001_narrative_intelligence.sql`. It has already been applied to `macro-radar` as migration `create_narrative_signals`. Re-run it in the Supabase SQL editor or CLI to seed a new project.

## Architecture

```
app/
├── layout.jsx              # global ticker tape + metadata
├── page.jsx                # home: hero, narratives, iconography, viz
├── globals.css             # design system (green / dark)
├── api/
│   ├── narratives/route.js # GET narratives (Supabase or fallback)
│   └── healthz/route.js
└── modules/
    └── [slug]/page.jsx     # one page per macro module

components/
├── BrandLockup.jsx         # walker + radar SVG lockup (preserved)
├── Icons.jsx               # 16 custom icon SVGs (preserved)
├── HomeViz.jsx             # macro radar / scorecard / regime cycle
└── TVWidget.jsx            # TradingView embed wrapper

lib/
├── modules.js              # 16 module configs (widget mappings)
└── narratives.js           # Supabase fetch + fallback

data/narratives.json        # curated mock (fallback)
supabase/                   # migration + seed
scripts/validate.mjs        # JSON contract validator
```

## Data realities (so retail traders aren't surprised)

- **TradingView widgets are free and embeddable.** Most US-equity feeds are delayed ~15 minutes. Real-time requires a paid feed (Polygon, IEX, etc.) — easy to swap in later.
- **Yahoo Finance has no public API.** TradingView covers the live-quote/chart need; Supabase covers your *state* (narratives, watchlists, alerts, notes).
- **Supabase isn't a tick database.** Don't try to cache live prices there — use the widgets / a market-data API for prices, Supabase for everything *about* prices.

## Compliance stance

Walker Indicator is informational software, not financial advice. Charts and data feeds may be delayed. The dashboard never places orders, routes trades, or recommends buy/sell actions.
