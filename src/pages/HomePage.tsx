import { Hero } from "../components/Hero";
import { StatsBar } from "../components/StatsBar";
import { ServicesStrip } from "../components/ServicesStrip";
import { Testimonials } from "../components/Testimonials";
import { HomeGlobePreview } from "../components/HomeGlobePreview";
import { HowItWorks } from "../components/HowItWorks";
import { CtaBand } from "../components/CtaBand";

export function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesStrip />
      <HomeGlobePreview />
      <Testimonials />
      <HowItWorks />
      <CtaBand />
    </>
  );
}
