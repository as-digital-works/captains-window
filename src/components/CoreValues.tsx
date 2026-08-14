import { ShieldCheck, HeartHandshake, Award, Handshake, Star, Globe2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { coreValues } from "../data/content";

const icons: Record<string, typeof ShieldCheck> = {
  Integrity: ShieldCheck,
  Support: HeartHandshake,
  Expertise: Award,
  Partnership: Handshake,
  Excellence: Star,
  "Global Perspective": Globe2,
};

export function CoreValues() {
  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-12 max-w-2xl mx-auto">
          <span className="section-label">Our Core Values</span>
          <h2 className="font-display text-2xl md:text-4xl mt-4 mb-4 text-navy-900">
            The Principles That <span className="text-gradient-red">Guide Everything We Do</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((v, i) => {
            const Icon = icons[v.title];
            return (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="card-light rounded-2xl p-7 h-full">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 mb-5">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-lg text-navy-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">{v.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
