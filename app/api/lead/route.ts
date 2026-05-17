import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body?.name ?? "").toString().trim();
    const phone = (body?.phone ?? "").toString().trim();
    const source = (body?.source ?? "unknown").toString();

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "שם לא תקין" }, { status: 400 });
    }
    const phoneClean = phone.replace(/[\s-]/g, "");
    if (!/^0\d{8,9}$/.test(phoneClean)) {
      return NextResponse.json(
        { ok: false, error: "מספר טלפון לא תקין" },
        { status: 400 }
      );
    }

    const lead = {
      name,
      phone: phoneClean,
      source,
      receivedAt: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") ?? "unknown",
      ua: req.headers.get("user-agent") ?? "unknown",
    };

    console.log("[LEAD]", JSON.stringify(lead));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[LEAD ERROR]", err);
    return NextResponse.json({ ok: false, error: "שגיאת שרת" }, { status: 500 });
  }
}
