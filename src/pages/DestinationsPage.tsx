import { PageBanner } from "../components/PageBanner";
import { GlobeSection } from "../components/GlobeSection";
import { LocationDetailsSection } from "../components/LocationDetailsSection";
import { CtaBand } from "../components/CtaBand";
import { globes } from "../data/content";
import { useScrollToHash } from "../hooks/useScrollToHash";

export function DestinationsPage() {
  useScrollToHash();

  return (
    <>
      <PageBanner eyebrow="Where We Fly" title="Partner Destinations" />

      {globes.map((globe, i) => (
        <GlobeSection key={globe.id} globe={globe} tone={i % 2 === 0 ? "white" : "blue"} />
      ))}

      {globes.map((globe, i) => (
        <LocationDetailsSection key={globe.id} globe={globe} tone={i % 2 === 0 ? "blue" : "white"} />
      ))}

      <CtaBand />
    </>
  );
}
