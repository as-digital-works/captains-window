import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Home hero background slider. Add or reorder slides here.
 * Images live in public/images/hero/slides/: a 1920×1080 .webp for desktop and a
 * 900×1200 "-m.webp" crop for phones. `mobileOnly` slides (e.g. vertical phone videos)
 * only show on phone screens, where they fill the screen without looking blurry.
 */
type Slide = { id: string; caption: string; video?: string; poster?: string; mobileOnly?: boolean };

const slides: Slide[] = [
  { id: "cockpit", caption: "A clear view for the pilot in you" },
  { id: "cadets-airfield", caption: "Our cadets at the airfield" },
  { id: "ground-class", caption: "DGCA ground classes in session — Gurgaon" },
  {
    id: "calicut-video",
    caption: "Life at our Calicut campus",
    video: "/videos/hero-calicut.mp4",
    poster: "/images/hero/slides/calicut-video-poster.webp",
    mobileOnly: true,
  },
  { id: "cadets-aircraft", caption: "Flight training with experienced instructors" },
  { id: "gurgaon-reception", caption: "Captains' Window Gurgaon" },
  { id: "simulator", caption: "Simulator and airline preparation" },
  { id: "ajman-reception", caption: "Captains' Window Ajman, UAE" },
  { id: "cadet-aircraft", caption: "Every flight begins with clarity" },
];

const SLIDE_MS = 6000;
const src = (id: string, mobile = false) => `/images/hero/slides/${id}${mobile ? "-m" : ""}.webp`;

function useIsPhone() {
  const query = "(max-width: 767px)";
  const [phone, setPhone] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setPhone(mq.matches);
    on(); // the window may have been resized between first render and this effect
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return phone;
}

export function HeroSlider() {
  const phone = useIsPhone();
  const list = slides.filter((s) => phone || !s.mobileOnly);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = list[index % list.length];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % list.length), current.video ? 10000 : SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, list.length, current.video]);

  // Preload the next slide's image so the crossfade never shows a blank frame.
  useEffect(() => {
    const next = list[(index + 1) % list.length];
    if (next.video) return;
    const img = new Image();
    img.src = src(next.id, phone);
  }, [index, list, phone]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <AnimatePresence initial={false}>
          <motion.div
            key={current.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            {current.video ? (
              <video
                src={current.video}
                poster={current.poster}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <motion.picture
                className="block h-full w-full"
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: SLIDE_MS / 1000 + 1.2, ease: "linear" }}
              >
                <source media="(max-width: 767px)" srcSet={src(current.id, true)} />
                <img
                  src={src(current.id)}
                  alt=""
                  className="h-full w-full object-cover"
                  fetchPriority={index === 0 ? "high" : "auto"}
                />
              </motion.picture>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Caption + slide dots */}
      <div
        className="absolute bottom-5 inset-x-0 z-10 px-6 flex flex-col items-center gap-3"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="text-[11px] tracking-[0.2em] uppercase text-white/70"
          >
            {current.caption}
          </motion.p>
        </AnimatePresence>
        <div className="flex gap-2" role="tablist" aria-label="Hero slides">
          {list.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index % list.length}
              aria-label={`Show slide ${i + 1}: ${s.caption}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index % list.length ? "w-7 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
