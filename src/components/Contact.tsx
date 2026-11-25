import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { AddressLink } from "./AddressLink";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { allLocations, contact, social } from "../data/content";
import { external, mapEmbedSrc, mapsHref, telHref } from "../lib/links";

const offices = allLocations.filter((l) => l.category === "ground-training");
const gurgaon = offices.find((o) => o.id === "gurgaon-india");

function waLink(number: string, text: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

const DEFAULT_MESSAGE = "Hi! I'd like to know more about Captains' Window.";

const quickReplies = [
  "I'm interested in Pilot Training",
  "Tell me about the Aviation Course",
  "I'd like a free consultancy call",
];

type WhatsAppTab = { id: string; label: string; number: string | null };

const whatsappTabs: WhatsAppTab[] = [
  { id: "calicut", label: "Calicut, Kerala", number: contact.whatsapp },
  { id: "gurgaon", label: "Gurgaon, India", number: "+91 7034 41 6000" },
  { id: "uae", label: "UAE (Ajman)", number: contact.whatsappUAEPending ? null : contact.whatsappUAE },
];

export function Contact() {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState(whatsappTabs[0].id);

  const sendTo = (number: string) => {
    window.open(waLink(number, message.trim() || DEFAULT_MESSAGE), "_blank", "noopener");
  };

  const currentTab = whatsappTabs.find((t) => t.id === activeTab)!;

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
              <WhatsAppIcon className="text-[#25D366] shrink-0 mt-1" size={20} />
              <div>
                <div className="text-navy-900 text-sm font-medium mb-1">WhatsApp</div>
                <div className="text-ink-600 text-sm leading-relaxed">
                  {whatsappTabs.map((tab) =>
                    tab.number ? (
                      <a
                        key={tab.id}
                        href={`https://wa.me/${tab.number.replace(/\D/g, "")}`}
                        {...external}
                        className="block hover:text-red-600"
                      >
                        {tab.label}: {tab.number}
                      </a>
                    ) : (
                      <span key={tab.id} className="block text-ink-400/70">
                        {tab.label}: number pending &mdash; to be added
                      </span>
                    )
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
              <a href={social.facebook} {...external} className="footer-icon !border-navy-900/15 !text-navy-900" title="Facebook" aria-label="Facebook">
                <FacebookIcon size={16} />
              </a>
              <a href={social.instagram} {...external} className="footer-icon !border-navy-900/15 !text-navy-900" title="Instagram (India)" aria-label="Instagram (India)">
                <InstagramIcon size={16} />
              </a>
              {social.instagramGurgaon && (
                <a href={social.instagramGurgaon} {...external} className="footer-icon !border-navy-900/15 !text-navy-900" title="Instagram – Gurgaon" aria-label="Instagram – Gurgaon">
                  <InstagramIcon size={16} />
                </a>
              )}
              <a href={social.instagramUAE} {...external} className="footer-icon !border-navy-900/15 !text-navy-900" title="Instagram (UAE)" aria-label="Instagram (UAE)">
                <InstagramIcon size={16} />
              </a>
              <a href={social.youtube} {...external} className="footer-icon !border-navy-900/15 !text-navy-900" title="YouTube" aria-label="YouTube">
                <YoutubeIcon size={16} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-3xl overflow-hidden border border-navy-900/10 shadow-xl shadow-black/5 flex flex-col">
              <div className="bg-[#075E54] px-6 py-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/logo.png" alt="Captains' Window" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Captains&rsquo; Window</div>
                  <div className="text-white/70 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Usually replies within an hour
                  </div>
                </div>
              </div>

              <div className="flex-1 px-5 py-6 flex flex-col gap-3 bg-[#e5ddd5]">
                <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-ink-700 shadow-sm">
                  Hi there! 👋 How can we help with your aviation journey today?
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setMessage(q)}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/80 border border-navy-900/10 text-navy-900 hover:bg-white transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white px-4 py-4 flex flex-col gap-3 border-t border-navy-900/5">
                <div className="flex flex-wrap gap-2">
                  {whatsappTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        activeTab === tab.id
                          ? "bg-navy-900 border-navy-900 text-white"
                          : "border-navy-900/15 text-navy-900 hover:border-navy-900/30"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full resize-none rounded-xl bg-[#f0f0f0] px-4 py-3 text-sm text-navy-900 placeholder-ink-400/60 focus:outline-none"
                />
                {currentTab.number ? (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => sendTo(currentTab.number!)}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white text-sm font-semibold py-3 hover:bg-[#20bd5a] transition-colors"
                  >
                    <WhatsAppIcon size={16} /> Chat on WhatsApp ({currentTab.label})
                  </motion.button>
                ) : (
                  <p className="text-center text-[11px] text-ink-400/70">
                    WhatsApp number for {currentTab.label} pending &mdash; use the phone or email above for now.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-20">
          <h3 className="text-center font-display text-xl md:text-2xl text-navy-900 mb-8">Our Offices</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div key={office.id} className="card-light rounded-2xl p-6 flex flex-col gap-3 text-sm text-ink-600">
                <div className="text-navy-900 font-semibold">{office.name}</div>
                <AddressLink location={office} iconSize={14} className="[&>svg]:text-red-600" />
                {(office.contactPhones ?? (office.phone ? [office.phone] : [])).map((p) => (
                  <a key={p} href={telHref(p)} className="flex items-center gap-2 hover:text-red-600">
                    <Phone size={14} className="shrink-0 text-red-600" />
                    {p}
                  </a>
                ))}
                {office.email && (
                  <a href={`mailto:${office.email}`} className="flex items-center gap-2 hover:text-red-600">
                    <Mail size={14} className="shrink-0 text-red-600" />
                    {office.email}
                  </a>
                )}
                {office.hours && (
                  <p className="flex items-start gap-2">
                    <Clock size={14} className="shrink-0 mt-0.5 text-red-600" />
                    {office.hours}
                  </p>
                )}
                {office.instagram && (
                  <a href={office.instagram} {...external} className="flex items-center gap-2 hover:text-red-600">
                    <InstagramIcon size={14} className="shrink-0 text-red-600" />
                    Instagram – {office.name.split(",")[0]}
                  </a>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {gurgaon?.address && (
          <Reveal delay={0.1} className="mt-12">
            <div className="rounded-3xl overflow-hidden border border-navy-900/10 shadow-xl shadow-black/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-6 py-4 bg-blue-50 border-b border-navy-900/10">
                <div>
                  <div className="text-navy-900 font-semibold text-sm">Find us in Gurgaon</div>
                  <div className="text-xs text-ink-400">{gurgaon.address}</div>
                </div>
                <a
                  href={mapsHref(gurgaon)}
                  {...external}
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700"
                >
                  <MapPin size={13} /> Open in Google Maps
                </a>
              </div>
              <iframe
                title="Map — Captains' Window Gurgaon office"
                src={mapEmbedSrc(gurgaon.address)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full h-72 md:h-96 border-0"
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
