// Static SVG visualizations for the home-page brand showcase.
// Preserved from v0.2 — colors, geometry, and labels match the design ref.

const RADAR_AXES = [
  [32, 6],
  [54, 18],
  [54, 46],
  [32, 58],
  [10, 46],
  [10, 18]
];
const RADAR_LABELS = ["Inflation", "Growth", "Rates", "Employment", "Liquidity", "Sentiment"];
const RADAR_VALUES = [0.45, 0.78, 0.4, 0.66, 0.82, 0.55];

export function MacroRadar() {
  const cx = 32;
  const cy = 32;
  const polyOuter = RADAR_AXES.map(([x, y]) => `${x},${y}`).join(" ");
  const polyData = RADAR_AXES.map(([x, y], i) => {
    const t = RADAR_VALUES[i];
    return `${cx + (x - cx) * t},${cy + (y - cy) * t}`;
  }).join(" ");
  const grid = [0.33, 0.66, 1].map((t) => {
    const ring = RADAR_AXES.map(([x, y]) => `${cx + (x - cx) * t},${cy + (y - cy) * t}`).join(" ");
    return <polygon key={t} points={ring} fill="none" stroke="currentColor" strokeOpacity="0.15" />;
  });
  const spokes = RADAR_AXES.map(([x, y], i) => (
    <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="currentColor" strokeOpacity="0.18" />
  ));
  const labelEls = RADAR_AXES.map(([x, y], i) => {
    const lx = cx + (x - cx) * 1.18;
    const ly = cy + (y - cy) * 1.18;
    return (
      <text key={i} x={lx} y={ly} fontSize="3" fill="#86efac" textAnchor="middle" dominantBaseline="middle">
        {RADAR_LABELS[i]}
      </text>
    );
  });

  return (
    <svg viewBox="-4 -4 72 72" style={{ color: "#22c55e" }}>
      {grid}
      {spokes}
      <polygon points={polyOuter} fill="none" stroke="currentColor" strokeOpacity="0.4" />
      <polygon points={polyData} fill="rgba(34,197,94,0.28)" stroke="#22c55e" strokeWidth="0.8" />
      {labelEls}
    </svg>
  );
}

export function RegimeCycle() {
  return (
    <svg viewBox="0 0 200 200" style={{ color: "#22c55e" }}>
      <circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="4 4" />
      <g fontSize="11" fontWeight="800" textAnchor="middle">
        <rect x="62" y="20" width="76" height="22" rx="11" fill="rgba(34,197,94,0.18)" stroke="#22c55e" />
        <text x="100" y="35" fill="#bbf7d0">EXPANSION</text>
        <rect x="148" y="90" width="44" height="22" rx="11" fill="rgba(245,158,11,0.16)" stroke="#f59e0b" />
        <text x="170" y="105" fill="#fcd34d">SLOWDOWN</text>
        <rect x="62" y="158" width="76" height="22" rx="11" fill="rgba(239,68,68,0.16)" stroke="#ef4444" />
        <text x="100" y="173" fill="#fca5a5">CONTRACTION</text>
        <rect x="8" y="90" width="44" height="22" rx="11" fill="rgba(34,197,94,0.16)" stroke="#22c55e" />
        <text x="30" y="105" fill="#86efac">RECOVERY</text>
      </g>
      <circle cx="100" cy="100" r="14" fill="rgba(34,197,94,0.18)" stroke="#22c55e" />
      <text x="100" y="104" fontSize="9" fill="#bbf7d0" textAnchor="middle" fontWeight="800">
        NOW
      </text>
      <path d="M120 56 a50 50 0 0 1 24 36" fill="none" stroke="#22c55e" strokeWidth="1.4" />
      <path d="M148 116 a50 50 0 0 1 -24 36" fill="none" stroke="#f59e0b" strokeWidth="1.4" />
      <path d="M80 144 a50 50 0 0 1 -24 -36" fill="none" stroke="#ef4444" strokeWidth="1.4" />
      <path d="M52 84 a50 50 0 0 1 24 -36" fill="none" stroke="#22c55e" strokeWidth="1.4" />
    </svg>
  );
}

const SCORECARD_DATA = [
  ["Growth", 7.5, "green"],
  ["Inflation", 3.2, "red"],
  ["Rates", 4.1, "amber"],
  ["Employment", 6.8, "green"],
  ["Liquidity", 7.9, "green"],
  ["Sentiment", 5.6, "amber"]
];

export function Scorecard() {
  return (
    <ul className="scorecard-rows">
      {SCORECARD_DATA.map(([label, value, tone]) => (
        <li key={label}>
          <span>{label}</span>
          <div className="bar">
            <i className={tone} style={{ width: `${(value / 10) * 100}%` }} />
          </div>
          <strong className={tone}>{value.toFixed(1)}</strong>
        </li>
      ))}
    </ul>
  );
}
