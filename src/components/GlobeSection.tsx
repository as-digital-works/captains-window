import { Reveal } from "./Reveal";
import { LocationGlobe } from "./LocationGlobe";
import type { GlobeConfig } from "../data/content";

export function GlobeSection({ globe, tone = "white" }: { globe: GlobeConfig; tone?: "white" | "blue" }) {
  return (
    <section className={`relative py-20 md:py-28 ${tone === "blue" ? "bg-blue-50" : "bg-white"}`}>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <span className="section-label">{globe.eyebrow}</span>
          <h2 className="font-display text-2xl md:text-4xl mt-4 mb-3 text-navy-900">{globe.title}</h2>
          <p className="text-ink-400 max-w-xl mx-auto text-sm md:text-base mb-10">{globe.description}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-navy-950 overflow-hidden">
            <LocationGlobe locations={globe.locations} />
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-6">
          <p className="text-xs tracking-widest uppercase text-ink-400">
            Drag to rotate &middot; Scroll or pinch to zoom &middot; Click a pin for details
          </p>
        </Reveal>
      </div>
    </section>
  );
}
