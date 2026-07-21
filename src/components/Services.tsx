import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, GraduationCap, Building2, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { brand, services } from "../data/content";

const icons = [Compass, GraduationCap, Building2];

export function Services() {
  const [active, setActive] = useState(0);
  const Icon = icons[active];
  const svc = services[active];

  return (
    <section id="services" className="relative py-28 md:py-36 bg-navy-950">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-6">
          <span className="section-label-light">What We Offer</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 text-white">
            Three Pathways Into <span className="text-gradient-sky">Aviation</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="text-center mb-16">
          <p className="text-[11px] tracking-[0.25em] text-blue-100/60 uppercase">{brand.badge}</p>
        </Reveal>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-stretch">
          <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {services.map((s, i) => {
              const ItemIcon = icons[i];
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all ${
                    isActive
                      ? "border-red-500/50 bg-red-600/10"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      isActive ? "bg-red-600 text-white" : "bg-white/10 text-blue-100"
                    }`}
                  >
                    <ItemIcon size={20} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm md:text-base font-medium text-white">
                      {s.title}
                    </span>
                    <span className="block text-xs text-white/45 mt-0.5">{s.summary}</span>
                  </span>
                  <ChevronRight
                    size={16}
                    className={`shrink-0 transition-transform ${
                      isActive ? "translate-x-1 text-red-400" : "text-white/30"
                    }`}
                  />
                </button>
              );
            })}
          </Reveal>

          <Reveal delay={0.15}>
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel h-full rounded-3xl p-8 md:p-12 flex flex-col justify-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white mb-6">
                <Icon size={30} />
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-white mb-4">{svc.title}</h3>
              <p className="text-white/60 leading-relaxed mb-6">{svc.detail}</p>

              {svc.sub && (
                <div className="grid sm:grid-cols-2 gap-4 mt-2 mb-6">
                  {svc.sub.map((s) => (
                    <div key={s.title} className="rounded-xl border border-white/10 p-4">
                      <div className="text-sm font-semibold text-blue-100 mb-1">{s.title}</div>
                      <div className="text-xs text-white/50 leading-relaxed">{s.text}</div>
                    </div>
                  ))}
                </div>
              )}

              <Link
                to={svc.path}
                className="inline-flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                Learn more <ArrowRight size={15} />
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
