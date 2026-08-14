import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Building2, ArrowRight, BookOpen, ClipboardCheck } from "lucide-react";
import { PageBanner } from "../components/PageBanner";
import { Reveal } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";
import { brand, services, courseOfferings } from "../data/content";

const icons: Record<string, typeof Compass> = {
  "pilot-training": Compass,
  consultancy: Building2,
};

const courseIcons = [Compass, BookOpen, ClipboardCheck];

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
              From career pilot training to consultancy for partner institutions
              launching their own aviation academies.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {services.map((s, i) => {
              const Icon = icons[s.id];
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

      <section className="relative py-24 md:py-32 bg-blue-50/40">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16 max-w-2xl mx-auto">
            <span className="section-label">Take Off With Us</span>
            <h2 className="font-display text-2xl md:text-4xl mt-4 mb-4 text-navy-900">Our Courses</h2>
            <p className="text-ink-600 text-base leading-relaxed">
              Specialized aviation programs designed for aspiring pilots — structured
              mentoring, ground classes, and career-focused training.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {courseOfferings.map((course, i) => {
              const Icon = courseIcons[i];
              return (
                <Reveal key={course.id} delay={i * 0.08}>
                  <div className="card-light rounded-2xl p-8 h-full flex flex-col">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950 text-white mb-6">
                      <Icon size={26} />
                    </span>
                    <h3 className="font-display text-xl text-navy-900 mb-3">{course.title}</h3>
                    <p className="text-sm text-ink-600 leading-relaxed mb-5">{course.summary}</p>
                    <ul className="mt-auto flex flex-col gap-2.5">
                      {course.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-ink-600">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
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
