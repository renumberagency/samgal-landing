import CookieBanner from "@/components/CookieBanner";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import ContactButtons from "@/components/ContactButtons";
import Header from "@/components/Header";
import Tracker from "@/components/Tracker";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <CookieBanner />
      <AccessibilityWidget />
      <ContactButtons />
      <Tracker />
    </>
  );
}
