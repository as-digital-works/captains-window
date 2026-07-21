import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { PageBanner } from "../components/PageBanner";
import { Reveal } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";
import { testimonials } from "../data/content";

export function TestimonialsPage() {
  return (
    <>
      <PageBanner eyebrow="What Students Say" title="Testimonials" />
      <section className="relative py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="card-light rounded-2xl p-7 h-full flex flex-col"
              >
                <Quote className="text-red-500/30 mb-4" size={28} />
                <p className="text-ink-600 text-sm md:text-base leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white font-semibold text-sm">
                    {t.name[0]}
                  </span>
                  <span className="text-sm tracking-wide text-navy-900 font-medium">{t.name}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
