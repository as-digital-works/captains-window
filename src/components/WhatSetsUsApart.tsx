import { Globe2, MessageSquareQuote, Route, UserCheck } from "lucide-react";
import { Reveal } from "./Reveal";
import { differentiators } from "../data/content";

const icons = [MessageSquareQuote, UserCheck, Route, Globe2];

export function WhatSetsUsApart() {
  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-label">Why Captains&rsquo; Window</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 text-navy-900">
            What Sets Us <span className="text-gradient-red">Apart</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((d, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={d.title} delay={i * 0.07} className="h-full">
                <div className="card-light rounded-2xl p-7 h-full flex flex-col">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white mb-5">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-lg text-navy-900 mb-2">{d.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">{d.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <p className="font-display text-lg md:text-xl text-navy-900">
            The flying, the exams and the interviews &mdash; we guide and support at every step.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
