import { usePageMeta } from "../hooks/usePageMeta";
import { PageBanner } from "../components/PageBanner";
import { Careers } from "../components/Careers";

export function CareersPage() {
  usePageMeta("Careers", "Join Captains' Window — we're hiring instructors, counsellors and more.");
  return (
    <>
      <PageBanner eyebrow="Join Us" title="Careers" />
      <Careers />
    </>
  );
}
