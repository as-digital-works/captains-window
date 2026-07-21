import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { LocationGlobe } from "./LocationGlobe";
import { globes } from "../data/content";

export function HomeGlobePreview() {
  const flagship = globes[0];

  return (
    <section className="relative py-28 md:py-36 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <span className="section-label">Where We Fly</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 mb-4 text-navy-900">
            A Global <span className="text-gradient-red">Footprint</span>
          </h2>
          <p className="text-ink-400 max-w-xl mx-auto text-sm md:text-base mb-10">
            Drag to explore a few of the regions we operate and partner in — from
            flight training facilities to our associated flying academy.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-navy-950 overflow-hidden">
            <LocationGlobe locations={flagship.locations} />
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <Link to="/destinations" className="btn-primary">
            Explore All Destinations <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
