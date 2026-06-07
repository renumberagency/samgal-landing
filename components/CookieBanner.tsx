"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "samgal_cookies_accepted";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = window.setTimeout(() => setVisible(true), 600);
        return () => window.clearTimeout(t);
      }
    } catch {}
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {}
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          role="dialog"
          aria-live="polite"
          aria-label="הודעת עוגיות"
          className="fixed bottom-0 inset-x-0 z-40 bg-ink-950 text-canvas
            border-t border-ink-700 shadow-[0_-8px_30px_rgba(0,0,0,0.15)]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm leading-relaxed text-canvas/90 text-center sm:text-right flex-1">
              אנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלכם.
              המשך שימוש באתר מהווה הסכמה למדיניות הפרטיות.
            </p>
            <button
              onClick={accept}
              className="shrink-0 px-6 h-11 rounded-lg gradient-accent text-canvas font-bold text-sm
                hover:opacity-95 transition shadow-accent"
            >
              הבנתי, תודה
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
