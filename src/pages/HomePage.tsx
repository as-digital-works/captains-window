import { Hero } from "../components/Hero";
import { StatsBar } from "../components/StatsBar";
import { ServicesStrip } from "../components/ServicesStrip";
import { Testimonials } from "../components/Testimonials";
import { HomeGlobePreview } from "../components/HomeGlobePreview";
import { HowItWorks } from "../components/HowItWorks";
import { CtaBand } from "../components/CtaBand";
import { NewsSection } from "../components/NewsSection";
import { MilestonesSection } from "../components/MilestonesSection";
import { usePageMeta } from "../hooks/usePageMeta";

export function HomePage() {
  usePageMeta();
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesStrip />
      <HomeGlobePreview />
      <Testimonials />
      <MilestonesSection />
      <HowItWorks />
      <NewsSection />
      <CtaBand />
    </>
  );
}
