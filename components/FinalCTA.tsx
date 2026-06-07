"use client";

import { motion } from "framer-motion";
import LeadForm from "./LeadForm";

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative py-24 sm:py-32 px-4 overflow-hidden border-t border-ink-200"
    >
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl font-black leading-tight text-balance mb-6 text-ink-950"
        >
          מוכנים להתחיל?
          <br />
          <span className="text-samgal">השיחה הראשונה — עלינו.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl text-ink-700 text-balance mb-12 max-w-2xl mx-auto"
        >
          אנחנו לא לוחצים. נבין מה אתם רוצים, נציע רעיונות,
          ונראה ביחד אם זה המקום הנכון בשבילכם.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-canvas-pure border border-ink-200 rounded-3xl p-7 sm:p-10 shadow-card max-w-md mx-auto"
        >
          <LeadForm
            source="final"
            ctaLabel="דברו איתי"
            microcopy="ייעוץ ללא עלות · נחזור אליכם תוך 24 שעות"
          />
        </motion.div>

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
              href="tel:*6158"
              className="hover:text-samgal transition-colors"
            >
              📞 *6158
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
