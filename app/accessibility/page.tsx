import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "הצהרת נגישות | סמגל מטבחים",
  description:
    "הצהרת נגישות של אתר סמגל מטבחים. האתר עומד בדרישות תקן ישראלי IS 5568 ו-WCAG 2.1 רמה AA.",
};

const LAST_UPDATED = "18 במאי 2026";

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen py-16 sm:py-24 px-4">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-samgal hover:text-samgal-light mb-8"
        >
          <span>←</span>
          <span>חזרה לדף הבית</span>
        </Link>

        <header className="mb-12 pb-8 border-b border-ink-200">
          <h1 className="text-4xl sm:text-5xl font-black text-ink-950 mb-4">
            הצהרת נגישות
          </h1>
          <p className="text-ink-500 text-sm">
            עדכון אחרון: {LAST_UPDATED}
          </p>
        </header>

        <section className="prose prose-lg max-w-none">
          <p className="text-lg text-ink-700 leading-relaxed mb-8">
            חברת סמגל מטבחים רואה בהנגשת האתר ערך עליון, ופועלת כדי להבטיח
            שהתוכן והשירותים שלנו יהיו נגישים לכלל האוכלוסייה, לרבות אנשים
            עם מוגבלויות.
          </p>

          <p className="text-lg text-ink-700 leading-relaxed mb-12">
            האתר תוכנן ונבנה בהתאם לדרישות{" "}
            <strong className="text-ink-950">תקן ישראלי IS 5568</strong>{" "}
            ולהנחיות{" "}
            <strong className="text-ink-950">WCAG 2.1 ברמה AA</strong>,
            כפי שמוגדר על ידי ארגון W3C.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 mb-5 mt-12">
            ההתאמות שבוצעו באתר
          </h2>
          <ul className="space-y-3 text-ink-700 list-none p-0">
            {[
              "ניגודיות צבעים מתאימה — יחס של 4.5:1 ומעלה בין טקסט לרקע",
              "תמיכה מלאה בקוראי מסך — שימוש בתגיות סמנטיות ו-ARIA",
              "ניווט מלא במקלדת — Tab, Enter, Esc וחיצים",
              "תגיות alt מתאימות לכל התמונות והאייקונים",
              "מבנה כותרות היררכי וברור (H1 → H2 → H3)",
              "ויג'ט נגישות צף עם הגדלת טקסט, ניגודיות גבוהה והדגשת קישורים",
              "שמירת העדפות הנגישות בדפדפן לכניסות הבאות",
              "תמיכה בעברית RTL מלאה",
              "טפסים עם שדות מסומנים, הודעות שגיאה ברורות ותוויות aria",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 leading-relaxed"
              >
                <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-samgal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 mb-5 mt-12">
            הסתייגויות
          </h2>
          <p className="text-ink-700 leading-relaxed mb-6">
            על אף מאמצינו, ייתכן ויימצאו באתר חלקים שעדיין אינם נגישים במלואם.
            אנו עובדים באופן רציף לשיפור והנגשה של תכנים נוספים.
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 mb-5 mt-12">
            דיווח על בעיות נגישות
          </h2>
          <p className="text-ink-700 leading-relaxed mb-6">
            נתקלת בבעיית נגישות באתר? נשמח לדעת ולתקן בהקדם.
          </p>

          <div className="bg-canvas-soft border border-ink-200 rounded-2xl p-6 sm:p-8 mt-6">
            <h3 className="font-bold text-ink-950 mb-4">פרטי יצירת קשר</h3>
            <ul className="space-y-3 text-ink-700">
              <li className="flex items-start gap-3">
                <span className="text-samgal font-bold w-20 shrink-0">טלפון:</span>
                <a
                  href="tel:*6158"
                  className="text-ink-950 hover:text-samgal transition-colors font-medium"
                >
                  *6158
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-samgal font-bold w-20 shrink-0">כתובת:</span>
                <span>שדרות ההסתדרות 20, חיפה</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-samgal font-bold w-20 shrink-0">שעות:</span>
                <span>א&apos;–ה&apos; 09:00–19:00 · ו&apos; 09:00–13:00</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-ink-500 mt-12 leading-relaxed">
            הצהרה זו מתעדכנת מעת לעת בהתאם להתאמות הנגישות המבוצעות באתר.
            עדכון אחרון: {LAST_UPDATED}.
          </p>
        </section>
      </article>
    </main>
  );
}
