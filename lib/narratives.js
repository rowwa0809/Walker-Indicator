import { readFile } from "node:fs/promises";
import path from "node:path";

const FALLBACK_PATH = path.join(process.cwd(), "data", "narratives.json");

const COLUMNS = [
  "id",
  "title",
  "summary",
  "status",
  "lens",
  "confidence",
  "strength",
  "shift_velocity",
  "contradiction_score",
  "affected_tickers",
  "evidence",
  "cross_asset_pulses",
  "psychology_overlay",
  "risk_label",
  "updated_at"
].join(",");

async function readFallback() {
  const raw = await readFile(FALLBACK_PATH, "utf8");
  return JSON.parse(raw);
}

export function hasSupabase() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function loadNarratives() {
  if (!hasSupabase()) {
    const local = await readFallback();
    return { ...local, source: "mock", warning: null };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(
      `${url}/rest/v1/narrative_signals?select=${COLUMNS}&order=contradiction_score.desc&limit=12`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        cache: "no-store"
      }
    );

    if (!response.ok) {
      const local = await readFallback();
      return { ...local, source: "mock", warning: await response.text() };
    }

    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      const local = await readFallback();
      return { ...local, source: "mock", warning: "supabase_empty" };
    }

    const local = await readFallback();
    const narratives = rows.map((row) => ({
      id: row.id,
      title: row.title,
      summary: row.summary,
      status: row.status,
      lens: row.lens,
      confidence: row.confidence,
      strength: row.strength,
      shiftVelocity: row.shift_velocity,
      contradictionScore: row.contradiction_score,
      affectedTickers: row.affected_tickers,
      evidence: row.evidence,
      crossAssetPulses: row.cross_asset_pulses,
      psychologyOverlay: row.psychology_overlay,
      riskLabel: row.risk_label,
      updatedAt: row.updated_at
    }));

    return { marketWeather: local.marketWeather, narratives, source: "supabase", warning: null };
  } catch (err) {
    const local = await readFallback();
    return { ...local, source: "mock", warning: `supabase_unreachable: ${err.message}` };
  } finally {
    clearTimeout(timeout);
  }
}
