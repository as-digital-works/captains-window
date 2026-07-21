import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { testimonials } from "../data/content";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonials[index];

  return (
    <section className="relative py-28 md:py-36 bg-white overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-700/15 to-transparent" />
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <span className="section-label">Testimonials</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 text-navy-900">
            Words From Our <span className="text-gradient-red">Students</span>
          </h2>
        </Reveal>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="mx-auto text-navy-700/20 mb-6" size={40} />

          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="text-lg md:text-2xl leading-relaxed text-navy-900/90 font-sans font-normal max-w-3xl mx-auto">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white font-semibold text-sm">
                {t.name[0]}
              </span>
              <span className="text-sm tracking-wide text-navy-700 font-medium">{t.name}</span>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={() => setIndex((v) => (v - 1 + testimonials.length) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/15 text-ink-400 hover:border-red-500/50 hover:text-red-600 transition"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-red-600" : "w-1.5 bg-navy-900/15"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setIndex((v) => (v + 1) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/15 text-ink-400 hover:border-red-500/50 hover:text-red-600 transition"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
