import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | סמגל מטבחים",
  description:
    "מדיניות הפרטיות של אתר סמגל מטבחים. אילו פרטים נאספים, כיצד הם משמשים, וזכויותיכם.",
};

const LAST_UPDATED = "18 במאי 2026";

export default function PrivacyPage() {
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
            מדיניות פרטיות
          </h1>
          <p className="text-ink-500 text-sm">עדכון אחרון: {LAST_UPDATED}</p>
        </header>

        <section className="space-y-12">
          <p className="text-lg text-ink-700 leading-relaxed">
            חברת סמגל מטבחים (להלן: &quot;סמגל&quot; או &quot;אנחנו&quot;)
            מכבדת את פרטיותכם ופועלת בהתאם להוראות חוק הגנת הפרטיות, התשמ&quot;א-1981
            ולתקנותיו. מדיניות זו מסבירה אילו פרטים נאספים באתר, כיצד הם משמשים
            אותנו, ומהן זכויותיכם.
          </p>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 mb-5">
              אילו פרטים אנחנו אוספים
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              כאשר אתם ממלאים טופס יצירת קשר באתר, אנחנו אוספים את הפרטים הבאים:
            </p>
            <ul className="space-y-2 text-ink-700">
              {["שם ראשון", "מספר טלפון", "עיר מגורים"].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-samgal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-ink-700 leading-relaxed mt-4">
              בנוסף, האתר אוסף באופן אוטומטי מידע טכני בסיסי לצורך תפעול שוטף,
              כגון כתובת IP, סוג הדפדפן ושעת הגלישה.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 mb-5">
              כיצד אנחנו משתמשים בפרטים
            </h2>
            <ul className="space-y-3 text-ink-700">
              {[
                "ליצירת קשר טלפוני לצורך ייעוץ לגבי תכנון ורכישת מטבח",
                "לשליחת הצעות מחיר אישיות בהתאמה לצרכים שלכם",
                "לתיאום פגישה באולם התצוגה שלנו בחיפה",
                "לצורך שיפור השירות וחוויית הגלישה באתר",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed">
                  <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-samgal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 mb-5">
              שמירת הפרטים
            </h2>
            <p className="text-ink-700 leading-relaxed">
              הפרטים נשמרים אצלנו כל עוד אתם לקוחות פעילים, או עד שתבקשו למחוק אותם.
              ניתן לפנות אלינו בכל עת בבקשה למחיקת המידע — ונפעל בהתאם תוך 30 ימים.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 mb-5">
              שירותי צד שלישי
            </h2>
            <p className="text-ink-700 leading-relaxed mb-4">
              האתר משתמש בשירותי צד שלישי הבאים, אשר עשויים לאסוף מידע באופן עצמאי:
            </p>
            <ul className="space-y-3 text-ink-700">
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-samgal" />
                <span>
                  <strong className="text-ink-950">Google Ads</strong> — לצורך
                  מעקב המרות והערכת ביצועי קמפיינים שיווקיים.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-samgal" />
                <span>
                  <strong className="text-ink-950">Vercel</strong> — שירות
                  אחסון ואספקת תוכן (CDN) שעליו האתר רץ.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-samgal" />
                <span>
                  <strong className="text-ink-950">Resend</strong> — שירות
                  לשליחת התראות מייל פנימיות על לידים חדשים.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 mb-5">
              עוגיות (Cookies)
            </h2>
            <p className="text-ink-700 leading-relaxed">
              האתר משתמש בעוגיות בסיסיות לצורך תפעול תקין, שמירת העדפות נגישות,
              ומעקב סטטיסטי כללי. אינכם חייבים לקבל את העוגיות — אך ייתכן שחלק
              מהפונקציונליות של האתר לא יפעל כראוי בלעדיהן.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 mb-5">
              הזכויות שלכם
            </h2>
            <ul className="space-y-3 text-ink-700">
              {[
                "לבקש לעיין במידע הנשמר עליכם אצלנו",
                "לבקש לתקן או לעדכן את הפרטים",
                "לבקש למחוק את הפרטים מהמערכת שלנו",
                "לבטל הסכמה לקבלת תקשורת שיווקית",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 leading-relaxed">
                  <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-samgal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 mb-5">
              אבטחת מידע
            </h2>
            <p className="text-ink-700 leading-relaxed">
              אנחנו נוקטים אמצעי אבטחה סבירים להגנה על המידע, כולל הצפנת תקשורת
              (HTTPS) ושמירה במערכות מאובטחות. עם זאת, לא ניתן להבטיח אבטחה מוחלטת
              באינטרנט.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 mb-5">
              יצירת קשר בנושאי פרטיות
            </h2>
            <div className="bg-canvas-soft border border-ink-200 rounded-2xl p-6 sm:p-8">
              <p className="text-ink-700 leading-relaxed mb-4">
                לכל שאלה, בקשה או דיווח בנושא פרטיות:
              </p>
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
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-950 mb-5">
              שינויים במדיניות
            </h2>
            <p className="text-ink-700 leading-relaxed">
              ייתכן ונעדכן מדיניות זו מעת לעת. השינויים ייכנסו לתוקף עם פרסומם
              באתר. מומלץ לחזור ולעיין במדיניות מעת לעת.
            </p>
            <p className="text-sm text-ink-500 mt-6">עדכון אחרון: {LAST_UPDATED}.</p>
          </div>
        </section>
      </article>
    </main>
  );
}
