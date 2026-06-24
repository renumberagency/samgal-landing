import { NextRequest, NextResponse } from "next/server";
import { getDb, EventName } from "@/lib/db";

const ALLOWED: EventName[] = [
  "pageview",
  "scroll_50",
  "scroll_90",
  "engaged",
  "phone_click",
  "wa_click",
  "form_focus",
  "form_submit",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = (body?.event ?? "").toString() as EventName;
    const sessionId = (body?.sessionId ?? "").toString();

    if (!ALLOWED.includes(event)) {
      return NextResponse.json({ ok: false, error: "invalid event" }, { status: 400 });
    }

    const db = getDb();
    if (!db) {
      console.warn("[TRACK] DB not configured, event dropped:", event);
      return NextResponse.json({ ok: true, stored: false });
    }

    const { error } = await db
      .from("samgal_events")
      .insert({ event, session_id: sessionId || null });

    if (error) console.error("[TRACK INSERT]", error);

    return NextResponse.json({ ok: true, stored: !error });
  } catch (err) {
    console.error("[TRACK ERROR]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
