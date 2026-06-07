"use client";

import { motion } from "framer-motion";

const POINTS = [
  {
    title: "תכנון אישי, לא מהמדף",
    body: "כל מטבח מתוכנן מאפס לפי המידות, החיים והטעם שלכם. אין שני מטבחים זהים — כי אין שני בתים זהים.",
  },
  {
    title: "ותק של עשרות שנים",
    body: "אחת מחברות המטבחים הוותיקות והמובילות בישראל. חברה שתישאר פה גם בעוד 10 שנים — כשתצטרכו תיקון, החלפה או ייעוץ.",
  },
  {
    title: "שואורום פיזי בחיפה",
    body: "באים, מרגישים, נוגעים בחומרים. רואים את המטבח בעיניים לפני שמחליטים. לא קונים מטבח מתמונה באינטרנט.",
  },
];

export default function WhySamgal() {
  return (
    <section className="relative py-24 sm:py-32 px-4 bg-canvas-soft">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-black text-center text-balance mb-16 text-ink-950"
        >
          שלוש סיבות לבחור בסמגל.
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid md:grid-cols-3 gap-6"
        >
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
              className="group relative rounded-2xl bg-canvas-pure border border-ink-200
                p-8 hover:border-samgal/40 transition-all
                shadow-card hover:shadow-card-hover"
            >
              <div
                className="absolute -top-3 right-6 w-10 h-10 rounded-full gradient-accent
                  flex items-center justify-center font-mono font-bold text-canvas text-sm
                  shadow-accent"
              >
                0{i + 1}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink-950 mb-3 mt-2">
                {p.title}
              </h3>
              <p className="text-ink-700 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
