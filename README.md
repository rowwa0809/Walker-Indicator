# Walker Indicator

**Option Trading · Macro Economic Radar.**

Walker Indicator is a retail-facing **market intelligence operating system** for options, macro, volatility, news, and cross-asset narrative confirmation.

## Product thesis

Most options products compete on scanner quantity. Walker Indicator competes on signal trust and narrative intelligence:

- every signal needs a plain-English explanation;
- every claim should eventually have a backtest behind it;
- every alert carries a risk label and compliance-safe language;
- every market story is tested against macro, volatility, breadth, liquidity, and cross-asset confirmation.

## Narrative Intelligence Layer

```text
Narrative Intelligence Layer
├── Dominant narrative tracking
├── Narrative strength scoring
├── Narrative divergence detection
├── Cross-asset narrative confirmation
├── Regime contradiction engine
├── Sentiment shift velocity
└── Market psychology overlays
```

Examples this layer is designed to express:

- "AI supercycle narrative weakening despite semiconductor momentum."
- "Bond market contradicting equity optimism."
- "Market pricing soft landing while volatility term structure signals stress."
- "Retail call activity detached from macro liquidity conditions."

## How to run

Requires Node 18.17+.

```bash
# 1. install (no deps required — pure Node)
# 2. run the dev server
npm run dev
# → Walker Indicator running at http://localhost:3000
```

The server has zero npm dependencies. It serves `public/` statically and exposes:

| Route             | Purpose                                                       |
| ----------------- | ------------------------------------------------------------- |
| `/`               | Landing UI (hero, narratives, iconography, branded viz)       |
| `/api/narratives` | JSON payload — Supabase if configured, else curated fallback  |
| `/api/healthz`    | Liveness + indicates whether Supabase is wired                |

Validate the JSON contract before shipping changes to `data/narratives.json`:

```bash
npm run validate    # or: npm run build
```

## Supabase wiring

The app's live data source is the Supabase project **`macro-radar`** (`maouzuvydhmlwijmabcc`). The migration creates a dedicated `public.narrative_signals` table — additive, does not modify your existing schema — and seeds the four demo narratives.

**Never commit service-role keys.** Put credentials in a local `.env.local` file (already in `.gitignore`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://maouzuvydhmlwijmabcc.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<rotate-then-paste-server-only-key>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-or-anon-key>
```

Then start the server with the env file:

```bash
node --env-file=.env.local server/index.mjs
# or for npm:
NODE_OPTIONS="--env-file=.env.local" npm run dev
```

When `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are both set, `/api/narratives` reads from Supabase. If the request fails or times out (5s), the server falls back to the curated mock data in `data/narratives.json` and surfaces a `warning` in the response. Hit `/api/healthz` to confirm which mode is active.

### Re-applying the schema

The committed migration lives at `supabase/001_narrative_intelligence.sql`. It has already been applied to `macro-radar` as migration `create_narrative_signals`. To reapply or seed a new project, run the SQL via the Supabase SQL editor or CLI.

## Design system

The site implements three brand layers from the design reference:

1. **Custom iconography set** — 16 inline SVG marks for macro and options modules.
2. **Branded data visualization** — Macro Radar (6-axis), Indicator Scorecard, and Market Regime Cycle in the shared green/amber/red palette.
3. **Backgrounds and hero treatment** — radar gradients, grid mesh, and walker+radar lockup.

## Compliance stance

Walker Indicator is informational software, not financial advice. User-facing language describes observed conditions and historical associations, not instructions to buy or sell.
