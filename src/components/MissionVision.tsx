import { Target, Eye } from "lucide-react";
import { Reveal } from "./Reveal";
import { brand } from "../data/content";

export function MissionVision() {
  return (
    <section className="relative py-20 md:py-28 bg-blue-50/40">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        <Reveal>
          <div className="card-light rounded-3xl p-8 md:p-10 h-full">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-950 text-white mb-6">
              <Target size={26} />
            </span>
            <h3 className="font-display text-2xl text-navy-900 mb-3">Our Mission</h3>
            <p className="text-ink-600 leading-relaxed">{brand.mission}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card-light rounded-3xl p-8 md:p-10 h-full">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white mb-6">
              <Eye size={26} />
            </span>
            <h3 className="font-display text-2xl text-navy-900 mb-3">Our Vision</h3>
            <p className="text-ink-600 leading-relaxed">{brand.vision}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
