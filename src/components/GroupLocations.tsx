import { Reveal } from "./Reveal";
import { useFacilityModal } from "../context/FacilityModalContext";
import { allLocations } from "../data/content";

const groupLocations = allLocations.filter((l) => l.category === "ground-training");

export function GroupLocations() {
  const { open } = useFacilityModal();

  return (
    <section className="relative py-20 md:py-28 bg-blue-50/40">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="section-label">Captains&rsquo; Window Group</span>
          <h2 className="font-display text-2xl md:text-4xl mt-4 text-navy-900">
            One Team, <span className="text-gradient-red">Multiple Locations</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-6">
          {groupLocations.map((location, i) => (
            <Reveal key={location.id} delay={i * 0.08}>
              <button
                onClick={() => open(location)}
                className="text-left card-light rounded-2xl overflow-hidden h-full flex flex-col w-full hover:border-red-500/30 transition-colors"
              >
                <div className="relative aspect-[16/10] bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950">
                  {location.image && (
                    <img src={location.image} alt={location.name} className="absolute inset-0 h-full w-full object-cover" />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="inline-block self-start mb-3 rounded-full bg-red-50 border border-red-500/20 px-3 py-1 text-[10px] tracking-widest uppercase text-red-600">
                    {location.categoryLabel}
                  </span>
                  <h3 className="font-display text-lg text-navy-900 mb-2">{location.name}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed flex-1">{location.highlight}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
