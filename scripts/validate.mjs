import { readFile } from "node:fs/promises";

const payload = JSON.parse(await readFile(new URL("../data/narratives.json", import.meta.url), "utf8"));

const VALID_STATUSES = new Set(["confirmed", "diverging", "contradicted", "shifting"]);
const VALID_LENSES = new Set([
  "dominant_narrative",
  "strength_score",
  "divergence",
  "cross_asset_confirmation",
  "regime_contradiction",
  "sentiment_velocity",
  "market_psychology"
]);
const VALID_RISK = new Set(["Low", "Medium", "High"]);
const VALID_BIAS = new Set(["risk-on", "risk-off", "mixed"]);

const errors = [];
const fail = (msg) => errors.push(msg);

function assertPercent(scope, key, value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 100) {
    fail(`${scope}.${key} must be a number between 0 and 100 (got ${JSON.stringify(value)})`);
  }
}

function assertSignedPercent(scope, key, value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < -100 || value > 100) {
    fail(`${scope}.${key} must be a number between -100 and 100 (got ${JSON.stringify(value)})`);
  }
}

function assertNonEmptyString(scope, key, value) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(`${scope}.${key} must be a non-empty string`);
  }
}

if (!payload || typeof payload !== "object") {
  fail("payload must be an object");
}

const weather = payload.marketWeather;
if (!weather || typeof weather !== "object") {
  fail("marketWeather must be an object");
} else {
  assertNonEmptyString("marketWeather", "regime", weather.regime);
  for (const key of ["temperature", "liquidity", "stress", "narrativeClarity"]) {
    assertPercent("marketWeather", key, weather[key]);
  }
}

if (!Array.isArray(payload.narratives) || payload.narratives.length < 4) {
  fail("Expected at least four narrative intelligence examples.");
} else {
  const ids = new Set();
  for (const narrative of payload.narratives) {
    const scope = narrative?.id ? `narratives[${narrative.id}]` : "narratives[?]";

    if (!narrative || typeof narrative !== "object") {
      fail(`${scope} must be an object`);
      continue;
    }

    assertNonEmptyString(scope, "id", narrative.id);
    if (typeof narrative.id === "string") {
      if (ids.has(narrative.id)) fail(`${scope} duplicate id`);
      ids.add(narrative.id);
    }
    assertNonEmptyString(scope, "title", narrative.title);
    assertNonEmptyString(scope, "summary", narrative.summary);
    assertNonEmptyString(scope, "psychologyOverlay", narrative.psychologyOverlay);

    if (!VALID_STATUSES.has(narrative.status)) {
      fail(`${scope}.status must be one of ${[...VALID_STATUSES].join(", ")}`);
    }
    if (!VALID_LENSES.has(narrative.lens)) {
      fail(`${scope}.lens must be one of ${[...VALID_LENSES].join(", ")}`);
    }
    if (!VALID_RISK.has(narrative.riskLabel)) {
      fail(`${scope}.riskLabel must be one of ${[...VALID_RISK].join(", ")}`);
    }

    assertPercent(scope, "confidence", narrative.confidence);
    assertPercent(scope, "strength", narrative.strength);
    assertPercent(scope, "contradictionScore", narrative.contradictionScore);
    assertSignedPercent(scope, "shiftVelocity", narrative.shiftVelocity);

    if (!Array.isArray(narrative.affectedTickers) || narrative.affectedTickers.length === 0) {
      fail(`${scope}.affectedTickers must be a non-empty array`);
    } else if (!narrative.affectedTickers.every((t) => typeof t === "string" && t.trim() !== "")) {
      fail(`${scope}.affectedTickers must contain non-empty strings`);
    }

    if (!Array.isArray(narrative.evidence) || narrative.evidence.length === 0) {
      fail(`${scope}.evidence must be a non-empty array`);
    } else if (!narrative.evidence.every((e) => typeof e === "string" && e.trim() !== "")) {
      fail(`${scope}.evidence must contain non-empty strings`);
    }

    if (!Array.isArray(narrative.crossAssetPulses) || narrative.crossAssetPulses.length === 0) {
      fail(`${scope}.crossAssetPulses must be a non-empty array`);
    } else {
      narrative.crossAssetPulses.forEach((pulse, i) => {
        const ps = `${scope}.crossAssetPulses[${i}]`;
        if (!pulse || typeof pulse !== "object") {
          fail(`${ps} must be an object`);
          return;
        }
        assertNonEmptyString(ps, "asset", pulse.asset);
        assertNonEmptyString(ps, "reading", pulse.reading);
        if (!VALID_BIAS.has(pulse.bias)) {
          fail(`${ps}.bias must be one of ${[...VALID_BIAS].join(", ")}`);
        }
        assertPercent(ps, "strength", pulse.strength);
      });
    }

    if (typeof narrative.updatedAt !== "string" || Number.isNaN(Date.parse(narrative.updatedAt))) {
      fail(`${scope}.updatedAt must be an ISO-8601 timestamp`);
    }
  }
}

if (errors.length > 0) {
  console.error("Validation failed:");
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log("Narrative intelligence data contract validated.");
