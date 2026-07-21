import { ShieldCheck, Gauge, Award } from "lucide-react";
import { PageBanner } from "../../components/PageBanner";
import { BadgeStrip, ServiceBody } from "../../components/ServiceBody";
import { PilotRoadmap } from "../../components/PilotRoadmap";
import { ProgramDetailsPlaceholder } from "../../components/ProgramDetailsPlaceholder";
import { CtaBand } from "../../components/CtaBand";
import { Reveal } from "../../components/Reveal";
import { services } from "../../data/content";

const service = services.find((s) => s.id === "pilot-training")!;

const highlights = [
  { icon: ShieldCheck, title: "Safety-First Curriculum", text: "Every module is built around rigorous safety standards from day one." },
  { icon: Gauge, title: "Hands-On Training", text: "Real flight hours and simulator time alongside classroom instruction." },
  { icon: Award, title: "Career-Ready Outcomes", text: "Structured pathways toward commercial and private pilot careers." },
];

export function PilotTrainingPage() {
  return (
    <>
      <PageBanner eyebrow="Services" title="Pilot Training" />
      <BadgeStrip />
      <ServiceBody service={service}>
        <Reveal className="grid sm:grid-cols-3 gap-6 mb-6">
          {highlights.map((h) => (
            <div key={h.title} className="text-center px-4">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <h.icon size={24} />
              </span>
              <div className="text-navy-900 font-semibold mb-1">{h.title}</div>
              <div className="text-sm text-ink-600 leading-relaxed">{h.text}</div>
            </div>
          ))}
        </Reveal>
      </ServiceBody>
      <ProgramDetailsPlaceholder />
      <PilotRoadmap />
      <CtaBand />
    </>
  );
}
