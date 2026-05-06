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
