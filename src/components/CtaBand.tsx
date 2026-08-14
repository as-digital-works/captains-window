import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { contact } from "../data/content";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

export function CtaBand() {
  return (
    <section className="relative py-24 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-blue-500/10" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto px-6 text-center"
      >
        <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
          Ready to <span className="text-gradient-sky">take off</span>?
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Talk to our team about pilot training, diploma programs, or partnering with us
          on an aviation academy of your own.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" className="btn-primary">
            Contact Us <ArrowRight size={16} />
          </Link>
          <a
            href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] text-white px-7 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#20bd5a] transition"
          >
            <WhatsAppIcon size={18} /> WhatsApp Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}
