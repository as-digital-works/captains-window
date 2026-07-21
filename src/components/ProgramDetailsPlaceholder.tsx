import { Reveal } from "./Reveal";

const sections = [
  { title: "Program Overview", note: "A summary of the full pilot training program will go here." },
  { title: "Training Structure", note: "Module-by-module breakdown of the training timeline will go here." },
  { title: "What's Included", note: "Ground classes, flight hours, equipment, and support details will go here." },
];

export function ProgramDetailsPlaceholder() {
  return (
    <section className="relative py-20 md:py-28 bg-white border-t border-navy-900/5">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="section-label">Program Details</span>
          <h2 className="font-display text-2xl md:text-4xl mt-4 text-navy-900">
            What&rsquo;s in the <span className="text-gradient-red">Program</span>
          </h2>
        </Reveal>

        <div className="grid gap-5">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="card-light rounded-2xl p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <h3 className="font-display text-lg text-navy-900">{s.title}</h3>
                  <span className="rounded-full bg-navy-950/5 border border-navy-900/10 px-3 py-1 text-[10px] tracking-widest uppercase text-ink-400">
                    Details to be added
                  </span>
                </div>
                <p className="text-sm text-ink-400 leading-relaxed">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
