"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

function fmtDate(d: Date): string {
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().split("T")[0];
}

function fmtDisplay(s: string): string {
  const [y, m, d] = s.split("-");
  return `${d}.${m}.${y.slice(2)}`;
}

function daysBetween(from: string, to: string): number {
  const f = new Date(from + "T00:00:00");
  const t = new Date(to + "T00:00:00");
  return Math.round((t.getTime() - f.getTime()) / 86400000) + 1;
}

type Preset = { label: string; build: () => [string, string] };

const PRESETS: Preset[] = [
  {
    label: "היום",
    build: () => {
      const t = fmtDate(new Date());
      return [t, t];
    },
  },
  {
    label: "אתמול",
    build: () => {
      const y = fmtDate(new Date(Date.now() - 86400000));
      return [y, y];
    },
  },
  {
    label: "7 ימים",
    build: () => [fmtDate(new Date(Date.now() - 6 * 86400000)), fmtDate(new Date())],
  },
  {
    label: "30 ימים",
    build: () => [fmtDate(new Date(Date.now() - 29 * 86400000)), fmtDate(new Date())],
  },
  {
    label: "90 ימים",
    build: () => [fmtDate(new Date(Date.now() - 89 * 86400000)), fmtDate(new Date())],
  },
  {
    label: "החודש",
    build: () => {
      const now = new Date();
      const first = new Date(now.getFullYear(), now.getMonth(), 1);
      return [fmtDate(first), fmtDate(now)];
    },
  },
  {
    label: "חודש שעבר",
    build: () => {
      const now = new Date();
      const firstPrev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastPrev = new Date(now.getFullYear(), now.getMonth(), 0);
      return [fmtDate(firstPrev), fmtDate(lastPrev)];
    },
  },
];

export default function DateFilter({ from, to }: { from: string; to: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [localFrom, setLocalFrom] = useState(from);
  const [localTo, setLocalTo] = useState(to);

  function apply(newFrom: string, newTo: string) {
    const params = new URLSearchParams();
    params.set("from", newFrom);
    params.set("to", newTo);
    router.push(`${pathname}?${params.toString()}`);
  }

  function activePreset(): string | null {
    for (const p of PRESETS) {
      const [pf, pt] = p.build();
      if (pf === from && pt === to) return p.label;
    }
    return null;
  }

  const active = activePreset();
  const dayCount = daysBetween(from, to);

  return (
    <section className="bg-canvas-pure border border-ink-200 rounded-2xl p-4 sm:p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-bold text-ink-950">סינון תאריכים</h2>
          <p className="text-xs text-ink-500 mt-0.5">
            מציג: <span className="font-semibold text-ink-700">{fmtDisplay(from)} — {fmtDisplay(to)}</span>
            {" · "}{dayCount} {dayCount === 1 ? "יום" : "ימים"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {PRESETS.map((p) => {
          const isActive = active === p.label;
          return (
            <button
              key={p.label}
              onClick={() => {
                const [f, t] = p.build();
                setLocalFrom(f);
                setLocalTo(t);
                apply(f, t);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition border ${
                isActive
                  ? "bg-samgal text-white border-samgal"
                  : "bg-canvas-soft text-ink-700 border-ink-200 hover:bg-ink-100"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs text-ink-500 mb-1">מתאריך</label>
          <input
            type="date"
            value={localFrom}
            max={localTo}
            onChange={(e) => setLocalFrom(e.target.value)}
            className="w-full h-10 px-3 rounded-lg bg-canvas-soft border border-ink-200
              text-ink-950 text-sm focus:outline-none focus:border-samgal
              focus:ring-2 focus:ring-samgal/10 transition"
          />
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="block text-xs text-ink-500 mb-1">עד תאריך</label>
          <input
            type="date"
            value={localTo}
            min={localFrom}
            max={fmtDate(new Date())}
            onChange={(e) => setLocalTo(e.target.value)}
            className="w-full h-10 px-3 rounded-lg bg-canvas-soft border border-ink-200
              text-ink-950 text-sm focus:outline-none focus:border-samgal
              focus:ring-2 focus:ring-samgal/10 transition"
          />
        </div>
        <button
          onClick={() => apply(localFrom, localTo)}
          disabled={localFrom === from && localTo === to}
          className="h-10 px-5 rounded-lg gradient-accent text-white font-semibold text-sm
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-accent hover:shadow-accent-hover transition-shadow"
        >
          החל סינון
        </button>
      </div>
    </section>
  );
}
