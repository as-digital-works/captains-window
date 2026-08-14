import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { contact } from "../data/content";

const roles = ["Instructor", "Counsellor", "Other"];

function waLink(number: string, text: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export function Careers() {
  const [role, setRole] = useState(roles[0]);
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = name.trim() !== "" && contactInfo.trim() !== "";

  const applyOnWhatsApp = () => {
    const text = [
      "Hi! I'd like to apply for a role at Captains' Window.",
      `Role: ${role}`,
      `Name: ${name}`,
      `Contact: ${contactInfo}`,
      message.trim() && `Message: ${message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(contact.whatsapp, text), "_blank", "noopener");
  };

  return (
    <section className="relative py-28 md:py-36 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <span className="section-label">Careers</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 text-navy-900">
            Join Our <span className="text-gradient-red">Team</span>
          </h2>
          <p className="mt-5 text-ink-600 max-w-xl mx-auto leading-relaxed">
            We&rsquo;re always looking for experienced Instructors, Counsellors, and aviation
            professionals to join Captains&rsquo; Window. Tell us a bit about yourself and
            we&rsquo;ll get back to you.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card-light rounded-3xl p-6 md:p-8 flex flex-col gap-5">
            <div>
              <label className="text-navy-900 text-sm font-medium mb-2 block">I&rsquo;m interested in</label>
              <div className="flex flex-wrap gap-2">
                {roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                      role === r
                        ? "bg-navy-900 border-navy-900 text-white"
                        : "border-navy-900/15 text-navy-900 hover:border-navy-900/30"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-navy-900 text-sm font-medium mb-2 block">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm text-navy-900 placeholder-ink-400/60 focus:outline-none focus:border-navy-900/30"
                />
              </div>
              <div>
                <label className="text-navy-900 text-sm font-medium mb-2 block">Phone or Email</label>
                <input
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="How can we reach you?"
                  className="w-full rounded-xl border border-navy-900/15 px-4 py-3 text-sm text-navy-900 placeholder-ink-400/60 focus:outline-none focus:border-navy-900/30"
                />
              </div>
            </div>

            <div>
              <label className="text-navy-900 text-sm font-medium mb-2 block">
                Message <span className="text-ink-400 font-normal">(optional)</span>
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A short note about your experience or the role you're after..."
                className="w-full resize-none rounded-xl border border-navy-900/15 px-4 py-3 text-sm text-navy-900 placeholder-ink-400/60 focus:outline-none focus:border-navy-900/30"
              />
            </div>

            <p className="text-xs text-ink-400 leading-relaxed">
              Have a CV to share? Send it directly to{" "}
              <a href={`mailto:${contact.email}`} className="text-red-600 hover:underline">
                {contact.email}
              </a>{" "}
              referencing your application &mdash; or attach it after starting the WhatsApp chat below.
            </p>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              disabled={!canSubmit}
              onClick={applyOnWhatsApp}
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white text-sm font-semibold py-3.5 hover:bg-[#20bd5a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <WhatsAppIcon size={18} /> Apply via WhatsApp
            </motion.button>

            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent(`Application: ${role}`)}`}
              className="flex items-center justify-center gap-2 rounded-full border border-navy-900/15 text-navy-900 text-sm font-medium py-3.5 hover:bg-blue-50 transition-colors"
            >
              <Mail size={16} /> Or Apply via Email
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex items-start gap-3 text-sm text-ink-400 justify-center text-center">
          <Send size={14} className="mt-0.5 shrink-0" />
          <span>Final list of open roles and a dedicated application form are being finalized &mdash; for now, every application above reaches our team directly.</span>
        </Reveal>
      </div>
    </section>
  );
}
