import { ArrowRight, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { useFacilityModal } from "../context/FacilityModalContext";
import { allLocations } from "../data/content";

const ajman = allLocations.find((l) => l.id === "ajman-uae")!;

export function UaeFacilityHighlight() {
  const { open } = useFacilityModal();

  return (
    <section className="relative py-20 md:py-28 bg-blue-50/40">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <button
            onClick={() => open(ajman)}
            className="w-full text-left card-light rounded-3xl p-8 md:p-10 flex flex-col sm:flex-row items-start gap-6 hover:border-red-500/30 transition-colors"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-950 text-white">
              <MapPin size={24} />
            </span>
            <div className="flex-1">
              <span className="section-label">UAE Training Facility</span>
              <h3 className="font-display text-xl md:text-2xl text-navy-900 mt-3 mb-3">
                Part of This Course Takes Place in Ajman, UAE
              </h3>
              <p className="text-sm md:text-base text-ink-600 leading-relaxed">
                Our UAE facility offers &mdash;{" "}
                <span className="text-ink-400">details to be added once confirmed by the client.</span>
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-red-600 mt-4">
                View Facility Details <ArrowRight size={15} />
              </span>
            </div>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
