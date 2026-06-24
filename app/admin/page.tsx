import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getDb, AdminStats, Lead } from "@/lib/db";
import LogoutButton from "./LogoutButton";
import DateFilter from "./DateFilter";

export const dynamic = "force-dynamic";

function fmtDateISO(d: Date): string {
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().split("T")[0];
}

function fmtDateDisplay(s: string): string {
  const [y, m, d] = s.split("-");
  return `${d}.${m}`;
}

function daysInRange(from: string, to: string): string[] {
  const out: string[] = [];
  const f = new Date(from + "T00:00:00");
  const t = new Date(to + "T00:00:00");
  const cursor = new Date(t);
  while (cursor >= f) {
    out.push(fmtDateISO(cursor));
    cursor.setDate(cursor.getDate() - 1);
  }
  return out;
}

async function fetchStats(from: string, to: string): Promise<AdminStats | null> {
  const db = getDb();
  if (!db) return null;
  const { data, error } = await db.rpc("get_admin_stats", { p_from: from, p_to: to });
  if (error) {
    console.error("[ADMIN STATS]", error);
    return null;
  }
  return (data as AdminStats) ?? {
    events_by_day: [],
    sessions_by_day: [],
    recent_leads: [],
  };
}

type Bucket = Record<string, Record<string, number>>;
function bucket(rows: Array<{ event?: string; day: string; count: number }>, eventKey?: string): Bucket {
  const out: Bucket = {};
  for (const r of rows) {
    const key = eventKey ?? (r.event ?? "_");
    if (!out[r.day]) out[r.day] = {};
    out[r.day][key] = (out[r.day][key] ?? 0) + r.count;
  }
  return out;
}
function sumRange(b: Bucket, days: string[], key: string): number {
  return days.reduce((a, d) => a + (b[d]?.[key] ?? 0), 0);
}

type SP = { from?: string; to?: string };

export default async function AdminPage({ searchParams }: { searchParams: SP }) {
  if (!(await isAdmin())) redirect("/admin/login");

  const today = fmtDateISO(new Date());
  const defaultFrom = fmtDateISO(new Date(Date.now() - 29 * 86400000));
  const from = searchParams.from ?? defaultFrom;
  const to = searchParams.to ?? today;

  const stats = await fetchStats(from, to);
  const days = daysInRange(from, to);

  const events = bucket(stats?.events_by_day ?? []);
  const sessions = bucket(
    (stats?.sessions_by_day ?? []).map((r) => ({ day: r.day, count: r.count })),
    "sessions"
  );

  const tot = (k: string) => sumRange(events, days, k);
  const totSessions = sumRange(sessions, days, "sessions");

  const totalPageviews = tot("pageview");
  const totalLeads = tot("lead_success");
  const conversionRate = totalPageviews > 0 ? (totalLeads / totalPageviews) * 100 : 0;

  return (
    <main className="min-h-screen bg-canvas-soft">
      <header className="sticky top-0 z-30 bg-canvas-pure border-b border-ink-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-samgal text-white flex items-center justify-center font-black">S</div>
            <div>
              <h1 className="font-bold text-ink-950 text-sm sm:text-base leading-tight">לוח בקרה</h1>
              <p className="text-xs text-ink-500 leading-tight">סמגל מטבחים</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {!stats && <StorageWarning />}

        <DateFilter from={from} to={to} />

        <section>
          <h2 className="text-lg font-bold text-ink-950 mb-3">סיכום לידים בטווח</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="לידים בטווח" value={totalLeads} accent />
            <Stat label="כניסות" value={totalPageviews} />
            <Stat label="מבקרים ייחודיים" value={totSessions} />
            <Stat
              label="שיעור המרה"
              value={`${conversionRate.toFixed(1)}%`}
              sub={`${totalLeads} / ${totalPageviews}`}
            />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink-950 mb-3">משפך המרה</h2>
          <Funnel
            steps={[
              { label: "כניסות (page views)", value: totalPageviews },
              { label: "גלילה 50%", value: tot("scroll_50") },
              { label: "גלילה 90%", value: tot("scroll_90") },
              { label: "30 שנ׳ בעמוד", value: tot("engaged") },
              { label: "מילוי טופס", value: tot("form_submit") },
              { label: "ליד התקבל", value: totalLeads },
            ]}
          />
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink-950 mb-3">הקלקות על כפתורי קשר</h2>
          <div className="grid grid-cols-2 gap-3">
            <Stat label="📞 הקלקות על טלפון" value={tot("phone_click")} />
            <Stat label="💬 הקלקות על וואטסאפ" value={tot("wa_click")} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink-950 mb-3">פירוט יומי</h2>
          <DailyTable days={days} events={events} sessions={sessions} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-ink-950">לידים בטווח</h2>
            <span className="text-xs text-ink-500">
              {stats?.recent_leads.length ?? 0} לידים
            </span>
          </div>
          <LeadsTable leads={stats?.recent_leads ?? []} />
        </section>

        <section>
          <h2 className="text-lg font-bold text-ink-950 mb-3">קישורים שימושיים</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <ExtLink href="https://ads.google.com/aw/conversions" title="Google Ads · המרות" sub="ספירת ההמרות מקמפיינים" />
            <ExtLink href="https://supabase.com/dashboard/project/ptyyuuspjhntnwmtvryx/editor" title="Supabase Table Editor" sub="עיון בטבלאות samgal_leads + samgal_events" />
            <ExtLink href="https://eu1.make.com/scenarios" title="Make.com Scenarios" sub="היסטוריית האוטומציות" />
            <ExtLink href="https://vercel.com/renumberagencys-projects/samgal-landing/logs" title="Vercel Logs" sub="כל הקריאות לשרת" />
            <ExtLink href="https://samgal-landing.vercel.app/" title="האתר החי" sub="פתח את דף הנחיתה" />
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value, sub, accent }: { label: string; value: number | string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? "bg-samgal-tint border-samgal/30" : "bg-canvas-pure border-ink-200"} shadow-card`}>
      <div className={`text-xs font-semibold uppercase tracking-wider ${accent ? "text-samgal" : "text-ink-500"}`}>{label}</div>
      <div className={`text-3xl sm:text-4xl font-black mt-2 ${accent ? "text-samgal" : "text-ink-950"}`}>
        {typeof value === "number" ? value.toLocaleString("he-IL") : value}
      </div>
      {sub && <div className="text-xs text-ink-500 mt-1.5">{sub}</div>}
    </div>
  );
}

function Funnel({ steps }: { steps: { label: string; value: number }[] }) {
  const max = Math.max(...steps.map((s) => s.value), 1);
  const top = steps[0]?.value ?? 0;
  return (
    <div className="bg-canvas-pure border border-ink-200 rounded-2xl p-5 shadow-card space-y-2.5">
      {steps.map((s, i) => {
        const pct = (s.value / max) * 100;
        const conv = top > 0 ? (s.value / top) * 100 : 0;
        return (
          <div key={s.label} className="flex items-center gap-3">
            <div className="w-40 shrink-0 text-sm text-ink-700">{s.label}</div>
            <div className="flex-1 h-9 bg-ink-100 rounded-lg overflow-hidden relative">
              <div className="absolute inset-y-0 right-0 gradient-accent transition-all" style={{ width: `${pct}%` }} />
              <div className="absolute inset-0 flex items-center px-3 text-sm font-bold text-white mix-blend-difference">
                {s.value.toLocaleString("he-IL")}
              </div>
            </div>
            <div className="w-16 shrink-0 text-xs text-ink-500 text-left font-mono">
              {i === 0 ? "—" : `${conv.toFixed(1)}%`}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DailyTable({
  days,
  events,
  sessions,
}: {
  days: string[];
  events: Bucket;
  sessions: Bucket;
}) {
  if (days.length === 0) {
    return (
      <div className="bg-canvas-pure border border-ink-200 rounded-2xl p-10 text-center text-ink-500 shadow-card">
        אין ימים בטווח שנבחר.
      </div>
    );
  }
  return (
    <div className="bg-canvas-pure border border-ink-200 rounded-2xl overflow-hidden shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-canvas-soft text-ink-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-right px-4 py-3">תאריך</th>
              <th className="text-right px-4 py-3">כניסות</th>
              <th className="text-right px-4 py-3">ייחודיים</th>
              <th className="text-right px-4 py-3">גלילה 50%</th>
              <th className="text-right px-4 py-3">גלילה 90%</th>
              <th className="text-right px-4 py-3">📞 טלפון</th>
              <th className="text-right px-4 py-3">💬 ווטסאפ</th>
              <th className="text-right px-4 py-3">לידים</th>
              <th className="text-right px-4 py-3">המרה</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-200">
            {days.map((day) => {
              const d = events[day] ?? {};
              const s = sessions[day]?.["sessions"] ?? 0;
              const pv = d.pageview ?? 0;
              const leads = d.lead_success ?? 0;
              const conv = pv > 0 ? (leads / pv) * 100 : 0;
              const isEmpty = pv === 0 && leads === 0;
              return (
                <tr key={day} className={`hover:bg-canvas-soft/50 ${isEmpty ? "text-ink-400" : ""}`}>
                  <td className="px-4 py-2.5 font-mono text-ink-950">{fmtDateDisplay(day)}</td>
                  <td className="px-4 py-2.5">{pv.toLocaleString("he-IL")}</td>
                  <td className="px-4 py-2.5">{s.toLocaleString("he-IL")}</td>
                  <td className="px-4 py-2.5">{(d.scroll_50 ?? 0).toLocaleString("he-IL")}</td>
                  <td className="px-4 py-2.5">{(d.scroll_90 ?? 0).toLocaleString("he-IL")}</td>
                  <td className="px-4 py-2.5">{(d.phone_click ?? 0).toLocaleString("he-IL")}</td>
                  <td className="px-4 py-2.5">{(d.wa_click ?? 0).toLocaleString("he-IL")}</td>
                  <td className={`px-4 py-2.5 font-semibold ${leads > 0 ? "text-samgal" : ""}`}>
                    {leads.toLocaleString("he-IL")}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-ink-500 font-mono">
                    {pv > 0 ? `${conv.toFixed(1)}%` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LeadsTable({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <div className="bg-canvas-pure border border-ink-200 rounded-2xl p-10 text-center text-ink-500 shadow-card">
        אין לידים בטווח שנבחר.
      </div>
    );
  }
  return (
    <div className="bg-canvas-pure border border-ink-200 rounded-2xl overflow-hidden shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-canvas-soft text-ink-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="text-right px-4 py-3">שם</th>
              <th className="text-right px-4 py-3">עיר</th>
              <th className="text-right px-4 py-3">טלפון</th>
              <th className="text-right px-4 py-3">מקור</th>
              <th className="text-right px-4 py-3">זמן</th>
              <th className="text-right px-4 py-3">פעולות</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-200">
            {leads.map((l) => {
              const time = new Date(l.created_at ?? Date.now()).toLocaleString("he-IL", {
                timeZone: "Asia/Jerusalem",
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });
              const phoneNoLead = l.phone.replace(/^0/, "");
              return (
                <tr key={l.id} className="hover:bg-canvas-soft/50">
                  <td className="px-4 py-3 font-medium text-ink-950">{l.name}</td>
                  <td className="px-4 py-3 text-ink-700">{l.city}</td>
                  <td className="px-4 py-3 font-mono text-ink-700" dir="ltr">{l.phone}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono uppercase bg-samgal-tint text-samgal px-2 py-0.5 rounded">
                      {l.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-500 text-xs whitespace-nowrap">{time}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <a href={`tel:${l.phone}`} className="text-xs px-2.5 py-1 rounded bg-samgal text-white hover:bg-samgal-light transition">📞 חייג</a>
                      <a href={`https://wa.me/972${phoneNoLead}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2.5 py-1 rounded bg-[#25D366] text-white hover:bg-[#22C55E] transition">💬 WhatsApp</a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExtLink({ href, title, sub }: { href: string; title: string; sub: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block bg-canvas-pure border border-ink-200 rounded-2xl p-5 shadow-card hover:border-samgal/40 hover:shadow-card-hover transition-all group">
      <div className="font-bold text-ink-950 mb-1 flex items-center gap-2">
        {title}
        <span className="text-samgal opacity-0 group-hover:opacity-100 transition-opacity">←</span>
      </div>
      <div className="text-xs text-ink-500">{sub}</div>
    </a>
  );
}

function StorageWarning() {
  return (
    <div className="rounded-2xl bg-amber-50 border border-amber-300 p-5">
      <h3 className="font-bold text-amber-900 mb-2">⚠️ Supabase לא מחובר</h3>
      <p className="text-amber-900 text-sm">
        משתני הסביבה <code className="px-1 bg-amber-100 rounded">SUPABASE_URL</code>{" "}
        ו-<code className="px-1 bg-amber-100 rounded">SUPABASE_SERVICE_ROLE_KEY</code> לא מוגדרים.
      </p>
    </div>
  );
}
