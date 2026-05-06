import { NextResponse } from "next/server";
import { loadNarratives } from "@/lib/narratives";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await loadNarratives();
    return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    return NextResponse.json({ error: "narratives unavailable", message: err.message }, { status: 500 });
  }
}
