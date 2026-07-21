import { Mail, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { contact } from "../data/content";

export function FreeConsultancyBanner() {
  return (
    <section className="relative py-12 md:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="rounded-3xl bg-gradient-to-br from-red-600 to-red-700 p-8 md:p-10 text-center shadow-lg shadow-red-600/20">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-[11px] tracking-widest uppercase text-white mb-4">
              No Cost to You
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-white mb-3">
              This Consultancy Service Is Free of Cost
            </h3>
            <p className="text-white/85 max-w-xl mx-auto mb-6 text-sm md:text-base leading-relaxed">
              Reach out today to discuss launching or improving your aviation academy &mdash;
              no fees, no obligation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${contact.phones[0].replace(/\s/g, "")}`}
                className="flex items-center gap-2 rounded-full bg-white text-red-600 font-semibold px-6 py-3 text-sm hover:brightness-95 transition"
              >
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/40 text-white px-6 py-3 text-sm hover:bg-white/10 transition"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 rounded-full border border-white/40 text-white px-6 py-3 text-sm hover:bg-white/10 transition"
              >
                <Mail size={16} /> Email
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
