import Hero from "@/components/Hero";
import WhySamgal from "@/components/WhySamgal";
import StylesGallery from "@/components/StylesGallery";
import SaleDayStands from "@/components/SaleDayStands";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <WhySamgal />
      <StylesGallery />
      <SaleDayStands />
      <HowItWorks />
      <FinalCTA />
    </main>
  );
}
