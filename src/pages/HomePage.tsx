import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { Testimonials } from "../components/Testimonials";
import { HomeGlobePreview } from "../components/HomeGlobePreview";
import { CtaBand } from "../components/CtaBand";

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <HomeGlobePreview />
      <CtaBand />
    </>
  );
}
