import { ArrowRight, BookOpenText, CheckCircle2, ExternalLink, FileCheck2, GraduationCap, MonitorSmartphone, Stethoscope } from "lucide-react";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { computerNumber, dgcaLinks, examRequirements, prerequisites } from "../data/dgca";
import { contact } from "../data/content";
import { external } from "../lib/links";

function SubjectList({ items, light = false }: { items: readonly string[]; light?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {items.map((s) => (
        <li key={s} className={`flex items-center gap-2.5 text-sm ${light ? "text-white/80" : "text-ink-600"}`}>
          <GraduationCap size={15} className="shrink-0 text-red-500" /> {s}
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
  return (
    <Reveal className="text-center mb-12 max-w-2xl mx-auto">
      <span className="section-label">{eyebrow}</span>
      <h2 className="font-display text-3xl md:text-4xl mt-4 text-navy-900">
        {title} <span className="text-gradient-red">{accent}</span>
      </h2>
    </Reveal>
  );
}

export function DgcaExamRequirements() {
  const { india, abroad } = examRequirements;
  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Know Your Papers" title="DGCA Exam" accent="Requirements" />
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy-950 p-7 md:p-12">
            <img src="/images/hero/cockpit-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-navy-950/60 via-navy-950/80 to-navy-950" />
            <div className="relative grid gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <h3 className="font-display text-xl text-white mb-5">{india.title}</h3>
                <SubjectList items={india.subjects} light />
              </div>
              <div>
                <h3 className="font-display text-xl text-white mb-5">{abroad.title}</h3>
                <div className="grid gap-8 sm:grid-cols-2">
                  {abroad.groups.map((g) => (
                    <div key={g.title}>
                      <div className="text-sm font-semibold text-white">{g.title}</div>
                      <div className="text-xs text-white/50 mb-4">{g.note}</div>
                      <SubjectList items={g.subjects} light />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const prereqIcons = { "computer-number": BookOpenText, medicals: Stethoscope, egca: MonitorSmartphone } as const;

export function DgcaPrerequisites() {
  return (
    <section className="relative py-20 md:py-28 bg-blue-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Before You Fly" title="DGCA Prerequisite" accent="Stages" />
        <div className="grid gap-6 md:grid-cols-3">
          {prerequisites.map((p, i) => {
            const Icon = prereqIcons[p.id as keyof typeof prereqIcons] ?? FileCheck2;
            return (
              <Reveal key={p.id} delay={i * 0.07} className="h-full">
                <div className="card-light rounded-2xl p-7 h-full">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-white mb-5">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-lg text-navy-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-6">
          <div className="card-light rounded-2xl p-7 grid gap-6 md:grid-cols-[16rem_1fr] md:items-center">
            <div>
              <h3 className="font-display text-lg text-navy-900">DGCA Important Links</h3>
              <p className="mt-1 text-xs text-ink-400">Official Directorate General of Civil Aviation websites</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {dgcaLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} {...external} className="group inline-flex items-center gap-2 text-sm text-navy-900 hover:text-red-600">
                    <CheckCircle2 size={15} className="shrink-0 text-red-600" />
                    {l.label}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function DgcaComputerNumber() {
  const wa = contact.whatsapp.replace(/[^\d]/g, "");
  const msg = encodeURIComponent("Hi Captains' Window, I'd like help applying for my DGCA Computer Number.");
  return (
    <section id="dgca-computer-number" className="relative py-20 md:py-28 bg-white scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="section-label">Step One</span>
          <h2 className="font-display text-3xl md:text-4xl mt-4 text-navy-900">
            DGCA Computer Number <span className="text-gradient-red">Process</span>
          </h2>
          <p className="mt-5 text-ink-600 leading-relaxed">{computerNumber.intro}</p>
          <p className="mt-4 text-ink-600 leading-relaxed">{computerNumber.detail}</p>
          <a
            href={`https://wa.me/${wa}?text=${msg}`}
            {...external}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white text-sm font-semibold px-6 py-3 hover:bg-[#20bd5a] transition-colors"
          >
            <WhatsAppIcon size={16} /> Get Started on WhatsApp <ArrowRight size={15} />
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <ol className="relative space-y-4">
            {computerNumber.steps.map((s, i) => (
              <li key={s.title} className="card-light rounded-2xl p-5 flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-white text-sm font-semibold tabular-nums">
                  {i + 1}
                </span>
                <div>
                  <div className="font-semibold text-navy-900">{s.title}</div>
                  <p className="mt-1 text-sm text-ink-600 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
