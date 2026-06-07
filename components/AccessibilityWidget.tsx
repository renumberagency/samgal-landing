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
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="תפריט נגישות"
            className="absolute bottom-16 right-0 w-72 bg-canvas-pure rounded-2xl
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

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "סגור תפריט נגישות" : "פתח תפריט נגישות"}
        aria-expanded={open}
        className="w-14 h-14 rounded-full gradient-accent shadow-accent hover:shadow-accent-hover
          flex items-center justify-center text-canvas text-2xl transition-shadow"
      >
        <span aria-hidden>♿</span>
      </motion.button>
    </div>
  );
}
