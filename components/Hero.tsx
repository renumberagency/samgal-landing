"use client";

import { motion } from "framer-motion";
import Countdown from "./Countdown";
import LeadForm from "./LeadForm";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-4">
      <div className="relative z-10 max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            border border-samgal/30 bg-samgal-tint text-samgal text-sm font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-samgal animate-pulse" />
          ימי המכירות של סמגל מטבחים · 26–29 במאי
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95] tracking-tight text-balance mb-6 text-ink-950"
        >
          26% הנחה.
          <br />
          על כל מטבח.
          <br />
          <span className="text-samgal">4 ימים בלבד.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg sm:text-xl text-ink-700 max-w-2xl mx-auto text-balance mb-10"
        >
          לא על דגם מסוים. לא על שאריות מלאי. על כל מטבח שתבחרו —
          מהאורבני ועד הקלאסי. ביום שישי 29.05 בשעה 16:00 החלון נסגר.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-10"
        >
          <Countdown size="sm" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <LeadForm
            source="hero"
            ctaLabel="בקשו את 26% עכשיו"
            microcopy="ייעוץ ללא עלות · ללא התחייבות · נחזור אליכם תוך 24 שעות"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ink-400 text-xs flex flex-col items-center gap-2"
        >
          <span>גלילו למטה</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
