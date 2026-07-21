import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function PageBanner({ eyebrow, title }: { eyebrow: string; title: ReactNode }) {
  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 bg-navy-950 border-b border-white/5 overflow-hidden text-center">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[20rem] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-red-600/5 blur-3xl pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative px-6"
      >
        <span className="section-label-light">{eyebrow}</span>
        <h1 className="font-display text-4xl md:text-6xl mt-4 text-white">{title}</h1>
      </motion.div>
    </section>
  );
}
