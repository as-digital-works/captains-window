import { useRef } from "react";
import { BookMarked, ChevronLeft, ChevronRight, CloudSun, Cog, Compass, Headset, Plane, Target } from "lucide-react";
import { Reveal } from "./Reveal";
import { courseStructure, cplSubjects } from "../data/dgca";

const subjectIcons = { cloud: CloudSun, book: BookMarked, compass: Compass, cog: Cog, radio: Headset, plane: Plane } as const;

/** "DGCA CPL Subjects We Cover" — swipeable cards with arrows. */
export function CplSubjectsSlider() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * (card ? card.offsetWidth + 24 : el.clientWidth), behavior: "smooth" });
  };

  return (
    <section id="cpl-subjects" className="relative py-20 md:py-28 bg-blue-50/60 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12 max-w-2xl mx-auto">
          <span className="section-label">Ground School</span>
          <h2 className="font-display text-3xl md:text-4xl mt-4 text-navy-900">
            DGCA CPL Subjects <span className="text-gradient-red">We Cover</span>
          </h2>
        </Reveal>

        <div className="relative">
          <div
            ref={track}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {cplSubjects.map((s) => {
              const Icon = subjectIcons[s.icon];
              return (
                <article
                  key={s.id}
                  className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] card-light rounded-2xl overflow-hidden flex flex-col"
                >
                  <div className="relative h-36 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute -right-8 -bottom-10 h-40 w-40 rounded-full border border-white/10" />
                    <div className="absolute -left-6 -top-12 h-32 w-32 rounded-full border border-red-500/20" />
                    <Icon size={52} strokeWidth={1.2} className="relative text-white" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="h-1 w-10 rounded-full bg-red-600" />
                    <h3 className="mt-4 font-display text-xl text-navy-900">{s.title}</h3>
                    <p className="mt-2 text-sm text-ink-600 leading-relaxed">{s.text}</p>
                    <ul className="mt-5 space-y-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-ink-600">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous subjects"
            className="flex absolute -left-2 sm:-left-4 top-16 h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow ring-1 ring-navy-900/10 hover:text-red-600"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next subjects"
            className="flex absolute -right-2 sm:-right-4 top-16 h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow ring-1 ring-navy-900/10 hover:text-red-600"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

/** "Course Structure & Training Model". */
export function CourseStructure() {
  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12 max-w-2xl mx-auto">
          <span className="section-label">How We Train</span>
          <h2 className="font-display text-3xl md:text-4xl mt-4 text-navy-900">
            Course Structure &amp; <span className="text-gradient-red">Training Model</span>
          </h2>
          <p className="mt-4 text-ink-600 leading-relaxed">{courseStructure.intro}</p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] items-start">
          <div className="relative border-l-2 border-red-600/30 pl-6 sm:pl-8 space-y-10">
            {courseStructure.blocks.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <div>
                  <h3 className="flex items-center gap-3 font-display text-xl text-navy-900">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-white text-sm tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {b.title}
                  </h3>
                  {"text" in b && b.text && <p className="mt-3 text-sm text-ink-600 leading-relaxed">{b.text}</p>}
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {b.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-ink-600">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <aside className="card-light rounded-3xl p-7 lg:sticky lg:top-28">
              <h3 className="flex items-center gap-2 font-display text-lg text-navy-900">
                <Target size={20} className="text-red-600" /> Who Can Join
              </h3>
              <ul className="mt-4 space-y-2.5">
                {courseStructure.whoCanJoin.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm text-ink-600">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" /> {w}
                  </li>
                ))}
              </ul>
              <blockquote className="mt-6 border-l-4 border-red-600 bg-blue-50/70 rounded-r-xl px-4 py-3 text-sm text-navy-900 leading-relaxed">
                {courseStructure.promise}
              </blockquote>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
