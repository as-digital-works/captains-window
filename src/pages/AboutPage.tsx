import { usePageMeta } from "../hooks/usePageMeta";
import { PageBanner } from "../components/PageBanner";
import { About } from "../components/About";
import { OurStory } from "../components/OurStory";
import { MissionVision } from "../components/MissionVision";
import { WhatSetsUsApart } from "../components/WhatSetsUsApart";
import { OurJourney } from "../components/OurJourney";
import { CoreValues } from "../components/CoreValues";
import { GroupLocations } from "../components/GroupLocations";

export function AboutPage() {
  usePageMeta("About Us", "Learn about Captains' Window — from aspiring pilots to aviation careers. Our story, mission, vision and the team guiding cadets in India and the UAE.");
  return (
    <>
      <PageBanner eyebrow="About Us" title="Who We Are" />
      <About />
      <OurStory />
      <WhatSetsUsApart />
      <OurJourney />
      <MissionVision />
      <CoreValues />
      <GroupLocations />
    </>
  );
}
