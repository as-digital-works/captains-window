import { Reveal } from "./Reveal";
import { LocationDetailCard } from "./LocationDetailCard";
import { useFacilityModal } from "../context/FacilityModalContext";
import type { GlobeConfig } from "../data/content";

export function LocationDetailsSection({ globe, tone = "white" }: { globe: GlobeConfig; tone?: "white" | "blue" }) {
  const { open } = useFacilityModal();
  const featured = globe.locations.filter((l) => !l.deemphasized);
  const secondary = globe.locations.filter((l) => l.deemphasized);

  return (
    <section className={`relative py-16 md:py-20 ${tone === "blue" ? "bg-blue-50" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-8">
          <h3 className="font-display text-xl md:text-2xl text-navy-900">{globe.title}</h3>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((location, i) => (
            <LocationDetailCard key={location.id} location={location} delay={i * 0.05} />
          ))}
        </div>

        {secondary.length > 0 && (
          <Reveal delay={0.1} className="mt-6 text-sm text-ink-400">
            Also serving:{" "}
            {secondary.map((location, i) => (
              <span key={location.id}>
                <button
                  onClick={() => open(location)}
                  className="text-red-600 hover:text-red-700 underline underline-offset-2"
                >
                  {location.name}
                </button>
                {i < secondary.length - 1 && ", "}
              </span>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
