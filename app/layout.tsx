import type { Metadata } from "next";
import { Heebo, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import CookieBanner from "@/components/CookieBanner";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import ContactButtons from "@/components/ContactButtons";
import Header from "@/components/Header";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-heebo",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const GTAG_ID = "AW-814762867";

export const metadata: Metadata = {
  title: "סמגל מטבחים | מטבחי יוקרה בעיצוב אישי · חיפה",
  description:
    "תכנון אישי, ייצור ישראלי, שואורום פיזי בחיפה. השאירו פרטים לייעוץ ללא עלות ונחזור אליכם תוך 24 שעות.",
  openGraph: {
    title: "סמגל מטבחים | מטבחי יוקרה בעיצוב אישי",
    description: "תכנון אישי. ייצור ישראלי. שואורום פיזי בחיפה.",
    type: "website",
    locale: "he_IL",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${mono.variable}`}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTAG_ID}');
          `}
        </Script>
      </head>
      <body className="font-sans bg-canvas text-ink-950 antialiased">
        <Header />
        {children}
        <CookieBanner />
        <AccessibilityWidget />
        <ContactButtons />
      </body>
    </html>
  );
}
