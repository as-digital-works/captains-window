import { Reveal } from "./Reveal";
import { journey } from "../data/content";

export function OurJourney() {
  return (
    <section id="our-journey" className="relative py-20 md:py-28 bg-navy-950 overflow-hidden scroll-mt-24">
      <div className="absolute -top-32 right-0 w-[32rem] h-[32rem] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-14">
          <span className="section-label-light">Our Journey</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 text-white">
            The Years That <span className="text-gradient-sky">Made Us</span>
          </h2>
        </Reveal>

        <ol className="relative border-l border-white/15 ml-3 md:ml-0 md:border-l-0">
          {/* Centre line on desktop */}
          <span className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/15" aria-hidden />
          {journey.map((item, i) => {
            const right = i % 2 === 1;
            return (
              <li key={item.year} className="relative pl-8 pb-10 last:pb-0 md:pl-0 md:grid md:grid-cols-2 md:gap-12">
                <span
                  className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-red-600 ring-4 ring-navy-950 md:left-1/2 md:-translate-x-1/2"
                  aria-hidden
                />
                <Reveal delay={0.05} className={right ? "md:col-start-2" : "md:text-right"}>
                  <div className="font-display text-2xl md:text-3xl text-red-500">{item.year}</div>
                  <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">{item.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
