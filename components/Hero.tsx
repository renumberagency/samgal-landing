"use client";

import { motion } from "framer-motion";
import LeadForm from "./LeadForm";

export default function Hero({ source = "hero" }: { source?: string }) {
  return (
    <section className="relative min-h-[calc(100vh-120px)] flex items-center justify-center overflow-hidden pt-3 pb-16 px-4">
      <div className="relative z-10 max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            border border-samgal/30 bg-samgal-tint text-samgal text-sm font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-samgal" />
          סמגל מטבחים · אולם תצוגה בחיפה
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95] tracking-tight text-balance mb-6 text-ink-950"
        >
          המטבח <span className="text-samgal">הבא</span> שלכם.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg sm:text-xl text-ink-700 max-w-2xl mx-auto text-balance mb-10"
        >
          תכנון אישי. ייצור ישראלי. אולם תצוגה פיזי בחיפה.
          השאירו פרטים — נחזור אליכם תוך 24 שעות לייעוץ ללא עלות.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <LeadForm
            source={source}
            ctaLabel="דברו איתי"
            microcopy="ייעוץ ללא עלות · ללא התחייבות"
          />
        </motion.div>
      </div>
    </section>
  );
}
