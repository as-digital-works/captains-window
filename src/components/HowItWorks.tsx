import { MessageCircle, Users, PlaneTakeoff, Award } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  { icon: MessageCircle, title: "Enquire", text: "Reach out via WhatsApp or our contact form." },
  { icon: Users, title: "Counselling", text: "A free session to map out your path." },
  { icon: PlaneTakeoff, title: "Training", text: "Hands-on flight & ground instruction." },
  { icon: Award, title: "Certified Pilot", text: "Graduate, ready for the cockpit." },
];

export function HowItWorks() {
  return (
    <section className="relative py-24 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="section-label">How It Works</span>
          <h2 className="font-display text-3xl md:text-4xl mt-4 text-navy-900">
            Your Path to the <span className="text-gradient-red">Cockpit</span>
          </h2>
        </Reveal>

        <div className="relative grid grid-cols-1 sm:grid-cols-4 gap-8 sm:gap-4">
          <div className="hidden sm:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-navy-900/10" />

          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 0.1}
              className="relative flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0"
            >
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white border-2 border-red-500/30 text-red-600 sm:mb-4">
                <step.icon size={22} />
              </span>
              <div>
                <div className="text-[10px] tracking-widest uppercase text-red-600/70 mb-1 sm:hidden">
                  Step {i + 1}
                </div>
                <h3 className="font-display text-base md:text-lg text-navy-900">{step.title}</h3>
                <p className="text-xs md:text-sm text-ink-400 mt-1 max-w-[160px] sm:mx-auto">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
