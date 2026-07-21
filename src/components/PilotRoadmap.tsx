import { Reveal } from "./Reveal";

const steps = [
  {
    title: "Academic Verification",
    text: "We verify your 10th and 12th mark sheets — especially Physics and Maths — to confirm eligibility before training begins.",
  },
  {
    title: "Medical Clearance",
    text: "Clear your DGCA Class 2 and Class 1 medical examinations to meet the health standards required for a commercial pilot.",
  },
  {
    title: "Ground Classes",
    text: "Complete CPL theory covering Air Navigation, Air Regulations, Air Meteorology, Technical General, and RTR.",
    tags: ["Air Navigation", "Air Regulations", "Air Meteorology", "Technical General", "RTR"],
  },
  {
    title: "Flight Training",
    text: "Log a minimum of 200 flying hours at a partner flying facility in India or abroad.",
  },
  {
    title: "Airline Preparation",
    text: "Prepare for airline selection with simulator sessions, technical and HR interview coaching, and aptitude training.",
  },
];

export function PilotRoadmap() {
  return (
    <section className="relative py-20 md:py-28 bg-blue-50/40">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <span className="section-label">The Journey</span>
          <h2 className="font-display text-2xl md:text-4xl mt-4 text-navy-900">
            How to Become a <span className="text-gradient-red">Pilot</span>
          </h2>
        </Reveal>

        <div className="flex flex-col gap-5">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="card-light rounded-2xl p-6 flex gap-5 items-start">
                <span className="font-display text-2xl text-red-500/40 shrink-0 w-10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-navy-900 font-semibold mb-1.5">{step.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">{step.text}</p>
                  {step.tags && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {step.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-navy-950/5 border border-navy-900/10 px-3 py-1 text-[11px] text-navy-900/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
