import { PageBanner } from "../../components/PageBanner";
import { BadgeStrip } from "../../components/ServiceBody";
import { Courses } from "../../components/Courses";
import { UaeFacilityHighlight } from "../../components/UaeFacilityHighlight";
import { CtaBand } from "../../components/CtaBand";
import { Reveal } from "../../components/Reveal";
import { services } from "../../data/content";

const service = services.find((s) => s.id === "aviation-course")!;

export function AviationCoursePage() {
  return (
    <>
      <PageBanner eyebrow="Services" title="Aviation Course" />
      <BadgeStrip />
      <section className="bg-white pt-24 md:pt-32">
        <Reveal className="text-center max-w-2xl mx-auto px-6">
          <p className="text-ink-600 text-base md:text-lg leading-relaxed">{service.detail}</p>
        </Reveal>
      </section>
      <Courses />
      <UaeFacilityHighlight />
      <CtaBand />
    </>
  );
}
