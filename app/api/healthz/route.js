import { NextResponse } from "next/server";
import { hasSupabase } from "@/lib/narratives";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    { status: "ok", supabase: hasSupabase() ? "configured" : "fallback" },
    { headers: { "Cache-Control": "no-store" } }
  );
}
