import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { diplomas } from "../data/content";

export function Courses() {
  const [open, setOpen] = useState(0);

  return (
    <section id="courses" className="relative py-28 md:py-36 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="section-label">Aviation Course</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 text-navy-900">
            Diploma Programs Built for <span className="text-gradient-red">Industry</span>
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {diplomas.map((d, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={d} delay={i * 0.05}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center gap-6 py-6 border-b border-navy-900/10 text-left group"
                >
                  <span className="font-display text-2xl md:text-3xl text-navy-900/15 group-hover:text-red-500/50 transition-colors w-12 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block text-lg md:text-xl transition-colors ${
                        isOpen ? "text-red-600" : "text-navy-900/85 group-hover:text-navy-900"
                      }`}
                    >
                      {d}
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      className="block overflow-hidden text-sm text-ink-600 leading-relaxed"
                    >
                      <span className="block pt-3 pr-6">
                        Structured coursework and hands-on modules designed to build
                        industry-ready skills for this specialization, delivered by
                        trainers with real-world aviation experience.
                      </span>
                    </motion.span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy-900/15 text-ink-400"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
