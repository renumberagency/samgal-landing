"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "samgal_a11y_prefs";

type Prefs = {
  fontSize: 0 | 1 | 2 | 3;
  contrast: boolean;
  links: boolean;
};

const DEFAULT_PREFS: Prefs = { fontSize: 0, contrast: false, links: false };

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(saved) });
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const root = document.documentElement;
    root.dataset.a11yFont = String(prefs.fontSize);
    root.classList.toggle("a11y-contrast", prefs.contrast);
    root.classList.toggle("a11y-links", prefs.links);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {}
  }, [prefs, loaded]);

  function cycleFont() {
    setPrefs((p) => ({ ...p, fontSize: ((p.fontSize + 1) % 4) as Prefs["fontSize"] }));
  }
  function reset() {
    setPrefs(DEFAULT_PREFS);
  }

  const fontLabel = ["רגיל", "בינוני", "גדול", "ענק"][prefs.fontSize];

  const rowBase =
    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-right transition border";
  const rowOff = "bg-canvas-soft text-ink-700 border-ink-200 hover:bg-ink-100";
  const rowOn = "bg-samgal-tint text-samgal border-samgal/40 font-semibold";

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="תפריט נגישות"
            className="absolute bottom-14 left-0 w-72 bg-canvas-pure rounded-2xl
              shadow-card-hover border border-ink-200 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-ink-950 text-sm">תפריט נגישות</h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="סגור תפריט"
                className="text-ink-500 hover:text-ink-950 w-7 h-7 flex items-center justify-center rounded-md hover:bg-ink-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={cycleFont}
                className={`${rowBase} ${prefs.fontSize > 0 ? rowOn : rowOff}`}
              >
                <span>גודל טקסט</span>
                <span className="text-xs">{fontLabel}</span>
              </button>

              <button
                onClick={() => setPrefs((p) => ({ ...p, contrast: !p.contrast }))}
                className={`${rowBase} ${prefs.contrast ? rowOn : rowOff}`}
                aria-pressed={prefs.contrast}
              >
                <span>ניגודיות גבוהה</span>
                <span>{prefs.contrast ? "מופעל" : "כבוי"}</span>
              </button>

              <button
                onClick={() => setPrefs((p) => ({ ...p, links: !p.links }))}
                className={`${rowBase} ${prefs.links ? rowOn : rowOff}`}
                aria-pressed={prefs.links}
              >
                <span>הדגשת קישורים</span>
                <span>{prefs.links ? "מופעל" : "כבוי"}</span>
              </button>

              <button
                onClick={reset}
                className="w-full mt-2 px-3 py-2 rounded-lg text-sm text-ink-500
                  hover:text-ink-950 hover:bg-ink-100 transition"
              >
                איפוס הגדרות
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-ink-200">
              <a
                href="/accessibility"
                className="text-xs text-samgal hover:underline font-medium"
              >
                הצהרת נגישות מלאה ←
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "סגור תפריט נגישות" : "פתח תפריט נגישות"}
        aria-expanded={open}
        className="w-11 h-11 rounded-full bg-[#1976D2] hover:bg-[#1565C0]
          flex items-center justify-center text-white
          shadow-[0_4px_12px_rgba(25,118,210,0.35)]
          hover:shadow-[0_6px_18px_rgba(25,118,210,0.45)]
          transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path d="M12 2C13.11 2 14 2.9 14 4S13.11 6 12 6 10 5.11 10 4 10.9 2 12 2M15.89 8.11C15.5 7.72 14.83 7 13.53 7H10.47C8.39 7 7 8.71 7 10.4L5 21H7L9 12H10V21H14V12H15L17 21H19L17.5 14.55L15.89 8.11Z" />
        </svg>
      </button>
    </div>
  );
}
