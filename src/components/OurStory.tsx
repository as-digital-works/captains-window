import { Reveal } from "./Reveal";
import { brand } from "../data/content";

/** Swap `src` for new client photos here; `position` keeps faces in frame when cropped. */
const collage = [
  { src: "/images/about/cadets-walking.jpg", alt: "Captains' Window cadets", span: "col-start-1 row-start-1 row-span-3", position: "object-[center_15%]" },
  { src: "/images/about/office-reception.jpg", alt: "Captains' Window office reception", span: "col-start-1 row-start-4 row-span-2", position: "object-[center_45%]" },
  { src: "/images/about/cadets-reception.jpg", alt: "Captains' Window cadets at reception", span: "col-start-2 row-start-1 row-span-2", position: "object-[center_30%]" },
  { src: "/images/about/cadets-garden.jpg", alt: "Captains' Window cadets", span: "col-start-2 row-start-3 row-span-3", position: "object-[center_40%]" },
];

export function OurStory() {
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.95fr_1.05fr] gap-16 items-center">
        {/* 2 × 5 grid: left column 3+2 rows, right column 2+3 rows — equal gaps, flush top & bottom edges. */}
        <Reveal className="grid grid-cols-2 grid-rows-5 gap-3 sm:gap-4 aspect-[4/5] sm:aspect-square">
          {collage.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className={`${img.span} h-full w-full min-h-0 rounded-2xl object-cover ${img.position}`}
            />
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <span className="section-label">Our Story</span>
          <h2 className="font-display text-2xl md:text-4xl mt-4 mb-5 text-navy-900 leading-tight">
            From Aspiration to <span className="text-gradient-red">Aviation Career</span>
          </h2>
          <p className="text-ink-600 text-base leading-relaxed whitespace-pre-line">{brand.story}</p>
        </Reveal>
      </div>
    </section>
  );
}
