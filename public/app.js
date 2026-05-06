const layerCards = [
  "Dominant narrative tracking",
  "Narrative strength scoring",
  "Narrative divergence detection",
  "Cross-asset confirmation",
  "Regime contradiction engine",
  "Sentiment shift velocity",
  "Market psychology overlays"
];

const operatingSystem = [
  ["Options flow and unusual activity", "Ranked signal inputs become evidence, not isolated trade prompts."],
  ["Volatility surface and IV/HV context", "Volatility context explains whether price action is cheap, rich, complacent, or stressed."],
  ["Macro regime and liquidity weather", "Regime weather modulates signals and exposes macro contradictions."],
  ["News catalysts and sentiment velocity", "Narrative shifts are tracked as velocity, breadth, and catalyst quality."],
  ["Backtests, decay checks, and risk labels", "Every claim needs a historical record, risk label, and plain-English why."]
];

const iconography = [
  ["Macro Radar", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><circle cx="32" cy="32" r="26"/><circle cx="32" cy="32" r="18"/><circle cx="32" cy="32" r="10"/><line x1="32" y1="6" x2="32" y2="58"/><line x1="6" y1="32" x2="58" y2="32"/><circle cx="44" cy="22" r="2.6" fill="currentColor"/></svg>'],
  ["Global Economy", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><circle cx="32" cy="32" r="24"/><ellipse cx="32" cy="32" rx="10" ry="24"/><line x1="8" y1="32" x2="56" y2="32"/><path d="M12 20c10 6 30 6 40 0M12 44c10-6 30-6 40 0"/></svg>'],
  ["Interest Rates", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 22 32 10l24 12"/><line x1="8" y1="22" x2="56" y2="22"/><line x1="14" y1="22" x2="14" y2="48"/><line x1="24" y1="22" x2="24" y2="48"/><line x1="40" y1="22" x2="40" y2="48"/><line x1="50" y1="22" x2="50" y2="48"/><line x1="6" y1="50" x2="58" y2="50"/></svg>'],
  ["Economic Growth", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 54h48"/><rect x="14" y="38" width="6" height="16"/><rect x="26" y="28" width="6" height="26"/><rect x="38" y="20" width="6" height="34"/><path d="M14 30 26 22 38 14 50 6"/><path d="M50 14V6h-8"/></svg>'],
  ["Market Trends", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="56" x2="56" y2="56"/><line x1="20" y1="14" x2="20" y2="46"/><rect x="16" y="20" width="8" height="18"/><line x1="36" y1="10" x2="36" y2="50"/><rect x="32" y="22" width="8" height="22"/><line x1="50" y1="20" x2="50" y2="44"/><rect x="46" y="26" width="8" height="14"/></svg>'],
  ["Data Analysis", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><circle cx="28" cy="28" r="16"/><line x1="40" y1="40" x2="56" y2="56"/><rect x="20" y="28" width="4" height="8"/><rect x="28" y="22" width="4" height="14"/><rect x="36" y="26" width="4" height="10"/></svg>'],
  ["Event Calendar", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="14" width="48" height="42" rx="4"/><line x1="8" y1="26" x2="56" y2="26"/><line x1="20" y1="8" x2="20" y2="20"/><line x1="44" y1="8" x2="44" y2="20"/><path d="M22 40l6 6 12-12"/></svg>'],
  ["Risk Management", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M32 6l20 8v14c0 14-9 24-20 30-11-6-20-16-20-30V14z"/><path d="M22 32l8 8 14-14"/></svg>'],
  ["Price Action", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><line x1="16" y1="8" x2="16" y2="56"/><rect x="12" y="14" width="8" height="22"/><line x1="32" y1="14" x2="32" y2="56"/><rect x="28" y="22" width="8" height="20"/><line x1="48" y1="10" x2="48" y2="52"/><rect x="44" y="18" width="8" height="26"/></svg>'],
  ["Asset Allocation", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="10"/><path d="M32 10v22M54 32H32M32 54V32"/></svg>'],
  ["Commodities", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M32 6c-8 14-16 22-16 32a16 16 0 0 0 32 0c0-10-8-18-16-32z"/><path d="M24 38c0 6 4 10 10 10"/></svg>'],
  ["Inflation", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="32" cy="14" rx="18" ry="6"/><path d="M14 14v12c0 3 8 6 18 6s18-3 18-6V14"/><path d="M14 26v12c0 3 8 6 18 6s18-3 18-6V26"/><path d="M14 38v12c0 3 8 6 18 6s18-3 18-6V38"/><path d="M30 22v8M30 22h4"/></svg>'],
  ["Employment", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="20" width="48" height="34" rx="3"/><path d="M22 20v-6h20v6"/><line x1="8" y1="34" x2="56" y2="34"/><rect x="28" y="32" width="8" height="6"/></svg>'],
  ["Central Banks", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 22 32 10l24 12"/><rect x="8" y="22" width="48" height="4"/><line x1="14" y1="26" x2="14" y2="48"/><line x1="22" y1="26" x2="22" y2="48"/><line x1="32" y1="26" x2="32" y2="48"/><line x1="42" y1="26" x2="42" y2="48"/><line x1="50" y1="26" x2="50" y2="48"/><rect x="6" y="48" width="52" height="6"/></svg>'],
  ["Geopolitical Risk", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><circle cx="32" cy="32" r="22"/><line x1="10" y1="32" x2="54" y2="32"/><ellipse cx="32" cy="32" rx="10" ry="22"/><path d="M14 22c8 4 28 4 36 0M14 42c8-4 28-4 36 0"/></svg>'],
  ["Sentiment Index", '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 44a24 24 0 0 1 48 0"/><line x1="8" y1="44" x2="56" y2="44"/><line x1="32" y1="44" x2="44" y2="22"/><circle cx="32" cy="44" r="2.4" fill="currentColor"/></svg>']
];

const scorecardData = [
  ["Growth", 75, "green"],
  ["Inflation", 32, "red"],
  ["Rates", 41, "amber"],
  ["Employment", 68, "green"],
  ["Liquidity", 79, "green"],
  ["Sentiment", 56, "amber"]
];

function macroRadarSvg() {
  const points = [
    [32, 6], [54, 18], [54, 46], [32, 58], [10, 46], [10, 18]
  ];
  const labels = ["Inflation", "Growth", "Rates", "Employment", "Liquidity", "Sentiment"];
  const values = [0.45, 0.78, 0.4, 0.66, 0.82, 0.55];
  const cx = 32, cy = 32;
  const polyOuter = points.map(([x, y]) => `${x},${y}`).join(" ");
  const polyData = points
    .map(([x, y], i) => {
      const t = values[i];
      return `${cx + (x - cx) * t},${cy + (y - cy) * t}`;
    })
    .join(" ");
  const grid = [0.33, 0.66, 1].map((t) => {
    const ring = points.map(([x, y]) => `${cx + (x - cx) * t},${cy + (y - cy) * t}`).join(" ");
    return `<polygon points="${ring}" fill="none" stroke="currentColor" stroke-opacity="0.15"/>`;
  }).join("");
  const spokes = points
    .map(([x, y]) => `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="currentColor" stroke-opacity="0.18"/>`)
    .join("");
  const labelEls = points
    .map(([x, y], i) => {
      const lx = cx + (x - cx) * 1.18;
      const ly = cy + (y - cy) * 1.18;
      return `<text x="${lx}" y="${ly}" font-size="3" fill="#86efac" text-anchor="middle" dominant-baseline="middle">${labels[i]}</text>`;
    })
    .join("");
  return `
    <svg viewBox="-4 -4 72 72" xmlns="http://www.w3.org/2000/svg" style="color:#22c55e">
      ${grid}
      ${spokes}
      <polygon points="${polyOuter}" fill="none" stroke="currentColor" stroke-opacity="0.4"/>
      <polygon points="${polyData}" fill="rgba(34,197,94,0.28)" stroke="#22c55e" stroke-width="0.8"/>
      ${labelEls}
    </svg>
  `;
}

function regimeCycleSvg() {
  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="color:#22c55e">
      <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="4 4"/>
      <g font-size="11" font-weight="800" text-anchor="middle">
        <rect x="62" y="20" width="76" height="22" rx="11" fill="rgba(34,197,94,0.18)" stroke="#22c55e"/>
        <text x="100" y="35" fill="#bbf7d0">EXPANSION</text>
        <rect x="148" y="90" width="44" height="22" rx="11" fill="rgba(245,158,11,0.16)" stroke="#f59e0b"/>
        <text x="170" y="105" fill="#fcd34d">SLOWDOWN</text>
        <rect x="62" y="158" width="76" height="22" rx="11" fill="rgba(239,68,68,0.16)" stroke="#ef4444"/>
        <text x="100" y="173" fill="#fca5a5">CONTRACTION</text>
        <rect x="8" y="90" width="44" height="22" rx="11" fill="rgba(34,197,94,0.16)" stroke="#22c55e"/>
        <text x="30" y="105" fill="#86efac">RECOVERY</text>
      </g>
      <circle cx="100" cy="100" r="14" fill="rgba(34,197,94,0.18)" stroke="#22c55e"/>
      <text x="100" y="104" font-size="9" fill="#bbf7d0" text-anchor="middle" font-weight="800">NOW</text>
      <path d="M120 56 a50 50 0 0 1 24 36" fill="none" stroke="#22c55e" stroke-width="1.4"/>
      <path d="M148 116 a50 50 0 0 1 -24 36" fill="none" stroke="#f59e0b" stroke-width="1.4"/>
      <path d="M80 144 a50 50 0 0 1 -24 -36" fill="none" stroke="#ef4444" stroke-width="1.4"/>
      <path d="M52 84 a50 50 0 0 1 24 -36" fill="none" stroke="#22c55e" stroke-width="1.4"/>
    </svg>
  `;
}

function scorecardHtml() {
  return `
    <ul class="scorecard-rows">
      ${scorecardData
        .map(([label, value, tone]) => `
          <li>
            <span>${escapeHtml(label)}</span>
            <div class="bar"><i class="${tone}" style="width:${clampPercent(value)}%"></i></div>
            <strong class="${tone}">${value.toFixed ? value.toFixed(1) : value}</strong>
          </li>
        `)
        .join("")}
    </ul>
  `;
}

function renderIconography() {
  const grid = document.querySelector("#icon-grid");
  if (!grid) return;
  grid.innerHTML = iconography
    .map(([label, svg]) => `<div class="icon-card">${svg}<strong>${escapeHtml(label)}</strong></div>`)
    .join("");
}

function renderViz() {
  const grid = document.querySelector("#viz-grid");
  if (!grid) return;
  grid.innerHTML = `
    <div class="viz-card">
      <header><strong>Macro Radar</strong><small>6-axis</small></header>
      <div class="viz-body">${macroRadarSvg()}</div>
      <p>Six macro dimensions plotted against historical norms — quick read on regime balance.</p>
    </div>
    <div class="viz-card">
      <header><strong>Macro Indicator Scorecard</strong><small>0–100</small></header>
      <div class="viz-body">${scorecardHtml()}</div>
      <p>Color-coded indicator strength. Green confirms, amber qualifies, red contradicts.</p>
    </div>
    <div class="viz-card">
      <header><strong>Market Regime Cycle</strong><small>Live</small></header>
      <div class="viz-body">${regimeCycleSvg()}</div>
      <p>Where the macro tape sits in the expansion-to-contraction cycle, with directional bias.</p>
    </div>
  `;
}

const VALID_STATUSES = new Set(["confirmed", "diverging", "contradicted", "shifting"]);

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

function scoreCard(label, value) {
  return `<div class="score-card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function metric(label, value) {
  const pct = clampPercent(value);
  return `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><div class="mini-bar"><i style="width:${pct}%"></i></div></div>`;
}

function renderWeather(weather, source, warning) {
  document.querySelector('[data-weather="regime"]').textContent = weather?.regime ?? "Unknown";
  document.querySelector('[data-weather="temperature"]').textContent = weather?.temperature ?? "--";
  document.querySelector("#weather-metrics").innerHTML = [
    metric("Liquidity", weather?.liquidity ?? 0),
    metric("Stress", weather?.stress ?? 0),
    metric("Narrative clarity", weather?.narrativeClarity ?? 0),
    `<span class="data-source">Data source: ${escapeHtml(source ?? "unknown")}${warning ? " · fallback active" : ""}</span>`
  ].join("");
}

function renderLayerCards() {
  document.querySelector("#layer-grid").innerHTML = layerCards
    .map((card) => `<div class="layer-card"><span></span>${escapeHtml(card)}</div>`)
    .join("");
}

function renderNarrativeFocus(signal) {
  if (!signal) {
    document.querySelector("#narrative-focus").innerHTML = "";
    return;
  }
  document.querySelector("#narrative-focus").innerHTML = `
    <div>
      <p class="eyebrow">Dominant narrative</p>
      <h3>${escapeHtml(signal.title)}</h3>
      <p>${escapeHtml(signal.summary)}</p>
    </div>
    <div class="score-stack">
      ${scoreCard("Confidence", signal.confidence)}
      ${scoreCard("Contradiction", signal.contradictionScore)}
      ${scoreCard("Strength", signal.strength)}
    </div>
  `;
}

function renderSignals(signals) {
  const grid = document.querySelector("#signal-grid");
  if (!Array.isArray(signals) || signals.length === 0) {
    grid.innerHTML = '<p class="empty-state">No narratives available.</p>';
    return;
  }
  grid.innerHTML = signals
    .map((signal) => {
      const tickers = Array.isArray(signal.affectedTickers) ? signal.affectedTickers : [];
      const score = clampPercent(signal.contradictionScore);
      return `
        <article class="signal-card">
          <div class="signal-topline">
            <span class="status-chip ${statusClass(signal.status)}">${escapeHtml(statusLabel(signal.status))}</span>
            <span class="risk-chip">${escapeHtml(signal.riskLabel)} risk</span>
          </div>
          <h3>${escapeHtml(signal.title)}</h3>
          <p>${escapeHtml(signal.summary)}</p>
          <div class="ticker-row">${tickers.map((ticker) => `<span>${escapeHtml(ticker)}</span>`).join("")}</div>
          <div class="contradiction-meter"><div style="width:${score}%"></div></div>
          <small>Contradiction score · ${escapeHtml(signal.contradictionScore)}/100</small>
        </article>
      `;
    })
    .join("");
}

function renderArchitecture() {
  document.querySelector("#os-grid").innerHTML = operatingSystem
    .map(
      ([title, detail], index) => `
        <div class="os-card">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(detail)}</p>
        </div>
      `
    )
    .join("");
}

function renderError(message) {
  const grid = document.querySelector("#signal-grid");
  if (grid) {
    grid.innerHTML = `<p class="empty-state error-state">Could not load narratives: ${escapeHtml(message)}</p>`;
  }
  const focus = document.querySelector("#narrative-focus");
  if (focus) focus.innerHTML = "";
  document.querySelector('[data-weather="regime"]').textContent = "Offline";
  document.querySelector('[data-weather="temperature"]').textContent = "--";
}

function renderLoading() {
  document.querySelector('[data-weather="regime"]').textContent = "Loading…";
  document.querySelector("#signal-grid").innerHTML = '<p class="empty-state">Loading narratives…</p>';
}

async function boot() {
  renderLayerCards();
  renderIconography();
  renderViz();
  renderArchitecture();
  renderLoading();

  try {
    const response = await fetch("/api/narratives");
    if (!response.ok) {
      throw new Error(`API responded ${response.status}`);
    }
    const payload = await response.json();
    if (!payload || typeof payload !== "object") {
      throw new Error("Malformed payload");
    }
    renderWeather(payload.marketWeather ?? {}, payload.source, payload.warning);
    renderNarrativeFocus(payload.narratives?.[0]);
    renderSignals(payload.narratives ?? []);
  } catch (err) {
    console.error("Failed to load narratives:", err);
    renderError(err.message);
  }
}

boot();
