"use client";

import { motion } from "framer-motion";

const STANDS = [
  {
    title: "עמדת ספק שיש",
    tag: "שיש ואבן טבעית",
    body: "בוחרים את משטח העבודה שיגדיר את המראה של המטבח. נוגעים בטקסטורות, רואים את הצבעים בתאורה אמיתית — ומקבלים הצעת מחיר על המקום.",
  },
  {
    title: "עמדת מוצרי חשמל",
    tag: "מותגים מובילים",
    body: "נציגי מותגים בשטח. בוחרים תנור, כיריים, מקרר ומדיח שמשתלבים בעיצוב — בלי לרוץ בין חנויות חשמל ולנסות לדמיין אם זה ייכנס נכון.",
  },
  {
    title: "עמדת בר מים תת-כיורי",
    tag: "סינון פרימיום",
    body: "מערכת סינון איכותית שמתחבאת מתחת לכיור. דגמים, מחירים, התקנה כחלק מהמטבח — מים נקיים מהיום הראשון.",
  },
];

export default function SaleDayStands() {
  return (
    <section className="relative py-24 sm:py-32 px-4 bg-canvas-soft">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
            bg-samgal-tint border border-samgal/25 text-samgal text-xs font-bold
            uppercase tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-samgal" />
            רק ב-4 ימי המכירות
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-black text-center text-balance mb-5 text-ink-950"
        >
          לא רק מטבח.
          <br />
          <span className="text-samgal">כל ההחלטות הגדולות — בביקור אחד.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg sm:text-xl text-ink-700 text-center max-w-3xl mx-auto text-balance mb-16"
        >
          ב-4 הימים האלה השואורום שלנו הופך למרכז ייעוץ מלא — עם ספקי פרימיום
          מ-3 תחומים בשטח. תסיימו את הבחירות הגדולות במקום אחד, בלי לרוץ בין חנויות.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid md:grid-cols-3 gap-5"
        >
          {STANDS.map((s) => (
            <motion.div
              key={s.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
              className="group relative rounded-2xl bg-canvas-pure border border-ink-200
                p-8 hover:border-samgal/40 transition-all
                shadow-card hover:shadow-card-hover"
            >
              <span className="inline-block px-2.5 py-1 rounded-md bg-samgal-tint
                text-samgal text-[11px] font-bold uppercase tracking-wider mb-4">
                {s.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-ink-950 mb-3">
                {s.title}
              </h3>
              <p className="text-ink-700 leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-ink-500 mt-10"
        >
          כל העמדות בשואורום של סמגל בחיפה · ללא תשלום · ללא תיאום מראש
        </motion.p>
      </div>
    </section>
  );
}
