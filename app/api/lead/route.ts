import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getDb } from "@/lib/db";

const TO_EMAIL = "baruch125@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM ?? "Samgal Landing <onboarding@resend.dev>";

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

    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const ua = req.headers.get("user-agent") ?? "unknown";

    const lead = {
      name,
      city,
      phone: phoneClean,
      source,
      receivedAt: new Date().toISOString(),
      ip,
      ua,
    };

    console.log("[LEAD]", JSON.stringify(lead));

    const tasks: Promise<unknown>[] = [];

    const db = getDb();
    if (db) {
      tasks.push(
        (async () => {
          try {
            const inserts = await Promise.all([
              db.from("samgal_leads").insert({
                name, city, phone: phoneClean, source, ip, ua,
              }),
              db.from("samgal_events").insert({
                event: "lead_success", session_id: null,
              }),
            ]);
            inserts.forEach((r) => {
              if (r.error) console.error("[DB INSERT]", r.error);
            });
          } catch (err) {
            console.error("[DB LEAD ERROR]", err);
          }
        })()
      );
    }

    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      tasks.push(
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        })
          .then(async (r) => {
            if (!r.ok) {
              console.error("[WEBHOOK] non-2xx:", r.status, await r.text().catch(() => ""));
            }
          })
          .catch((err) => console.error("[WEBHOOK ERROR]", err))
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      const receivedLocal = new Date(lead.receivedAt).toLocaleString("he-IL", {
        timeZone: "Asia/Jerusalem",
      });
      const html = `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #fafaf9;">
          <div style="background: #ffffff; border: 1px solid #e4e4e7; border-radius: 16px; padding: 28px;">
            <div style="display:inline-block; padding: 4px 12px; background: #E8F1EC; color: #17553A; border-radius: 999px; font-size: 12px; font-weight: 600; margin-bottom: 16px;">
              ליד חדש · סמגל מטבחים
            </div>
            <h1 style="margin: 0 0 20px; font-size: 22px; color: #0A0A0B;">${escapeHtml(name)}</h1>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #71717A; font-size: 14px; width: 100px;">עיר</td>
                <td style="padding: 10px 0; color: #0A0A0B; font-size: 16px; font-weight: 600;">${escapeHtml(city)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #71717A; font-size: 14px;">טלפון</td>
                <td style="padding: 10px 0; color: #0A0A0B; font-size: 16px; font-weight: 600;">
                  <a href="tel:${phoneClean}" style="color: #17553A; text-decoration: none;">${phoneClean}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #71717A; font-size: 14px;">מקור</td>
                <td style="padding: 10px 0; color: #0A0A0B; font-size: 14px;">${escapeHtml(source)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #71717A; font-size: 14px;">התקבל</td>
                <td style="padding: 10px 0; color: #0A0A0B; font-size: 14px;">${receivedLocal}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e4e4e7;">
              <a href="https://wa.me/972${phoneClean.replace(/^0/, "")}"
                 style="display: inline-block; background: #17553A; color: #fff; padding: 10px 18px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px;">
                שלח WhatsApp ←
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #a1a1aa; font-size: 12px; margin-top: 16px;">
            סמגל מטבחים · דף נחיתה
          </p>
        </div>
      `.trim();

      tasks.push(
        resend.emails
          .send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            subject: `🔔 ליד חדש מסמגל — ${name} מ${city} (${phoneClean})`,
            html,
          })
          .then((res) => {
            if (res.error) console.error("[RESEND ERROR]", res.error);
          })
      );
    }

    await Promise.allSettled(tasks);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[LEAD ERROR]", err);
    return NextResponse.json({ ok: false, error: "שגיאת שרת" }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
