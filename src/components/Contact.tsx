import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "./SocialIcons";
import { contact, social } from "../data/content";

function buildWhatsAppLink(number: string, form: { name: string; email: string; message: string }) {
  const text = encodeURIComponent(
    `New inquiry from captainswindow.in\n\nName: ${form.name}\nEmail: ${form.email}\nMessage: ${form.message}`
  );
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${text}`;
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // DEMO IMPLEMENTATION: pre-fills a wa.me link with the form content and
    // opens it so the user can review and send it manually — this is a
    // lightweight stand-in that requires no backend.
    //
    // FOR PRODUCTION: replace this with a call to a backend/serverless
    // function that uses the WhatsApp Business API to deliver the message
    // directly to both the India and UAE numbers without the extra manual
    // "send" click. That function would live here, e.g.:
    //   await fetch("/api/send-whatsapp", { method: "POST", body: JSON.stringify(form) });
    window.open(buildWhatsAppLink(contact.whatsapp, form), "_blank", "noopener");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="section-label">Contact Us</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 text-navy-900">
            Let&rsquo;s Start Your <span className="text-gradient-red">Journey</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10">
          <Reveal className="flex flex-col gap-6">
            <div className="card-light rounded-2xl p-6 flex items-start gap-4">
              <MapPin className="text-red-600 shrink-0 mt-1" size={20} />
              <div>
                <div className="text-navy-900 text-sm font-medium mb-1">Address</div>
                <div className="text-ink-600 text-sm leading-relaxed">{contact.address}</div>
              </div>
            </div>
            <div className="card-light rounded-2xl p-6 flex items-start gap-4">
              <Phone className="text-red-600 shrink-0 mt-1" size={20} />
              <div>
                <div className="text-navy-900 text-sm font-medium mb-1">Phone</div>
                <div className="text-ink-600 text-sm leading-relaxed">
                  {contact.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-red-600">
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="card-light rounded-2xl p-6 flex items-start gap-4">
              <MessageCircle className="text-red-600 shrink-0 mt-1" size={20} />
              <div>
                <div className="text-navy-900 text-sm font-medium mb-1">WhatsApp</div>
                <div className="text-ink-600 text-sm leading-relaxed">
                  <a
                    href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block hover:text-red-600"
                  >
                    {contact.whatsapp} (India)
                  </a>
                  {contact.whatsappUAEPending ? (
                    <span className="block text-ink-400/70">UAE number pending &mdash; to be added</span>
                  ) : (
                    <a
                      href={`https://wa.me/${contact.whatsappUAE.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block hover:text-red-600"
                    >
                      {contact.whatsappUAE} (UAE)
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="card-light rounded-2xl p-6 flex items-start gap-4">
              <Mail className="text-red-600 shrink-0 mt-1" size={20} />
              <div>
                <div className="text-navy-900 text-sm font-medium mb-1">Email</div>
                <a href={`mailto:${contact.email}`} className="text-ink-600 text-sm hover:text-red-600">
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <a href={social.facebook} target="_blank" rel="noreferrer" className="footer-icon !border-navy-900/15 !text-navy-900">
                <FacebookIcon size={16} />
              </a>
              <a href={social.instagram} target="_blank" rel="noreferrer" className="footer-icon !border-navy-900/15 !text-navy-900">
                <InstagramIcon size={16} />
              </a>
              <a href={social.twitter} className="footer-icon !border-navy-900/15 !text-navy-900">
                <TwitterIcon size={16} />
              </a>
              <a href={social.youtube} className="footer-icon !border-navy-900/15 !text-navy-900">
                <YoutubeIcon size={16} />
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden border border-navy-900/10 h-64">
              <iframe
                title="Hilite Business Park Map"
                src={contact.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="card-light rounded-3xl p-8 md:p-10 flex flex-col gap-5 bg-blue-50/40">
              <div>
                <label className="block text-xs tracking-widest uppercase text-ink-400 mb-2">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl bg-white border border-navy-900/15 px-4 py-3 text-sm text-navy-900 placeholder-ink-400/60 focus:outline-none focus:border-red-500/60"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-ink-400 mb-2">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl bg-white border border-navy-900/15 px-4 py-3 text-sm text-navy-900 placeholder-ink-400/60 focus:outline-none focus:border-red-500/60"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-ink-400 mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl bg-white border border-navy-900/15 px-4 py-3 text-sm text-navy-900 placeholder-ink-400/60 focus:outline-none focus:border-red-500/60 resize-none"
                  placeholder="Tell us about your aviation goals..."
                />
              </div>

              <motion.button whileTap={{ scale: 0.97 }} type="submit" className="btn-primary mt-2 justify-center">
                {submitted ? (
                  <>
                    <CheckCircle2 size={16} /> Opened WhatsApp
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send via WhatsApp
                  </>
                )}
              </motion.button>

              {submitted && (
                <div className="flex flex-col gap-2">
                  <p className="text-center text-xs text-ink-400">
                    Your message opened in WhatsApp (India office) &mdash; review and hit send there.
                  </p>
                  {contact.whatsappUAEPending ? (
                    <p className="text-center text-xs text-ink-400/70">
                      UAE office WhatsApp number pending &mdash; will be added once confirmed.
                    </p>
                  ) : (
                    <a
                      href={buildWhatsAppLink(contact.whatsappUAE, form)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-center text-xs font-medium text-red-600 hover:text-red-700"
                    >
                      Also send to UAE office &rarr;
                    </a>
                  )}
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
