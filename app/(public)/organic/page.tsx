import type { Metadata } from "next";
import Hero from "@/components/Hero";
import WhySamgal from "@/components/WhySamgal";
import StylesGallery from "@/components/StylesGallery";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "סמגל מטבחים | מטבחי יוקרה בעיצוב אישי בחיפה",
  description:
    "תכנון אישי, ייצור ישראלי, אולם תצוגה פיזי בחיפה. השאירו פרטים לייעוץ ללא עלות.",
  alternates: { canonical: "/organic" },
};

export default function OrganicPage() {
  return (
    <main className="relative">
      <Hero source="organic_hero" />
      <WhySamgal />
      <StylesGallery />
      <HowItWorks />
      <FinalCTA source="organic_final" />
    </main>
  );
}
