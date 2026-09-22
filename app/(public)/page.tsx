import Hero from "@/components/Hero";
import WhySamgal from "@/components/WhySamgal";
import StylesGallery from "@/components/StylesGallery";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";
import { SaleSection } from "@/components/Sale";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <SaleSection />
      <WhySamgal />
      <StylesGallery />
      <HowItWorks />
      <FinalCTA />
    </main>
  );
}
