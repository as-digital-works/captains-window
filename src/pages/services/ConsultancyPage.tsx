import { BadgeCheck } from "lucide-react";
import { PageBanner } from "../../components/PageBanner";
import { BadgeStrip, ServiceBody } from "../../components/ServiceBody";
import { FreeConsultancyBanner } from "../../components/FreeConsultancyBanner";
import { CtaBand } from "../../components/CtaBand";
import { Reveal } from "../../components/Reveal";
import { services } from "../../data/content";

const service = services.find((s) => s.id === "consultancy")!;

export function ConsultancyPage() {
  return (
    <>
      <PageBanner eyebrow="Services" title="Aviation Education Consultancy" />
      <BadgeStrip />
      <FreeConsultancyBanner />
      <ServiceBody service={service}>
        <Reveal delay={0.12} className="mb-4">
          <div className="card-light rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start gap-4 bg-blue-50/40">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-white">
              <BadgeCheck size={20} />
            </span>
            <div>
              <div className="text-navy-900 font-semibold mb-1">IATA & Non-IATA Certified Courses</div>
              <div className="text-sm text-ink-600 leading-relaxed">
                Alongside institutional consultancy, we offer IATA and non-IATA certified
                courses for individuals and partner academies looking to raise their
                credentialing standards.
              </div>
            </div>
          </div>
        </Reveal>
      </ServiceBody>
      <CtaBand />
    </>
  );
}
