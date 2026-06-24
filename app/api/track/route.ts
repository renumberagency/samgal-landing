import { NextRequest, NextResponse } from "next/server";
import { getKv, todayKey, EventName } from "@/lib/kv";

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

    const kv = getKv();
    if (!kv) {
      console.warn("[TRACK] KV not configured, event dropped:", event);
      return NextResponse.json({ ok: true, stored: false });
    }

    const day = todayKey();
    const pipeline = kv.pipeline();
    pipeline.incr(`evt:${day}:${event}`);
    pipeline.expire(`evt:${day}:${event}`, 60 * 60 * 24 * 90); // keep 90 days

    if (sessionId && event === "pageview") {
      pipeline.sadd(`sessions:${day}`, sessionId);
      pipeline.expire(`sessions:${day}`, 60 * 60 * 24 * 90);
    }

    await pipeline.exec();
    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("[TRACK ERROR]", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
