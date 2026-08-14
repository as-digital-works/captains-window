import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { faqs } from "../data/content";

export function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-20 md:py-28 bg-blue-50/40">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="section-label">FAQs</span>
          <h2 className="font-display text-2xl md:text-4xl mt-4 text-navy-900">
            Questions Future Pilots <span className="text-gradient-red">Ask Us</span>
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-start gap-4 py-5 border-b border-navy-900/10 text-left group"
                >
                  <span className="flex-1">
                    <span
                      className={`block text-base md:text-lg font-medium transition-colors ${
                        isOpen ? "text-red-600" : "text-navy-900 group-hover:text-navy-900/80"
                      }`}
                    >
                      {item.q}
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      className="block overflow-hidden text-sm text-ink-600 leading-relaxed"
                    >
                      <span className="block pt-3 pr-6">{item.a}</span>
                    </motion.span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy-900/15 text-ink-400"
                  >
                    <Plus size={14} />
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
