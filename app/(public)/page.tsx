import Hero from "@/components/Hero";
import WhySamgal from "@/components/WhySamgal";
import StylesGallery from "@/components/StylesGallery";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";
import { SaleBar, SaleSection } from "@/components/Sale";

export default function HomePage() {
  return (
    <main className="relative">
      <SaleBar />
      <Hero />
      <SaleSection />
      <WhySamgal />
      <StylesGallery />
      <HowItWorks />
      <FinalCTA />
    </main>
  );
}
