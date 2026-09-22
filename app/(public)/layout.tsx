import CookieBanner from "@/components/CookieBanner";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import ContactButtons from "@/components/ContactButtons";
import Header from "@/components/Header";
import Tracker from "@/components/Tracker";
import { SaleBar } from "@/components/Sale";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SaleBar />
      <Header />
      {children}
      <CookieBanner />
      <AccessibilityWidget />
      <ContactButtons />
      <Tracker />
    </>
  );
}
