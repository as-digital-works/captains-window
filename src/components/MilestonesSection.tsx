import { Plane, UserRound } from "lucide-react";
import { Reveal } from "./Reveal";
import { milestoneCategories, type Achiever, type MilestoneCategory } from "../data/milestones";

function AchieverCard({ achiever, icon }: { achiever: Achiever; icon: MilestoneCategory["icon"] }) {
  const Icon = icon === "plane" ? Plane : UserRound;
  return (
    <article className="group card-light rounded-xl sm:rounded-2xl p-2 sm:p-4 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10 hover:border-red-500/30">
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        {achiever.photo ? (
          <img
            src={achiever.photo}
            alt={achiever.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-400 border border-dashed border-navy-900/15 rounded-xl">
            <Icon className="size-6 sm:size-8" strokeWidth={1.3} />
            <span className="text-[8px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase text-center px-1.5">
              Student photograph
            </span>
          </div>
        )}
      </div>
      <div className="pt-2.5 sm:pt-4 px-0.5 sm:px-1 pb-1">
        <h4 className={`font-display text-[13px] sm:text-base leading-snug ${achiever.placeholder ? "text-ink-400" : "text-navy-900"}`}>
          {achiever.name}
        </h4>
        {achiever.detail && (
          <p className="mt-1 text-[11px] sm:text-sm leading-snug text-red-600 font-medium">{achiever.detail}</p>
        )}
      </div>
    </article>
  );
}

export function MilestonesSection({ tone = "blue" }: { tone?: "white" | "blue" }) {
  return (
    <section id="milestones" className={`relative py-20 md:py-28 scroll-mt-24 ${tone === "blue" ? "bg-blue-50" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-14">
          <span className="section-label inline-flex items-center gap-3">
            <span className="h-0.5 w-8 bg-red-600 rounded-full" aria-hidden />
            Student Success
            <span className="h-0.5 w-8 bg-red-600 rounded-full" aria-hidden />
          </span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 text-navy-900">
            Milestones of <span className="text-gradient-red">Success</span>
          </h2>
        </Reveal>

        <div className="space-y-16 md:space-y-20">
          {milestoneCategories.map((cat, ci) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-28">
              <Reveal className="max-w-3xl mb-8">
                <h3 className="font-display text-xl md:text-2xl text-navy-900 flex items-baseline gap-3">
                  <span className="text-red-600 tabular-nums">{String(ci + 1).padStart(2, "0")}</span>
                  {cat.title}
                </h3>
                <p className="mt-3 text-ink-600 leading-relaxed">{cat.description}</p>
              </Reveal>
              <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-5">
                {cat.achievers.map((a, i) => (
                  <Reveal key={`${a.name}-${i}`} delay={(i % 4) * 0.06} className="h-full">
                    <AchieverCard achiever={a} icon={cat.icon} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
