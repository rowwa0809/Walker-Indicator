create table if not exists public.narrative_signals (
  id text primary key,
  title text not null,
  summary text not null,
  status text not null check (status in ('confirmed', 'diverging', 'contradicted', 'shifting')),
  lens text not null check (
    lens in (
      'dominant_narrative',
      'strength_score',
      'divergence',
      'cross_asset_confirmation',
      'regime_contradiction',
      'sentiment_velocity',
      'market_psychology'
    )
  ),
  confidence integer not null check (confidence between 0 and 100),
  strength integer not null check (strength between 0 and 100),
  shift_velocity integer not null check (shift_velocity between -100 and 100),
  contradiction_score integer not null check (contradiction_score between 0 and 100),
  affected_tickers text[] not null default '{}',
  evidence text[] not null default '{}',
  cross_asset_pulses jsonb not null default '[]'::jsonb,
  psychology_overlay text not null,
  risk_label text not null check (risk_label in ('Low', 'Medium', 'High')),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists narrative_signals_lens_idx on public.narrative_signals (lens);
create index if not exists narrative_signals_status_idx on public.narrative_signals (status);
create index if not exists narrative_signals_contradiction_idx on public.narrative_signals (contradiction_score desc);

alter table public.narrative_signals enable row level security;

drop policy if exists "Narrative signals are readable" on public.narrative_signals;
create policy "Narrative signals are readable"
  on public.narrative_signals
  for select
  using (true);

insert into public.narrative_signals (
  id,
  title,
  summary,
  status,
  lens,
  confidence,
  strength,
  shift_velocity,
  contradiction_score,
  affected_tickers,
  evidence,
  cross_asset_pulses,
  psychology_overlay,
  risk_label,
  updated_at
) values
(
  'ai-supercycle-fatigue',
  'AI supercycle narrative losing breadth',
  'Semiconductor leadership remains visible, but participation is narrowing and defensive software bids are not confirming the broad AI-growth story.',
  'diverging',
  'divergence',
  82,
  68,
  -14,
  73,
  array['NVDA', 'AMD', 'SMH', 'MSFT'],
  array[
    'Semiconductor momentum remains elevated while equal-weight tech breadth fades.',
    'Call premium is concentrated in fewer mega-cap names instead of spreading through the supply chain.',
    'Credit and rates proxies are not confirming a full risk-on acceleration.'
  ],
  '[{"asset":"SMH","reading":"Momentum leadership","bias":"risk-on","strength":84},{"asset":"QQQE","reading":"Breadth fading","bias":"mixed","strength":42},{"asset":"10Y Yield","reading":"Discount-rate pressure","bias":"risk-off","strength":61}]'::jsonb,
  'Crowding risk: traders are extrapolating winners while ignoring narrowing confirmation.',
  'Medium',
  '2026-05-06T13:45:00.000Z'
),
(
  'equity-bond-contradiction',
  'Bond market contradicting equity optimism',
  'Equity indices are pricing resilient growth, while duration and volatility proxies imply tighter financial conditions and less room for multiple expansion.',
  'contradicted',
  'regime_contradiction',
  76,
  74,
  9,
  86,
  array['SPY', 'QQQ', 'TLT', 'IWM'],
  array[
    'Small-cap participation is lagging despite headline index strength.',
    'Treasury volatility remains elevated relative to equity complacency.',
    'High-duration growth bids are vulnerable if yields remain sticky.'
  ],
  '[{"asset":"SPY","reading":"Index optimism","bias":"risk-on","strength":72},{"asset":"TLT","reading":"Weak duration bid","bias":"risk-off","strength":67},{"asset":"MOVE/VIX","reading":"Rates stress premium","bias":"risk-off","strength":79}]'::jsonb,
  'Confirmation bias: equity traders are accepting soft-landing headlines faster than rates markets are validating them.',
  'High',
  '2026-05-06T13:48:00.000Z'
),
(
  'vol-term-stress',
  'Soft-landing pricing with volatility stress underneath',
  'Spot indices look calm, but volatility term-structure and downside hedging demand show a market that is still paying for tail protection.',
  'shifting',
  'cross_asset_confirmation',
  71,
  62,
  18,
  69,
  array['SPY', 'VIX', 'VIXY', 'HYG'],
  array[
    'Downside put skew is firm relative to spot index drawdown.',
    'Credit spreads are not deteriorating, but hedging demand is rising.',
    'Volatility buyers are active before visible price weakness.'
  ],
  '[{"asset":"VIX Curve","reading":"Stress pockets","bias":"mixed","strength":66},{"asset":"HYG","reading":"Credit stable","bias":"risk-on","strength":58},{"asset":"SPX Skew","reading":"Protection demand","bias":"risk-off","strength":75}]'::jsonb,
  'Surface calm, hidden caution: traders are not panicking, but they are quietly paying for insurance.',
  'Medium',
  '2026-05-06T13:50:00.000Z'
),
(
  'retail-liquidity-detachment',
  'Retail call activity detached from liquidity backdrop',
  'Speculative call demand is rising in high-beta names even as liquidity gauges and rate-sensitive assets argue for selectivity.',
  'diverging',
  'market_psychology',
  79,
  70,
  22,
  78,
  array['TSLA', 'COIN', 'MARA', 'ARKK'],
  array[
    'Short-dated call volume is elevated in high-beta retail favorites.',
    'Liquidity-sensitive ETFs are not broadly confirming the same risk appetite.',
    'Premium concentration suggests chase behavior rather than institutionally diversified accumulation.'
  ],
  '[{"asset":"ARKK","reading":"Speculative demand","bias":"risk-on","strength":77},{"asset":"DXY","reading":"Liquidity headwind","bias":"risk-off","strength":63},{"asset":"IWM","reading":"Weak beta breadth","bias":"mixed","strength":45}]'::jsonb,
  'FOMO impulse: options demand is front-running confirmation from liquidity and breadth.',
  'High',
  '2026-05-06T13:52:00.000Z'
)
on conflict (id) do update set
  title = excluded.title,
  summary = excluded.summary,
  status = excluded.status,
  lens = excluded.lens,
  confidence = excluded.confidence,
  strength = excluded.strength,
  shift_velocity = excluded.shift_velocity,
  contradiction_score = excluded.contradiction_score,
  affected_tickers = excluded.affected_tickers,
  evidence = excluded.evidence,
  cross_asset_pulses = excluded.cross_asset_pulses,
  psychology_overlay = excluded.psychology_overlay,
  risk_label = excluded.risk_label,
  updated_at = excluded.updated_at;
