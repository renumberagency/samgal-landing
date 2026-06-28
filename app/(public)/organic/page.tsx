import type { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "סמגל מטבחים | ייעוץ ללא עלות · מטבחי יוקרה בחיפה",
  description:
    "תכנון אישי, ייצור ישראלי, אולם תצוגה בחיפה. השאירו פרטים ונחזור אליכם תוך 24 שעות.",
  alternates: { canonical: "/organic" },
};

const TRUST = [
  "ייעוץ ללא עלות",
  "נחזור תוך 24 שעות",
  "ללא התחייבות",
];

export default function OrganicPage() {
  return (
    <main className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-black leading-tight text-ink-950 mb-3 text-balance">
            המטבח <span className="text-samgal">הבא</span> שלכם —
            <br />
            מתחיל בשיחה אחת.
          </h1>
          <p className="text-base text-ink-700">
            תכנון אישי · ייצור ישראלי · אולם תצוגה בחיפה
          </p>
        </div>

        <div className="bg-canvas-pure border border-ink-200 rounded-2xl p-6 sm:p-7 shadow-card">
          <LeadForm
            source="organic"
            ctaLabel="דברו איתי"
            microcopy="נחזור אליכם תוך 24 שעות לייעוץ ללא עלות"
          />
        </div>

        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6">
          {TRUST.map((t) => (
            <li
              key={t}
              className="flex items-center gap-1.5 text-sm text-ink-700"
            >
              <span className="text-samgal font-bold">✓</span>
              {t}
            </li>
          ))}
        </ul>

        <footer className="mt-10 pt-6 border-t border-ink-200 text-center text-ink-500 text-xs space-y-2">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span>📍 שדרות ההסתדרות 20, חיפה</span>
            <a href="tel:*6158" className="hover:text-samgal transition-colors">
              📞 *6158
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
            <Link href="/accessibility" className="hover:text-samgal transition-colors">
              הצהרת נגישות
            </Link>
            <span className="text-ink-300">·</span>
            <Link href="/privacy" className="hover:text-samgal transition-colors">
              מדיניות פרטיות
            </Link>
            <span className="text-ink-300">·</span>
            <a
              href="https://renumber-agency.co.il/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-samgal transition-colors"
            >
              נבנה ע&quot;י Renumber Agency
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
