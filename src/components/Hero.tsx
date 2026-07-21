import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import { SkyLayer } from "./SkyLayer";
import { Hero3DScene } from "./Hero3DScene";
import { HeroFallback } from "./HeroFallback";
import { useIsLitePreferred } from "../hooks/useIsLitePreferred";
import { useIsMobile } from "../hooks/useIsMobile";
import { brand, contact } from "../data/content";

export function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const lite = useIsLitePreferred();
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = setInterval(() => setTaglineIndex((v) => (v === 0 ? 1 : 0)), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative h-[100svh] w-full overflow-hidden bg-navy-950">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] rounded-full bg-blue-500/10 blur-3xl" />

      <SkyLayer showClouds={lite} />
      {lite ? (isMobile ? null : <HeroFallback />) : <Hero3DScene />}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/30 via-transparent to-navy-950" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-navy-950/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="section-label-light mb-5"
        >
          {brand.positioning}
        </motion.span>

        <motion.h1
          key={taglineIndex}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] max-w-4xl text-gradient-sky"
        >
          {brand.taglines[taglineIndex]}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 max-w-xl text-white/65 text-base md:text-lg"
        >
          Calicut, Kerala &middot; Pilot training institute &amp; aviation education consultancy
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a href={`tel:${contact.phones[0].replace(/\s/g, "")}`} className="btn-primary">
            <Phone size={16} /> Call Now
          </a>
          <a
            href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/25 text-white px-7 py-3.5 text-sm tracking-wide hover:bg-white/10 transition backdrop-blur-sm"
          >
            <MessageCircle size={16} /> WhatsApp Us
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  );
}
