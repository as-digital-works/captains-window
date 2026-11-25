import { Briefcase, BookOpen, Clock, Compass, GraduationCap, Mail, MessagesSquare, Phone, PlaneTakeoff } from "lucide-react";
import { usePageMeta } from "../../hooks/usePageMeta";
import { PageBanner } from "../../components/PageBanner";
import { Reveal } from "../../components/Reveal";
import { CtaBand } from "../../components/CtaBand";
import { AddressLink } from "../../components/AddressLink";
import { WhatsAppIcon } from "../../components/icons/WhatsAppIcon";
import { allLocations, services, uaeServices } from "../../data/content";
import { external, telHref } from "../../lib/links";

const service = services.find((s) => s.id === "uae")!;
const ajman = allLocations.find((l) => l.id === "ajman-uae")!;
const icons = [Compass, BookOpen, GraduationCap, Briefcase, PlaneTakeoff, MessagesSquare];

export function UaeServicesPage() {
  usePageMeta(
    "UAE Services",
    "Captains' Window in the UAE: career advisory, DGCA ground school, flight school admissions, airline selection preparation and cabin crew pathways from our Ajman office."
  );
  const whatsapp = ajman.phone?.replace(/[^\d]/g, "");

  return (
    <>
      <PageBanner eyebrow="Services" title={<>United Arab <span className="text-gradient-red">Emirates</span></>} />

      <section className="relative py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">Ajman Office</span>
            <p className="mt-4 text-ink-600 text-base md:text-lg leading-relaxed">{service.detail}</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {uaeServices.map((s, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={s.title} delay={(i % 3) * 0.07} className="h-full">
                  <div className="card-light rounded-2xl p-7 md:p-8 h-full flex flex-col">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-white mb-5">
                      <Icon size={22} />
                    </span>
                    <h3 className="font-display text-lg md:text-xl text-navy-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-ink-600 leading-relaxed">{s.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-blue-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="card-light rounded-3xl p-7 md:p-10 grid md:grid-cols-[1.2fr_1fr] gap-8 items-start">
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-navy-900">Visit us in Ajman</h2>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                  Message the office on WhatsApp and we will arrange a counselling session at a time that suits your family.
                </p>
                {whatsapp && (
                  <a href={`https://wa.me/${whatsapp}`} {...external} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white text-sm font-semibold px-5 py-3 hover:bg-[#20bd5a] transition-colors">
                    <WhatsAppIcon size={16} /> Chat on WhatsApp
                  </a>
                )}
              </div>
              <div className="flex flex-col gap-3 text-sm text-ink-600">
                <AddressLink location={ajman} iconSize={14} className="[&>svg]:text-red-600" />
                {ajman.phone && (
                  <a href={telHref(ajman.phone)} className="flex items-center gap-2 hover:text-red-600">
                    <Phone size={14} className="shrink-0 text-red-600" /> {ajman.phone} (also WhatsApp)
                  </a>
                )}
                {ajman.email && (
                  <a href={`mailto:${ajman.email}`} className="flex items-center gap-2 hover:text-red-600">
                    <Mail size={14} className="shrink-0 text-red-600" /> {ajman.email}
                  </a>
                )}
                {ajman.hours && (
                  <p className="flex items-start gap-2">
                    <Clock size={14} className="shrink-0 mt-0.5 text-red-600" /> {ajman.hours}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
