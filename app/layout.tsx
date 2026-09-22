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
const FB_PIXEL_ID = "1739820090131295";

export const metadata: Metadata = {
  title: "סמגל מטבחים | מטבחי יוקרה בעיצוב אישי · חיפה",
  description:
    "תכנון אישי, ייצור ישראלי, אולם תצוגה פיזי בחיפה. השאירו פרטים לייעוץ ללא עלות ונחזור אליכם תוך 24 שעות.",
  openGraph: {
    title: "סמגל מטבחים | מטבחי יוקרה בעיצוב אישי",
    description: "תכנון אישי. ייצור ישראלי. אולם תצוגה פיזי בחיפה.",
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
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="font-sans bg-canvas text-ink-950 antialiased">
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
