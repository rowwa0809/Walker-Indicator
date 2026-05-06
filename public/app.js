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

const statusLabel = (status) => status.replace("-", " ");
const scoreCard = (label, value) => `<div class="score-card"><span>${label}</span><strong>${value}</strong></div>`;

function metric(label, value) {
  return `<div><span>${label}</span><strong>${value}</strong><div class="mini-bar"><i style="width:${value}%"></i></div></div>`;
}

function renderWeather(weather, source, warning) {
  document.querySelector('[data-weather="regime"]').textContent = weather.regime;
  document.querySelector('[data-weather="temperature"]').textContent = weather.temperature;
  document.querySelector("#weather-metrics").innerHTML = [
    metric("Liquidity", weather.liquidity),
    metric("Stress", weather.stress),
    metric("Narrative clarity", weather.narrativeClarity),
    `<span class="data-source">Data source: ${source}${warning ? " · fallback active" : ""}</span>`
  ].join("");
}

function renderLayerCards() {
  document.querySelector("#layer-grid").innerHTML = layerCards
    .map((card) => `<div class="layer-card"><span></span>${card}</div>`)
    .join("");
}

function renderNarrativeFocus(signal) {
  document.querySelector("#narrative-focus").innerHTML = `
    <div>
      <p class="eyebrow">Dominant narrative</p>
      <h3>${signal.title}</h3>
      <p>${signal.summary}</p>
    </div>
    <div class="score-stack">
      ${scoreCard("Confidence", signal.confidence)}
      ${scoreCard("Contradiction", signal.contradictionScore)}
      ${scoreCard("Strength", signal.strength)}
    </div>
  `;
}

function renderSignals(signals) {
  document.querySelector("#signal-grid").innerHTML = signals
    .map(
      (signal) => `
        <article class="signal-card">
          <div class="signal-topline">
            <span class="status-chip ${signal.status}">${statusLabel(signal.status)}</span>
            <span class="risk-chip">${signal.riskLabel} risk</span>
          </div>
          <h3>${signal.title}</h3>
          <p>${signal.summary}</p>
          <div class="ticker-row">${signal.affectedTickers.map((ticker) => `<span>${ticker}</span>`).join("")}</div>
          <div class="contradiction-meter"><div style="width:${signal.contradictionScore}%"></div></div>
          <small>Contradiction score · ${signal.contradictionScore}/100</small>
        </article>
      `
    )
    .join("");
}

function renderArchitecture() {
  document.querySelector("#os-grid").innerHTML = operatingSystem
    .map(
      ([title, detail], index) => `
        <div class="os-card">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${title}</strong>
          <p>${detail}</p>
        </div>
      `
    )
    .join("");
}

async function boot() {
  renderLayerCards();
  renderArchitecture();
  const response = await fetch("/api/narratives");
  const payload = await response.json();
  renderWeather(payload.marketWeather, payload.source, payload.warning);
  renderNarrativeFocus(payload.narratives[0]);
  renderSignals(payload.narratives);
}

boot();
