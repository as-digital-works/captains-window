import { Link } from "react-router-dom";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "./SocialIcons";
import { brand, contact, nav, social } from "../data/content";

export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-4">
        <div>
          <img src="/logo.png" alt="Captains' Window" className="h-11 w-auto" />
          <p className="mt-3 text-xs font-display font-extrabold tracking-wide text-white/90">{brand.tagline}</p>
          <p className="mt-4 text-sm text-white/50 leading-relaxed">{brand.positioning}</p>
          <div className="flex gap-3 mt-6">
            <a href={social.facebook} target="_blank" rel="noreferrer" className="footer-icon">
              <FacebookIcon size={16} />
            </a>
            <a href={social.instagram} target="_blank" rel="noreferrer" className="footer-icon">
              <InstagramIcon size={16} />
            </a>
            <a href={social.twitter} className="footer-icon">
              <TwitterIcon size={16} />
            </a>
            <a href={social.youtube} className="footer-icon">
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
            <li>{contact.address}</li>
            <li>{contact.phones.join(" / ")}</li>
            <li>
              WhatsApp: {contact.whatsapp} (India)
              {!contact.whatsappUAEPending && ` / ${contact.whatsappUAE} (UAE)`}
              {contact.whatsappUAEPending && " · UAE number pending"}
            </li>
            <li>{contact.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-red-500 text-xs tracking-[0.25em] uppercase mb-4">Sitemap</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Home · About Us · Services · Destinations · Gallery · Testimonials · Contact Us
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/35">
        © {new Date().getFullYear()} Captains&rsquo; Window Aviation Solutions. All rights reserved. · Demo pitch site.
      </div>
    </footer>
  );
}
