import { readFile } from "node:fs/promises";

const payload = JSON.parse(await readFile(new URL("../data/narratives.json", import.meta.url), "utf8"));
const requiredWeatherKeys = ["regime", "temperature", "liquidity", "stress", "narrativeClarity"];
const requiredNarrativeKeys = [
  "id",
  "title",
  "summary",
  "status",
  "lens",
  "confidence",
  "strength",
  "shiftVelocity",
  "contradictionScore",
  "affectedTickers",
  "evidence",
  "crossAssetPulses",
  "psychologyOverlay",
  "riskLabel",
  "updatedAt"
];

for (const key of requiredWeatherKeys) {
  if (!(key in payload.marketWeather)) {
    throw new Error(`Missing marketWeather.${key}`);
  }
}

if (!Array.isArray(payload.narratives) || payload.narratives.length < 4) {
  throw new Error("Expected at least four narrative intelligence examples.");
}

for (const narrative of payload.narratives) {
  for (const key of requiredNarrativeKeys) {
    if (!(key in narrative)) {
      throw new Error(`Missing ${narrative.id || "unknown"}.${key}`);
    }
  }

  for (const scoreKey of ["confidence", "strength", "contradictionScore"]) {
    if (narrative[scoreKey] < 0 || narrative[scoreKey] > 100) {
      throw new Error(`${narrative.id}.${scoreKey} must be between 0 and 100.`);
    }
  }
}

console.log("Narrative intelligence data contract validated.");
