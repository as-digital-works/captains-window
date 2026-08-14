import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { brand, contact } from "../data/content";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-[92svh] md:min-h-[100svh] flex flex-col justify-center overflow-hidden bg-navy-950 pt-28 md:pt-32 pb-16 md:pb-20"
    >
      {/* Real cockpit photograph — the site's most premium visual asset.
          Toned toward the brand's navy so it reads as "on-brand corporate"
          rather than a raw warm/orange travel photo, and darkened enough
          for the white type stacked on top to stay legible everywhere. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero/cockpit-bg.jpg)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, rgba(5,12,28,0.88) 0%, rgba(8,26,55,0.72) 40%, rgba(5,12,28,0.6) 62%, rgba(5,12,28,0.92) 100%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ background: "linear-gradient(160deg, rgba(18,51,116,0.55), rgba(5,12,28,0.25))" }}
      />
      {/* Faint blueprint dot-grid for texture, consistent with the rest of the site */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(234,240,251,0.14) 1.4px, transparent 1.4px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 65% 55% at 50% 30%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 50% 30%, black 0%, transparent 75%)",
        }}
      />

      {/* Logo + headline + CTAs */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 w-fit"
        >
          <img
            src="/logo-white.png"
            alt="Captains' Window"
            className="w-48 sm:w-56 md:w-72 h-auto drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-gradient-sky"
        >
          {brand.tagline}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact" className="btn-primary">
            Book Free Counselling
          </Link>
          <a
            href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] text-white px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#20bd5a] transition"
          >
            <WhatsAppIcon size={18} /> WhatsApp Us
          </a>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="section-label-light mt-6 block"
        >
          {brand.positioning}
        </motion.span>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="relative z-10 mt-14 flex justify-center text-white/50"
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  );
}
