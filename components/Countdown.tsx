"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET = new Date("2026-05-29T23:59:00+03:00").getTime();

type Parts = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function computeParts(): Parts {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: false };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

type Props = {
  size?: "sm" | "lg";
};

export default function Countdown({ size = "sm" }: Props) {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(computeParts());
    const id = window.setInterval(() => setParts(computeParts()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!parts) {
    return (
      <div
        className={`flex gap-2 sm:gap-3 justify-center ${
          size === "lg" ? "h-28" : "h-20"
        }`}
        aria-hidden
      />
    );
  }

  if (parts.done) {
    return (
      <div className="text-center text-ink-500 text-lg">
        ימי המכירות הסתיימו
      </div>
    );
  }

  const items: Array<{ label: string; value: number }> = [
    { label: "ימים", value: parts.days },
    { label: "שעות", value: parts.hours },
    { label: "דקות", value: parts.minutes },
    { label: "שניות", value: parts.seconds },
  ];

  const cell =
    size === "lg"
      ? "w-20 sm:w-28 h-24 sm:h-32 text-4xl sm:text-6xl"
      : "w-14 sm:w-20 h-16 sm:h-24 text-2xl sm:text-4xl";
  const labelSize = size === "lg" ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs";

  return (
    <div className="flex gap-2 sm:gap-3 justify-center" dir="ltr">
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center gap-1.5">
          <motion.div
            key={it.value}
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`${cell} flex items-center justify-center font-mono font-bold rounded-xl
              bg-canvas-pure border border-ink-200 text-ink-950 shadow-card`}
          >
            {pad(it.value)}
          </motion.div>
          <span className={`${labelSize} uppercase tracking-wider text-ink-500`}>
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}
