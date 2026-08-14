import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";
import { brand, contact, nav, social } from "../data/content";

export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/10">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-center sm:text-left">
          <p className="text-sm text-white/70">
            <span className="text-red-500 font-semibold">We&rsquo;re Hiring</span> &mdash; Instructors, Counsellors &amp; more.
          </p>
          <Link
            to="/careers"
            className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-red-500 transition-colors shrink-0"
          >
            View Careers <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-3">
        <div>
          <img src="/logo-white.png" alt="Captains' Window" className="h-14 w-auto" />
          <p className="mt-3 text-xs font-display font-extrabold tracking-wide text-white/90">{brand.tagline}</p>
          <p className="mt-4 text-sm text-white/50 leading-relaxed">{brand.positioning}</p>
          <div className="flex gap-3 mt-6">
            <a href={social.facebook} target="_blank" rel="noreferrer" className="footer-icon" title="Facebook" aria-label="Facebook">
              <FacebookIcon size={16} />
            </a>
            <a href={social.instagram} target="_blank" rel="noreferrer" className="footer-icon" title="Instagram (India)" aria-label="Instagram (India)">
              <InstagramIcon size={16} />
            </a>
            <a href={social.instagramUAE} target="_blank" rel="noreferrer" className="footer-icon" title="Instagram (UAE)" aria-label="Instagram (UAE)">
              <InstagramIcon size={16} />
            </a>
            <a href={social.youtube} target="_blank" rel="noreferrer" className="footer-icon" title="YouTube" aria-label="YouTube">
              <YoutubeIcon size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-red-500 text-xs tracking-[0.25em] uppercase mb-4">Navigate</h4>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-sm text-white/60 hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-red-500 text-xs tracking-[0.25em] uppercase mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>{contact.phones.join(" / ")}</li>
            <li className="flex items-start gap-1.5">
              <WhatsAppIcon size={14} className="text-[#25D366] shrink-0 mt-0.5" />
              <span>
                {contact.whatsapp} (India)
                {!contact.whatsappUAEPending && ` / ${contact.whatsappUAE} (UAE)`}
                {contact.whatsappUAEPending && " · UAE number pending"}
              </span>
            </li>
            <li>{contact.email}</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/35">
        © {new Date().getFullYear()} Captains&rsquo; Window Group. All rights reserved.
      </div>
      </div>
    </footer>
  );
}
