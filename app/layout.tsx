import type { Metadata } from "next";
import { Heebo, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "סמגל מטבחים | ימי מכירות — 26% הנחה על כל מטבח | 26-29 במאי",
  description:
    "26% הנחה על כל מטבח. 4 ימים בלבד. לא על שאריות מלאי — על כל סגנון, כל מידה. ביום שישי 29.05 בשעה 16:00 החלון נסגר.",
  openGraph: {
    title: "סמגל מטבחים | 26% הנחה — 4 ימים בלבד",
    description: "ימי המכירות של סמגל מטבחים. 26-29 במאי. 26% הנחה על כל מטבח.",
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
        {children}
      </body>
    </html>
  );
}
