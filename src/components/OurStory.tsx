import { Reveal } from "./Reveal";
import { brand } from "../data/content";

export function OurStory() {
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.95fr_1.05fr] gap-16 items-center">
        <Reveal className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <img
              src="/images/about/cadets-walking.jpg"
              alt="Captains' Window cadets"
              className="rounded-2xl w-full h-56 object-cover"
            />
            <img
              src="/images/about/office-reception.jpg"
              alt="Captains' Window office reception"
              className="rounded-2xl w-full h-40 object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 mt-8">
            <img
              src="/images/about/cadets-reception.jpg"
              alt="Captains' Window cadets at reception"
              className="rounded-2xl w-full h-64 object-cover"
            />
            <img
              src="/images/about/cadets-garden.jpg"
              alt="Captains' Window cadets"
              className="rounded-2xl w-full h-36 object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="section-label">Our Story</span>
          <h2 className="font-display text-2xl md:text-4xl mt-4 mb-5 text-navy-900 leading-tight">
            From Aspiration to <span className="text-gradient-red">Aviation Career</span>
          </h2>
          <p className="text-ink-600 text-base leading-relaxed whitespace-pre-line">{brand.story}</p>
        </Reveal>
      </div>
    </section>
  );
}
