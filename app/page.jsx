import Link from "next/link";
import BrandLockup from "@/components/BrandLockup";
import { Icon, ICON_KEYS, ICON_LABELS } from "@/components/Icons";
import { MacroRadar, RegimeCycle, Scorecard } from "@/components/HomeViz";
import { loadNarratives } from "@/lib/narratives";

const LAYER_CARDS = [
  "Dominant narrative tracking",
  "Narrative strength scoring",
  "Narrative divergence detection",
  "Cross-asset confirmation",
  "Regime contradiction engine",
  "Sentiment shift velocity",
  "Market psychology overlays"
];

const OPERATING_SYSTEM = [
  ["Options flow and unusual activity", "Ranked signal inputs become evidence, not isolated trade prompts."],
  ["Volatility surface and IV/HV context", "Volatility context explains whether price action is cheap, rich, complacent, or stressed."],
  ["Macro regime and liquidity weather", "Regime weather modulates signals and exposes macro contradictions."],
  ["News catalysts and sentiment velocity", "Narrative shifts are tracked as velocity, breadth, and catalyst quality."],
  ["Backtests, decay checks, and risk labels", "Every claim needs a historical record, risk label, and plain-English why."]
];

const VALID_STATUSES = new Set(["confirmed", "diverging", "contradicted", "shifting"]);

function clampPercent(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function statusLabel(status) {
  return String(status ?? "").replace("-", " ");
}

function statusClass(status) {
  return VALID_STATUSES.has(status) ? status : "";
}

function MetricRow({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
      <div className="mini-bar">
        <i style={{ width: `${clampPercent(value)}%` }} />
      </div>
    </div>
  );
}

function NarrativeCard({ signal }) {
  const tickers = Array.isArray(signal.affectedTickers) ? signal.affectedTickers : [];
  const score = clampPercent(signal.contradictionScore);
  return (
    <article className="signal-card">
      <div className="signal-topline">
        <span className={`status-chip ${statusClass(signal.status)}`}>{statusLabel(signal.status)}</span>
        <span className="risk-chip">{signal.riskLabel} risk</span>
      </div>
      <h3>{signal.title}</h3>
      <p>{signal.summary}</p>
      <div className="ticker-row">
        {tickers.map((ticker) => (
          <span key={ticker}>{ticker}</span>
        ))}
      </div>
      <div className="contradiction-meter">
        <div style={{ width: `${score}%` }} />
      </div>
      <small>Contradiction score · {signal.contradictionScore}/100</small>
    </article>
  );
}

export default async function HomePage() {
  const payload = await loadNarratives();
  const weather = payload.marketWeather ?? {};
  const narratives = payload.narratives ?? [];
  const focus = narratives[0];

  return (
    <main>
      <section className="hero-shell">
        <nav className="top-nav" aria-label="Primary navigation">
          <BrandLockup />
          <div className="nav-pill">Macro Radar · Narrative OS</div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Walker Indicator · v0.3 macro radar</p>
            <h1>
              Macro insights. <span className="accent">Market advantage.</span>
            </h1>
            <p className="hero-subtitle">
              Real-time macro signals and a Narrative Intelligence Layer that explains why the market is behaving
              this way — before another scanner pings. Click any module below to drill into live charts, screeners,
              and the economic calendar.
            </p>
            <div className="hero-actions">
              <Link href="#iconography" className="primary-action">
                Explore live modules
              </Link>
              <Link href="#narratives" className="secondary-action">
                Read narrative map
              </Link>
            </div>
          </div>

          <aside className="weather-card" aria-label="Market weather overview">
            <div className="weather-header">
              <span>Market Weather</span>
              <strong>{weather.regime ?? "Unknown"}</strong>
            </div>
            <div className="weather-orb">
              <span>{weather.temperature ?? "--"}</span>
              <small>regime temperature</small>
            </div>
            <div className="weather-metrics">
              <MetricRow label="Liquidity" value={weather.liquidity ?? 0} />
              <MetricRow label="Stress" value={weather.stress ?? 0} />
              <MetricRow label="Narrative clarity" value={weather.narrativeClarity ?? 0} />
              <span className="data-source">
                Data source: {payload.source ?? "unknown"}
                {payload.warning ? " · fallback active" : ""}
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell" id="narratives">
        <div className="section-heading">
          <p className="eyebrow">Dedicated layer</p>
          <h2>Narrative Intelligence Layer</h2>
          <p>
            The product differentiator: not more raw alerts, but a visual cognition layer that turns flow,
            volatility, macro, and sentiment into falsifiable market stories.
          </p>
        </div>

        <div className="layer-grid">
          {LAYER_CARDS.map((card) => (
            <div key={card} className="layer-card">
              <span />
              {card}
            </div>
          ))}
        </div>

        {focus && (
          <div className="narrative-focus">
            <div>
              <p className="eyebrow">Dominant narrative</p>
              <h3>{focus.title}</h3>
              <p>{focus.summary}</p>
            </div>
            <div className="score-stack">
              <div className="score-card">
                <span>Confidence</span>
                <strong>{focus.confidence}</strong>
              </div>
              <div className="score-card">
                <span>Contradiction</span>
                <strong>{focus.contradictionScore}</strong>
              </div>
              <div className="score-card">
                <span>Strength</span>
                <strong>{focus.strength}</strong>
              </div>
            </div>
          </div>
        )}

        <div className="signal-grid">
          {narratives.length === 0 ? (
            <p className="empty-state">No narratives available.</p>
          ) : (
            narratives.map((s) => <NarrativeCard key={s.id} signal={s} />)
          )}
        </div>
      </section>

      <section className="section-shell" id="iconography">
        <div className="section-heading">
          <p className="eyebrow">01 · Custom iconography set · click to drill in</p>
          <h2>16 modules. One macro language.</h2>
          <p>
            Each card opens its own live page — TradingView charts, screeners, economic calendar, and the narrative
            data behind that theme.
          </p>
        </div>
        <div className="icon-grid">
          {ICON_KEYS.map((key) => (
            <Link key={key} href={`/modules/${key}`} className="icon-card">
              <Icon icon={key} />
              <strong>{ICON_LABELS[key]}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell" id="viz">
        <div className="section-heading">
          <p className="eyebrow">02 · Branded data visualization</p>
          <h2>Charts that read the room — not just the tape.</h2>
          <p>
            Macro radar, indicator scorecards, and regime cycles share one design language. Color encodes regime:
            green confirms, amber qualifies, red contradicts.
          </p>
        </div>
        <div className="viz-grid">
          <div className="viz-card">
            <header>
              <strong>Macro Radar</strong>
              <small>6-axis</small>
            </header>
            <div className="viz-body">
              <MacroRadar />
            </div>
            <p>Six macro dimensions plotted against historical norms — quick read on regime balance.</p>
          </div>
          <div className="viz-card">
            <header>
              <strong>Macro Indicator Scorecard</strong>
              <small>0–10</small>
            </header>
            <div className="viz-body">
              <Scorecard />
            </div>
            <p>Color-coded indicator strength. Green confirms, amber qualifies, red contradicts.</p>
          </div>
          <div className="viz-card">
            <header>
              <strong>Market Regime Cycle</strong>
              <small>Live</small>
            </header>
            <div className="viz-body">
              <RegimeCycle />
            </div>
            <p>Where the macro tape sits in the expansion-to-contraction cycle, with directional bias.</p>
          </div>
        </div>
      </section>

      <section className="section-shell architecture" id="architecture">
        <div className="section-heading">
          <p className="eyebrow">03 · Market intelligence operating system</p>
          <h2>Trust-first architecture, upgraded for narrative cognition.</h2>
          <p>
            Data quality, point-in-time correctness, backtests, risk labels, and guardrails come before feature
            sprawl.
          </p>
        </div>
        <div className="os-grid">
          {OPERATING_SYSTEM.map(([title, detail], idx) => (
            <div key={title} className="os-card">
              <span>{String(idx + 1).padStart(2, "0")}</span>
              <strong>{title}</strong>
              <p>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell compliance-strip">
        <strong>Informational intelligence, not financial advice.</strong>
        <span>
          Signals are framed as observed market conditions with historical context, risk labels, and audit-ready
          explanations — never as instructions to buy or sell.
        </span>
      </section>
    </main>
  );
}
