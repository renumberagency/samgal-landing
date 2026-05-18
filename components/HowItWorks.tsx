"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    title: "שיחת היכרות",
    sub: "יום 1",
    body: "מבינים מה אתם רוצים. מה התקציב. מה החלום. בלי מחירים מפוצצים, בלי לחץ למכור.",
  },
  {
    title: "תכנון תלת-מימדי בשואורום",
    sub: "מאשרים לפני שמתחילים",
    body: "רואים את המטבח שלכם בתלת-מימד עוד לפני הייצור. בוחרים חומרים, צבעים, פרזול — מאשרים כל פרט.",
  },
  {
    title: "ייצור בלוח זמנים כתוב",
    sub: "תאריך התקנה מכובד",
    body: "מקבלים תאריך התקנה כתוב — וכך זה גם קורה. בלי 'תחזרו אלינו עוד שבוע'.",
  },
  {
    title: "התקנה נקייה ומסודרת",
    sub: "ניקיון בסיום",
    body: "צוות מקצועי בלבד, ערוץ קשר פתוח לאורך כל התהליך, וניקיון מלא בסיום ההתקנה.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-black text-center text-balance mb-6 text-ink-950"
        >
          מטבח חדש בלי הפתעות.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl text-ink-500 text-center mb-16 text-balance"
        >
          בלי בלגן. בלי &quot;מחר יגיע הצוות&quot;. תהליך כתוב מראש — שמתבצע כמו שסיכמנו.
        </motion.p>

        <div className="relative">
          <div
            className="absolute right-7 sm:right-10 top-2 bottom-2 w-px
              bg-gradient-to-b from-samgal/60 via-samgal/30 to-transparent"
            aria-hidden
          />

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
            className="space-y-8 sm:space-y-10"
          >
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                variants={{
                  hidden: { opacity: 0, x: 24 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.55 } },
                }}
                className="relative flex gap-5 sm:gap-8"
              >
                <div
                  className="shrink-0 relative z-10 w-14 sm:w-20 h-14 sm:h-20 rounded-full
                    gradient-accent flex items-center justify-center
                    font-mono font-black text-canvas text-xl sm:text-2xl
                    shadow-accent border-4 border-canvas"
                >
                  {i + 1}
                </div>
                <div className="pt-2 sm:pt-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-ink-950">
                      {s.title}
                    </h3>
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-samgal">
                      {s.sub}
                    </span>
                  </div>
                  <p className="text-ink-700 leading-relaxed">{s.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
