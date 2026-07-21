import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Compass,
  GraduationCap,
  Medal,
  PlayCircle,
  Radar,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { Modal } from "./Modal";
import { galleryCategories } from "../data/content";

type GalleryTile =
  | { type: "photo"; src: string; caption: string }
  | { type: "video"; src: string; poster: string; caption: string }
  | { type: "placeholder"; icon: LucideIcon };

const gradients = [
  "from-navy-800 via-navy-900 to-navy-950",
  "from-red-600/30 via-navy-900 to-navy-950",
  "from-blue-500/30 via-navy-900 to-navy-950",
  "from-navy-700 via-navy-900 to-navy-950",
];

const tiles: Record<(typeof galleryCategories)[number], GalleryTile[]> = {
  "On Academy": [
    { type: "placeholder", icon: GraduationCap },
    { type: "placeholder", icon: BookOpen },
    { type: "placeholder", icon: Users },
    { type: "placeholder", icon: Compass },
  ],
  "Off Academy": [
    { type: "placeholder", icon: Radar },
    { type: "placeholder", icon: Users },
    { type: "placeholder", icon: Compass },
    { type: "placeholder", icon: Radar },
  ],
  "Epaulets Ceremony": [
    { type: "placeholder", icon: Award },
    { type: "placeholder", icon: GraduationCap },
    { type: "placeholder", icon: Award },
    { type: "placeholder", icon: GraduationCap },
  ],
  "Life at Captains' Window": [
    { type: "photo", src: "/images/ajman/reception.jpg", caption: "Reception — Ajman Office" },
    { type: "photo", src: "/images/ajman/boardroom-table.jpg", caption: "Boardroom — Ajman Office" },
    { type: "photo", src: "/images/ajman/boardroom-screen.jpg", caption: "Conference Room — Ajman Office" },
    { type: "photo", src: "/images/ajman/executive-office.jpg", caption: "Executive Office — Ajman Office" },
    { type: "photo", src: "/images/ajman/mural-hallway.jpg", caption: "Hallway — Ajman Office" },
    {
      type: "video",
      src: "/videos/office-tour.mp4",
      poster: "/images/ajman/reception.jpg",
      caption: "A Look Inside Our Ajman Office",
    },
  ],
  Achievements: [
    { type: "placeholder", icon: Trophy },
    { type: "placeholder", icon: Medal },
    { type: "placeholder", icon: Award },
    { type: "placeholder", icon: Star },
  ],
};

export function Gallery() {
  const [active, setActive] = useState<(typeof galleryCategories)[number]>(galleryCategories[0]);
  const [lightboxTile, setLightboxTile] = useState<GalleryTile | null>(null);
  const activeTiles = tiles[active];

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <span className="section-label">Gallery</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 text-navy-900">
            Life at <span className="text-gradient-red">Captains&rsquo; Window</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center gap-3 mb-12 flex-wrap">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2.5 text-xs md:text-sm tracking-wide border transition-all ${
                active === cat
                  ? "bg-red-600 text-white border-red-600 font-semibold"
                  : "border-navy-900/15 text-ink-600 hover:border-navy-900/35"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
        >
          {activeTiles.map((tile, i) => {
            const clickable = tile.type === "photo" || tile.type === "video";
            return (
              <motion.button
                key={i}
                type="button"
                disabled={!clickable}
                onClick={() => clickable && setLightboxTile(tile)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={clickable ? { scale: 1.03 } : undefined}
                className={`relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center text-left ${
                  tile.type === "placeholder" ? `bg-gradient-to-br ${gradients[i % gradients.length]}` : ""
                } ${clickable ? "cursor-pointer" : "cursor-default"}`}
              >
                {tile.type === "photo" && (
                  <>
                    <img src={tile.src} alt={tile.caption} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-navy-950/85 to-transparent">
                      <span className="text-[10px] leading-snug tracking-wide text-white/85">{tile.caption}</span>
                    </div>
                  </>
                )}
                {tile.type === "video" && (
                  <>
                    <img src={tile.poster} alt={tile.caption} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-navy-950/30 flex items-center justify-center">
                      <PlayCircle size={48} className="text-white drop-shadow-lg" strokeWidth={1.3} />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-navy-950/85 to-transparent">
                      <span className="text-[10px] leading-snug tracking-wide text-white/85">{tile.caption}</span>
                    </div>
                  </>
                )}
                {tile.type === "placeholder" && (
                  <>
                    <tile.icon size={40} className="text-white/25" strokeWidth={1.2} />
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-navy-950/80 to-transparent">
                      <span className="text-[10px] tracking-widest uppercase text-white/50">{active}</span>
                    </div>
                    <span className="absolute top-3 right-3 text-[9px] tracking-widest uppercase text-white/25">
                      Placeholder
                    </span>
                  </>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <Modal isOpen={!!lightboxTile} onClose={() => setLightboxTile(null)}>
        {lightboxTile?.type === "photo" && (
          <img src={lightboxTile.src} alt={lightboxTile.caption} className="w-full h-auto rounded-3xl" />
        )}
        {lightboxTile?.type === "video" && (
          <video
            src={lightboxTile.src}
            poster={lightboxTile.poster}
            controls
            autoPlay
            className="w-full h-auto rounded-3xl bg-navy-950"
          />
        )}
      </Modal>
    </section>
  );
}
