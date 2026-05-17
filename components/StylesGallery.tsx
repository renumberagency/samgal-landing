"use client";

import { motion } from "framer-motion";

const STYLES = [
  {
    name: "אורבני",
    tag: "Urban",
    desc: "קווים חדים, חומרים גולמיים, אופי עירוני שלא מתפשר.",
    gradient: "from-zinc-200 via-zinc-100 to-stone-200",
  },
  {
    name: "מודרני",
    tag: "Modern",
    desc: "פשטות יוקרתית, פרופורציות מדויקות, אסתטיקה בלי גיל.",
    gradient: "from-stone-200 via-stone-100 to-neutral-200",
  },
  {
    name: "קלאסי",
    tag: "Classic",
    desc: "חמימות של עץ, פרזול עדין, מטבח שמספר סיפור.",
    gradient: "from-amber-100 via-stone-100 to-orange-50",
  },
];

export default function StylesGallery() {
  return (
    <section className="relative py-24 sm:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-black text-center text-balance mb-4 text-ink-950"
        >
          שלושה סגנונות.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl sm:text-2xl text-ink-500 text-center mb-16"
        >
          אחד מהם הוא המטבח שלכם.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid md:grid-cols-3 gap-5"
        >
          {STYLES.map((s) => (
            <motion.div
              key={s.name}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-ink-200
                hover:border-samgal/40 hover:shadow-card-hover shadow-card transition-all cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${s.gradient}`}
                aria-hidden
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                  bg-gradient-to-t from-samgal/15 to-transparent"
                aria-hidden
              />

              <div className="relative h-72 sm:h-80 p-7 flex flex-col justify-end">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-samgal mb-2">
                  {s.tag}
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-ink-950 mb-2">
                  {s.name}
                </h3>
                <p className="text-ink-700 leading-relaxed max-w-xs">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a
            href="#final-cta"
            className="inline-flex items-center gap-2 text-lg font-bold text-samgal
              hover:text-samgal-light transition-colors group"
          >
            בחרתם סגנון? קבלו 26% הנחה
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
