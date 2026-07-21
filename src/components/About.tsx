import { Reveal } from "./Reveal";
import { StatCounter } from "./StatCounter";
import { brand, stats } from "../data/content";

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-white overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-blue-100/70 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <Reveal>
          <span className="section-label">About Us</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 mb-4 text-navy-900 leading-tight">
            Crafting Future Aviators
            <span className="text-gradient-red">, One Cockpit at a Time.</span>
          </h2>
          <p className="text-red-600 font-medium tracking-wide mb-4">{brand.tagline}</p>
          <p className="text-ink-600 text-base md:text-lg leading-relaxed max-w-xl">
            At Captain&rsquo;s Window Aviation Solutions, our mission is to soar beyond the
            ordinary. We are dedicated to shaping the future of aviation by providing
            top-tier training and consultancy services that empower individuals to reach
            new heights in their careers.
          </p>
          <p className="mt-4 text-ink-400 text-sm md:text-base leading-relaxed max-w-xl">
            A team of professional trainers with extensive experience as both working
            professionals and educators in the aviation education industry — based in
            Calicut, Kerala.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            {/* window-ring motif */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full border border-navy-700/15" />
              <div className="absolute w-56 h-56 rounded-full border border-red-500/15" />
            </div>

            <div className="relative card-light rounded-3xl p-8 md:p-10 grid grid-cols-2 gap-x-6 gap-y-10">
              {stats.map((s) => (
                <StatCounter key={s.label} {...s} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
