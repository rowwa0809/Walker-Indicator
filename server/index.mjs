import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";

const port = Number(process.env.PORT || 3000);
const publicDir = new URL("../public/", import.meta.url);
const dataFile = new URL("../data/narratives.json", import.meta.url);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"]
]);

async function fallbackPayload(source = "mock", warning = null) {
  const payload = JSON.parse(await readFile(dataFile, "utf8"));
  return JSON.stringify({ ...payload, source, warning });
}

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function loadNarrativesFromSupabase() {
  const endpoint = `${process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, "")}/rest/v1`;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const columns = [
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

  const response = await fetch(
    `${endpoint}/narrative_signals?select=${columns}&order=contradiction_score.desc&limit=12`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json"
      }
    }
  );

  if (!response.ok) {
    return fallbackPayload("mock", await response.text());
  }

  const rows = await response.json();
  const local = JSON.parse(await readFile(dataFile, "utf8"));
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

  return JSON.stringify({ marketWeather: local.marketWeather, narratives, source: "supabase", warning: null });
}

async function handleApi(req, res) {
  if (req.url !== "/api/narratives") {
    res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  const body = hasSupabaseConfig() ? await loadNarrativesFromSupabase() : await fallbackPayload();
  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(body);
}

function serveStatic(req, res) {
  const requestPath = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const safePath = normalize(requestPath).replace(/^\.\.(\/|\\|$)/, "");
  const filePath = join(publicDir.pathname, safePath);
  const stream = createReadStream(filePath);

  stream.on("open", () => {
    res.writeHead(200, { "Content-Type": mimeTypes.get(extname(filePath)) || "application/octet-stream" });
    stream.pipe(res);
  });

  stream.on("error", () => {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<h1>Not found</h1>");
  });
}

createServer((req, res) => {
  if (req.url?.startsWith("/api/")) {
    handleApi(req, res);
    return;
  }

  serveStatic(req, res);
}).listen(port, () => {
  console.log(`Walker Indicator running at http://localhost:${port}`);
});
