"use client";

import { motion } from "framer-motion";
import Countdown from "./Countdown";
import LeadForm from "./LeadForm";

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative py-24 sm:py-32 px-4 overflow-hidden border-t border-ink-200"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-right"
          >
            <h2 className="text-4xl sm:text-6xl font-black leading-tight text-balance mb-6 text-ink-950">
              ב-29 במאי בחצות —
              <br />
              <span className="text-samgal">החלון נסגר.</span>
            </h2>
            <p className="text-lg sm:text-xl text-ink-700 text-balance mb-10">
              אחרי זה חוזרים למחירונים הרגילים. אם מטבח חדש על הפרק שלכם השנה —
              <span className="text-ink-950 font-bold"> זה החלון.</span>
              <br />
              בלי גימיקים. בלי &quot;נדחה לחודש הבא&quot;.
            </p>

            <Countdown size="lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-canvas-pure border border-ink-200 rounded-3xl p-7 sm:p-10 shadow-card"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-ink-950 mb-2">
              רוצים את 26% ההנחה?
            </h3>
            <p className="text-ink-500 text-center mb-6 text-sm">
              השאירו פרטים — נחזור אליכם תוך 24 שעות
            </p>
            <LeadForm
              source="final"
              ctaLabel="אני רוצה את 26% — דברו איתי"
              microcopy="ייעוץ ללא עלות · ללא התחייבות"
            />
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 pt-10 border-t border-ink-200 text-center text-ink-500 text-sm space-y-2"
        >
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span>📍 שדרות ההסתדרות 20, חיפה</span>
            <a
              href="tel:077-9978405"
              className="hover:text-samgal transition-colors"
            >
              📞 077-9978405
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span>א&apos;–ה&apos; 09:00–19:00</span>
            <span>ו&apos; 09:00–13:00</span>
          </div>
          <div className="pt-4 text-ink-400 text-xs">
            © {new Date().getFullYear()} סמגל מטבחים. כל הזכויות שמורות.
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
