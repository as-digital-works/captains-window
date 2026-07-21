import { ImageIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { useFacilityModal } from "../context/FacilityModalContext";
import type { LocationEntry } from "../data/content";

export function LocationDetailCard({ location, delay = 0 }: { location: LocationEntry; delay?: number }) {
  const { open } = useFacilityModal();

  return (
    <Reveal delay={delay}>
      <button
        onClick={() => open(location)}
        className="text-left card-light rounded-2xl overflow-hidden h-full flex flex-col w-full hover:border-red-500/30 transition-colors"
      >
        <div className="relative aspect-[16/9] bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 flex items-center justify-center">
          {location.image ? (
            <img src={location.image} alt={location.name} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <>
              <ImageIcon size={32} className="text-white/25" strokeWidth={1.2} />
              <span className="absolute top-3 right-3 text-[9px] tracking-widest uppercase text-white/40">
                Photos coming soon
              </span>
            </>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <span className="inline-block self-start mb-3 rounded-full bg-red-50 border border-red-500/20 px-3 py-1 text-[10px] tracking-widest uppercase text-red-600">
            {location.categoryLabel}
          </span>
          <h3 className="font-display text-lg text-navy-900 mb-2">{location.name}</h3>
          <p className="text-sm text-ink-600 leading-relaxed flex-1">
            {location.description ?? `Details about our ${location.name} facility coming soon.`}
          </p>
        </div>
      </button>
    </Reveal>
  );
}
