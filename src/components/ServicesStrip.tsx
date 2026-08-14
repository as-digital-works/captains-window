import { Link } from "react-router-dom";
import { Compass, Building2, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { services } from "../data/content";

const icons: Record<string, typeof Compass> = {
  "pilot-training": Compass,
  consultancy: Building2,
};

export function ServicesStrip() {
  return (
    <section className="relative py-24 md:py-28 bg-navy-950">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <span className="section-label-light">What We Offer</span>
          <h2 className="font-display text-3xl md:text-4xl mt-4 text-white">
            Your Pathway Into <span className="text-gradient-sky">Aviation</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {services.map((s, i) => {
            const Icon = icons[s.id];
            return (
              <Reveal key={s.id} delay={i * 0.08}>
                <Link
                  to={s.path}
                  className="group h-full flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 hover:border-red-500/40 hover:bg-white/[0.05] transition-colors"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white mb-5">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-lg text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed flex-1">{s.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-red-400 group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={15} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
