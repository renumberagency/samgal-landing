import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = (body?.name ?? "").toString().trim();
    const city = (body?.city ?? "").toString().trim();
    const phone = (body?.phone ?? "").toString().trim();
    const source = (body?.source ?? "unknown").toString();

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "שם לא תקין" }, { status: 400 });
    }
    if (!city || city.length < 2) {
      return NextResponse.json({ ok: false, error: "עיר לא תקינה" }, { status: 400 });
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
      city,
      phone: phoneClean,
      source,
      receivedAt: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") ?? "unknown",
      ua: req.headers.get("user-agent") ?? "unknown",
    };

    console.log("[LEAD]", JSON.stringify(lead));

    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const r = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
        if (!r.ok) {
          console.error("[WEBHOOK] non-2xx:", r.status, await r.text().catch(() => ""));
        } else {
          console.log("[WEBHOOK] ok");
        }
      } catch (err) {
        console.error("[WEBHOOK ERROR]", err);
      }
    } else {
      console.warn("[LEAD] WEBHOOK_URL not set — lead not delivered");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[LEAD ERROR]", err);
    return NextResponse.json({ ok: false, error: "שגיאת שרת" }, { status: 500 });
  }
}
