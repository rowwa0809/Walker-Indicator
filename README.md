# Walker Indicator

Walker Indicator is evolving into a retail-facing **market intelligence operating system** for options, macro, volatility, news, and cross-asset narrative confirmation.

## Product thesis

Most options products compete on scanner quantity. Walker Indicator competes on signal trust and narrative intelligence:

- every signal needs a plain-English explanation;
- every claim should eventually have a backtest behind it;
- every alert carries a risk label and compliance-safe language;
- every market story is tested against macro, volatility, breadth, liquidity, and cross-asset confirmation.

## Narrative Intelligence Layer

The first build elevates the differentiated layer from the blueprint:

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

## Local development

```bash
npm run dev
```

Open <http://localhost:3000>.

## Supabase setup

Do **not** commit Supabase service keys. Add them locally in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-server-only-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-browser-safe-anon-key
```

Then apply the schema in `supabase/001_narrative_intelligence.sql` through the Supabase SQL editor or CLI. The built-in Node server exposes `/api/narratives`, reads from Supabase when both `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are configured, and falls back to curated mock narratives during local development.

## Compliance stance

Walker Indicator is informational software, not financial advice. User-facing language should describe observed conditions and historical associations, not instructions to buy or sell.
