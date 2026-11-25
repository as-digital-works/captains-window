import { StatCounter } from "./StatCounter";
import { stats } from "../data/content";

export function StatsBar() {
  return (
    <section className="relative bg-navy-950 py-8 md:py-10 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-8">
        {stats.map((s) => (
          <div key={s.label} className="border-l border-white/10 odd:border-l-0 md:odd:border-l md:first:border-l-0">
            <StatCounter {...s} light />
          </div>
        ))}
      </div>
    </section>
  );
}
