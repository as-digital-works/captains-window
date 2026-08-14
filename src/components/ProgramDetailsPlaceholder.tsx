import { Reveal } from "./Reveal";

const sections = [
  {
    title: "Program Overview",
    text: "Clear, realistic pathway planning with expert mentoring. We guide you through eligibility assessment, licensing pathways (India & International), budgeting, and career roadmap.",
    points: [
      "Clear and realistic career pathway planning",
      "Eligibility assessment and licensing guidance (India & International)",
      "Budget planning and structured aviation career roadmap",
    ],
  },
  {
    title: "Training Structure",
    text: "A strong theoretical foundation before flight training, with comprehensive DGCA ground subjects preparation led by experienced airline pilots.",
    points: [
      "Strong theoretical foundation before flight training",
      "DGCA ground subjects preparation",
      "Training by experienced airline pilots",
    ],
  },
  {
    title: "What's Included",
    text: "Complete admission support for flight schools in India and internationally, from documentation to visa guidance and medical assistance.",
    points: [
      "Complete admission support for India & international flight schools",
      "Documentation and application assistance",
      "Visa guidance and medical support",
    ],
  },
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
                <h3 className="font-display text-lg text-navy-900 mb-3">{s.title}</h3>
                <p className="text-sm text-ink-600 leading-relaxed mb-4">{s.text}</p>
                <ul className="flex flex-col gap-2">
                  {s.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-ink-600">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
