import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, ImageIcon, Map as MapIcon, MapPin, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { AddressLink } from "./AddressLink";
import { InstagramIcon } from "./SocialIcons";
import { useFacilityModal } from "../context/FacilityModalContext";
import type { LocationEntry } from "../data/content";
import { external, mapEmbedSrc, telHref } from "../lib/links";

export function LocationDetailCard({ location, delay = 0 }: { location: LocationEntry; delay?: number }) {
  const { open } = useFacilityModal();
  const [mapOpen, setMapOpen] = useState(false);
  const hasFooter = !!location.address || location.category === "ground-training";
  const mapId = `map-${location.id}`;

  return (
    // Card spans 3 rows of the parent grid (image · body · footer) via subgrid, so the
    // image, description and address/phone blocks line up across every card in a row.
    <Reveal delay={delay} className="row-span-3 grid grid-rows-subgrid gap-y-0">
      <article
        id={`location-${location.id}`}
        className="row-span-3 grid grid-rows-subgrid gap-y-0 card-light rounded-2xl overflow-hidden w-full hover:border-red-500/30 transition-colors scroll-mt-28"
      >
        <button
          type="button"
          onClick={() => open(location)}
          aria-label={`View details about ${location.name}`}
          className="relative block aspect-[16/9] w-full shrink-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 overflow-hidden group"
        >
          {location.image ? (
            <img
              src={location.image}
              alt={location.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center">
              <ImageIcon size={32} className="text-white/25" strokeWidth={1.2} />
              <span className="absolute top-3 right-3 text-[9px] tracking-widest uppercase text-white/40">
                Photos coming soon
              </span>
            </span>
          )}
        </button>

        <div className="px-6 pt-6 flex flex-col">
          <span className="inline-block self-start mb-3 rounded-full bg-red-50 border border-red-500/20 px-3 py-1 text-[10px] tracking-widest uppercase text-red-600">
            {location.categoryLabel}
          </span>
          <h3 className="font-display text-lg text-navy-900 mb-2">
            <button type="button" onClick={() => open(location)} className="text-left hover:text-red-600 transition-colors">
              {location.name}
            </button>
          </h3>
          <p className="text-sm text-ink-600 leading-relaxed">
            {location.description ?? `Details about our ${location.name} facility coming soon.`}
          </p>
          <button
            type="button"
            onClick={() => open(location)}
            className="mt-3 self-start inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
          >
            View details <ArrowRight size={12} />
          </button>
        </div>

        <div className="px-6 pb-6">
          {hasFooter && (
            <div className="mt-4 pt-4 border-t border-navy-900/10 text-xs text-ink-400 space-y-2">
              {location.address ? (
                <AddressLink location={location} />
              ) : (
                <div className="flex items-start gap-2 italic">
                  <MapPin size={13} className="shrink-0 mt-0.5" />
                  <span>Address and contact number to be added</span>
                </div>
              )}
              {location.phone && (
                <a href={telHref(location.phone)} className="flex items-center gap-2 hover:text-red-600 transition-colors">
                  <Phone size={13} className="shrink-0" />
                  <span>{location.phone}</span>
                </a>
              )}
              {location.instagram && (
                <a
                  href={location.instagram}
                  {...external}
                  className="flex items-center gap-2 hover:text-red-600 transition-colors"
                >
                  <InstagramIcon size={13} className="shrink-0" />
                  <span>Instagram – {location.name.split(",")[0]}</span>
                </a>
              )}

              {location.showMapEmbed && location.address && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setMapOpen((v) => !v)}
                    aria-expanded={mapOpen}
                    aria-controls={mapId}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-red-600 transition-colors"
                  >
                    <MapIcon size={13} /> {mapOpen ? "Hide map" : "View on map"}
                    <ChevronDown size={13} className={`transition-transform ${mapOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mapOpen && (
                      <motion.div
                        id={mapId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <iframe
                          title={`Map — ${location.name}`}
                          src={mapEmbedSrc(location.address)}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="mt-3 w-full aspect-[4/3] rounded-xl border border-navy-900/10"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}
