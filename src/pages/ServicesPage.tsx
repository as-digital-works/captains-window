import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, GraduationCap, Building2, ArrowRight } from "lucide-react";
import { PageBanner } from "../components/PageBanner";
import { Reveal } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";
import { brand, services } from "../data/content";

const icons = [Compass, GraduationCap, Building2];

export function ServicesPage() {
  return (
    <>
      <PageBanner eyebrow="What We Offer" title="Our Services" />
      <div className="bg-navy-950 py-4 border-b border-white/5">
        <p className="text-center text-[10px] md:text-[11px] tracking-[0.3em] text-blue-100/70 uppercase px-6">
          {brand.badge}
        </p>
      </div>

      <section className="relative py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-ink-600 text-base md:text-lg leading-relaxed">
              Three pathways into aviation — from career pilot training and diploma
              programs to consultancy for partner institutions launching their own
              aviation academies.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={s.id} delay={i * 0.07}>
                  <motion.div whileHover={{ y: -6 }} className="h-full">
                    <Link
                      to={s.path}
                      className="card-light rounded-2xl p-8 h-full flex flex-col hover:border-red-500/30 transition-colors group"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950 text-white mb-6 group-hover:bg-red-600 transition-colors">
                        <Icon size={26} />
                      </span>
                      <h3 className="font-display text-xl text-navy-900 mb-2">{s.title}</h3>
                      <p className="text-sm text-ink-600 leading-relaxed flex-1">{s.summary}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-red-600 group-hover:gap-3 transition-all">
                        Explore <ArrowRight size={15} />
                      </span>
                    </Link>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
