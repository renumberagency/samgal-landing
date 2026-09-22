"use client";

// קומפוננטת מבצע ימי המכירות 28-30.9. קובץ נפרד — להסרה מלאה ב-1.10 (git checkout pre-sale-2809).
import { track } from "./Tracker";

const LTR = "inline-block [unicode-bidi:isolate]";

export function SaleBar() {
  return (
    <a
      href="#sale"
      onClick={() => track("sale_bar_click")}
      className="block bg-samgal text-white text-center text-sm sm:text-base font-semibold
        py-2.5 px-4 hover:bg-samgal-dark transition-colors"
    >
      ימי המכירות של סמגל · <span dir="ltr" className={LTR}>28-30.9</span> · 26% הנחה על מטבחים
      {" "}+ 50% על שיש נבחר + מתנות · תאמו פגישה ←
    </a>
  );
}

const PERKS = [
  { big: "26%", label: "הנחה על מטבחי סמגל" },
  { big: "50%", label: "הנחה על דגמי שיש נבחרים" },
  { big: "מתנה", label: "לפי גובה הרכישה" },
];

const GIFTS = [
  { th: "40,000 ₪", plus: "ומעלה", gift: "שואב רובוטי שוטף Dreame 40x Master" },
  { th: "60,000 ₪", plus: "ומעלה", gift: "שואב רובוטי שוטף Dreame 60x" },
  { th: "70,000 ₪", plus: "ומעלה", gift: 'זוג מקררי Hisense ברוחב 120 ס"מ' },
];

export function SaleSection() {
  return (
    <section
      id="sale"
      className="scroll-mt-4 py-16 sm:py-24 px-4 bg-samgal-tint border-y border-samgal/15"
    >
      <div className="max-w-4xl mx-auto text-center">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            border border-samgal/30 bg-canvas-pure text-samgal text-sm font-semibold mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-samgal" />
          שלושה ימים בלבד · <span dir="ltr" className={LTR}>28-30.9</span>
        </span>

        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-ink-950 text-balance mb-4">
          ימי המכירות של <span className="text-samgal">סמגל</span>
        </h2>
        <p className="text-lg sm:text-xl text-ink-700 max-w-2xl mx-auto text-balance mb-12">
          ההטבות הגדולות של השנה על מטבחי יוקרה בהתאמה אישית. תאמו פגישה עכשיו והבטיחו את המחיר.
        </p>

        {/* שלוש הטבות מרכזיות */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {PERKS.map((p) => (
            <div
              key={p.label}
              className="rounded-2xl bg-canvas-pure border border-samgal/15 shadow-card p-6 sm:p-8"
            >
              <div className="text-4xl sm:text-5xl font-black text-samgal mb-2">{p.big}</div>
              <div className="text-ink-700 font-medium text-balance">{p.label}</div>
            </div>
          ))}
        </div>

        {/* מדרגות המתנות */}
        <div className="rounded-2xl bg-canvas-pure border border-samgal/15 shadow-card p-6 sm:p-8 mb-10 text-right">
          <h3 className="text-xl sm:text-2xl font-bold text-ink-950 mb-5 text-center">
            מתנה ברכישת מטבח, לפי הגובה
          </h3>
          <ul className="flex flex-col gap-3">
            {GIFTS.map((g) => (
              <li
                key={g.th}
                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4
                  border-b border-ink-100 last:border-0 pb-3 last:pb-0"
              >
                <span className="shrink-0 font-bold text-samgal text-lg min-w-[120px]">
                  <span dir="ltr" className={LTR}>{g.th}</span> {g.plus}
                </span>
                <span className="text-ink-700">{g.gift}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#final-cta"
          onClick={() => track("sale_cta_click")}
          className="inline-flex items-center justify-center gap-2 rounded-full
            bg-samgal hover:bg-samgal-dark text-white font-bold text-lg
            px-8 py-4 shadow-card transition-colors"
        >
          תאמו פגישה לימי המכירות ←
        </a>
      </div>
    </section>
  );
}
