import { PageBanner } from "../components/PageBanner";
import { About } from "../components/About";
import { OurStory } from "../components/OurStory";
import { MissionVision } from "../components/MissionVision";
import { CoreValues } from "../components/CoreValues";
import { GroupLocations } from "../components/GroupLocations";

export function AboutPage() {
  return (
    <>
      <PageBanner eyebrow="About Us" title="Who We Are" />
      <About />
      <OurStory />
      <MissionVision />
      <CoreValues />
      <GroupLocations />
    </>
  );
}
