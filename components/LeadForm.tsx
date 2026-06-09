"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  source: string;
  ctaLabel: string;
  microcopy?: string;
};

type Status = "idle" | "loading" | "success" | "error";

declare global {
  interface Window {
    gtag?: (command: string, action: string, params: Record<string, unknown>) => void;
  }
}

const GOOGLE_ADS_CONVERSION = "AW-814762867/vVf1CPnX5rscEPOWwYQD";

export default function LeadForm({ source, ctaLabel, microcopy }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, city, source }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMsg(data?.error ?? "שגיאה");
        setStatus("error");
        return;
      }
      setStatus("success");
      try {
        window.gtag?.("event", "conversion", { send_to: GOOGLE_ADS_CONVERSION });
      } catch {}
    } catch {
      setErrorMsg("בעיית רשת");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full h-14 px-5 rounded-xl bg-canvas-pure border border-ink-200 " +
    "text-ink-950 placeholder-ink-400 text-base " +
    "focus:outline-none focus:border-samgal focus:ring-4 focus:ring-samgal/10 transition";

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl bg-samgal-tint border border-samgal/30 px-6 py-8 text-center"
          >
            <div className="text-4xl mb-3 text-samgal">✓</div>
            <h3 className="text-xl font-bold text-ink-950 mb-2">קיבלנו את הפרטים</h3>
            <p className="text-ink-700">
              נחזור אליך תוך 24 שעות לייעוץ אישי ללא עלות.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            <input
              type="text"
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="שם מלא *"
              autoComplete="name"
              aria-label="שם מלא (חובה)"
              title="נא להזין שם מלא"
              className={inputClass}
            />
            <input
              type="tel"
              required
              pattern="0\d{8,9}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="טלפון *"
              autoComplete="tel"
              inputMode="numeric"
              aria-label="מספר טלפון (חובה)"
              title="נא להזין מספר טלפון תקין (10 ספרות, מתחיל ב-0)"
              dir="ltr"
              className={`${inputClass} text-right`}
            />
            <input
              type="text"
              required
              minLength={2}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="עיר *"
              autoComplete="address-level2"
              aria-label="עיר מגורים (חובה)"
              title="נא להזין עיר מגורים"
              className={inputClass}
            />

            <label className="flex items-start gap-2.5 text-sm text-ink-700 cursor-pointer mt-1 select-none">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                aria-label="אני מאשר את מדיניות הפרטיות (חובה)"
                className="mt-0.5 w-4 h-4 accent-samgal cursor-pointer shrink-0"
              />
              <span className="leading-snug text-right">
                אני מאשר את{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-samgal font-semibold underline underline-offset-2 hover:text-samgal-light"
                >
                  מדיניות הפרטיות
                </a>
              </span>
            </label>

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              className="h-14 mt-2 rounded-xl gradient-accent text-canvas font-bold text-lg
                disabled:opacity-60 disabled:cursor-not-allowed
                shadow-accent hover:shadow-accent-hover transition-shadow"
            >
              {status === "loading" ? "שולח..." : ctaLabel}
            </motion.button>
            {status === "error" && (
              <p className="text-red-600 text-sm text-center" role="alert">
                {errorMsg}
              </p>
            )}
            {microcopy && (
              <p className="text-xs text-ink-500 text-center mt-1">{microcopy}</p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
