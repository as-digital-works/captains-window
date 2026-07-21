import type { ReactNode } from "react";
import { ShieldCheck, FileText, Users2, Scale, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { brand, type Service } from "../data/content";

const subIcons = [ShieldCheck, FileText, Users2, Scale, Compass];

export function BadgeStrip() {
  return (
    <div className="bg-navy-950 py-4 border-b border-white/5">
      <p className="text-center text-[10px] md:text-[11px] tracking-[0.3em] text-blue-100/70 uppercase px-6">
        {brand.badge}
      </p>
    </div>
  );
}

export function ServiceBody({
  service,
  children,
}: {
  service: Service;
  children?: ReactNode;
}) {
  return (
    <section className="relative py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <p className="text-ink-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {service.detail}
          </p>
        </Reveal>

        {service.sub && (
          <Reveal delay={0.1} className="grid sm:grid-cols-2 gap-6 mb-14">
            {service.sub.map((s, i) => {
              const Icon = subIcons[i % subIcons.length];
              return (
                <div key={s.title} className="card-light rounded-2xl p-6 flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-white">
                    <Icon size={20} />
                  </span>
                  <div>
                    <div className="text-navy-900 font-semibold mb-1">{s.title}</div>
                    <div className="text-sm text-ink-600 leading-relaxed">{s.text}</div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        )}

        {children}

        <Reveal delay={0.15} className="text-center mt-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 text-navy-900 text-sm font-medium px-6 py-3 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition"
          >
            Enquire About This Program <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
