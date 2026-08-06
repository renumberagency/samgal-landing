"use client";

import { useState, useMemo } from "react";
import type { Lead } from "@/lib/db";

type SourceCount = { source: string; count: number };

type Props = {
  leads: Lead[];
  sources: SourceCount[];
  totalLeads: number;
  from: string;
  to: string;
};

const SOURCE_LABELS: Record<string, string> = {
  hero: "עמוד ראשי · Hero",
  final: "עמוד ראשי · Final",
  organic: "אורגני",
  organic_hero: "אורגני · Hero",
  organic_final: "אורגני · Final",
};

function sourceLabel(source: string): string {
  return SOURCE_LABELS[source] ?? source;
}

export default function LeadsSection({ leads, sources, totalLeads, from, to }: Props) {
  const [activeSource, setActiveSource] = useState<string>("all");

  const filtered = useMemo(
    () => (activeSource === "all" ? leads : leads.filter((l) => l.source === activeSource)),
    [leads, activeSource]
  );

  const exportHref = useMemo(() => {
    const params = new URLSearchParams({ from, to });
    if (activeSource !== "all") params.set("source", activeSource);
    return `/api/admin/export?${params.toString()}`;
  }, [from, to, activeSource]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
        <h2 className="text-lg font-bold text-ink-950">לידים בטווח</h2>
        <a
          href={exportHref}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg
            bg-samgal text-white text-sm font-semibold
            hover:bg-samgal-light transition shadow-sm"
        >
          ⬇ ייצוא ל-CSV
        </a>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <Tab
          label="הכל"
          count={totalLeads}
          active={activeSource === "all"}
          onClick={() => setActiveSource("all")}
        />
        {sources.map((s) => (
          <Tab
            key={s.source}
            label={sourceLabel(s.source)}
            count={s.count}
            active={activeSource === s.source}
            onClick={() => setActiveSource(s.source)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-canvas-pure border border-ink-200 rounded-2xl p-10 text-center text-ink-500 shadow-card">
          אין לידים במקור {activeSource === "all" ? "בטווח שנבחר" : `"${sourceLabel(activeSource)}"`}.
        </div>
      ) : (
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
                {filtered.map((l) => {
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
                          <a href={`tel:${l.phone}`} className="text-xs px-2.5 py-1 rounded bg-samgal text-white hover:bg-samgal-light transition">
                            📞 חייג
                          </a>
                          <a
                            href={`https://wa.me/972${phoneNoLead}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2.5 py-1 rounded bg-[#25D366] text-white hover:bg-[#22C55E] transition"
                          >
                            💬 WhatsApp
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-xs text-ink-400 mt-2 text-center">
        מציג {filtered.length.toLocaleString("he-IL")} מתוך {totalLeads.toLocaleString("he-IL")} לידים בטווח
        {activeSource !== "all" && ` (סינון: ${sourceLabel(activeSource)})`}
        {filtered.length === 500 && " · הוגבל ל-500 האחרונים · ייצוא ל-CSV יביא הכל"}
      </p>
    </div>
  );
}

function Tab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition border flex items-center gap-2 ${
        active
          ? "bg-samgal text-white border-samgal"
          : "bg-canvas-pure text-ink-700 border-ink-200 hover:bg-canvas-soft"
      }`}
    >
      <span>{label}</span>
      <span
        className={`text-xs px-1.5 py-0.5 rounded font-mono ${
          active ? "bg-white/20 text-white" : "bg-ink-100 text-ink-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
