import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, PlayCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { Modal } from "./Modal";

type GalleryLocation = "calicut" | "gurgaon" | "ajman" | "other";

type GalleryTile = { caption: string; location?: GalleryLocation } & (
  | { type: "photo"; src: string }
  | { type: "video"; src: string; poster?: string }
  /** Empty slot shown until the client's media arrives. Not clickable. */
  | { type: "placeholder" }
);

const galleryTabs = ["Life at Captains Window", "FAQs", "Testimonials"] as const;
type GalleryTab = (typeof galleryTabs)[number];

const locationFilters = [
  { id: "all", label: "All" },
  { id: "calicut", label: "Calicut" },
  { id: "gurgaon", label: "Gurgaon" },
  { id: "ajman", label: "Ajman" },
] as const;
type LocationFilter = (typeof locationFilters)[number]["id"];

/*
 * To add the client's Gurgaon media: run scripts/optimize-media.ps1, then replace the
 * `placeholder` tiles below with e.g.
 *   { type: "photo", location: "gurgaon", src: "/images/gallery/gurgaon/gurgaon-01.webp", caption: "Gurgaon Office" },
 *   { type: "video", location: "gurgaon", src: "/videos/gallery/gurgaon/gurgaon-video-01.mp4",
 *     poster: "/images/gallery/gurgaon/gurgaon-video-01.webp", caption: "Gurgaon Office" },
 */
const albums: Record<GalleryTab, GalleryTile[]> = {
  "Life at Captains Window": [
    { type: "photo", location: "calicut", src: "/images/gallery/calicut/calicut-01.jpg", caption: "Calicut Facility" },
    { type: "photo", location: "calicut", src: "/images/gallery/calicut/calicut-02.jpg", caption: "Calicut Facility" },
    { type: "photo", location: "calicut", src: "/images/gallery/calicut/calicut-03.jpg", caption: "Calicut Facility" },
    {
      type: "video",
      location: "calicut",
      src: "/videos/gallery/calicut/calicut-video-01.mp4",
      poster: "/images/gallery/calicut/calicut-01.jpg",
      caption: "Life at Our Calicut Campus",
    },
    {
      type: "video",
      location: "calicut",
      src: "/videos/gallery/calicut/calicut-video-02.mp4",
      poster: "/images/gallery/calicut/calicut-02.jpg",
      caption: "Calicut Campus Event",
    },
    {
      type: "video",
      location: "gurgaon",
      src: "/videos/gallery/life/life-video-03.mp4",
      poster: "/images/gallery/life/life-video-03.jpg",
      caption: "Inside Our Gurgaon Office",
    },
    // PLACEHOLDER: Gurgaon photos/videos from the client go here.
    { type: "placeholder", location: "gurgaon", caption: "Gurgaon Office" },
    { type: "placeholder", location: "gurgaon", caption: "Gurgaon Office" },
    { type: "placeholder", location: "gurgaon", caption: "Gurgaon Office" },
    { type: "photo", location: "ajman", src: "/images/ajman/reception.jpg", caption: "Reception — Ajman Office" },
    { type: "photo", location: "ajman", src: "/images/ajman/boardroom-table.jpg", caption: "Boardroom — Ajman Office" },
    { type: "photo", location: "ajman", src: "/images/ajman/boardroom-screen.jpg", caption: "Conference Room — Ajman Office" },
    { type: "photo", location: "ajman", src: "/images/ajman/executive-office.jpg", caption: "Executive Office — Ajman Office" },
    { type: "photo", location: "ajman", src: "/images/ajman/mural-hallway.jpg", caption: "Hallway — Ajman Office" },
    {
      type: "video",
      location: "ajman",
      src: "/videos/office-tour.mp4",
      poster: "/images/ajman/reception.jpg",
      caption: "A Look Inside Our Ajman Office",
    },
    { type: "photo", location: "other", src: "/images/gallery/life/serbia-01.jpg", caption: "Cadets — Serbia Flying Facility" },
    { type: "photo", location: "other", src: "/images/gallery/life/serbia-02.jpg", caption: "Serbia Flying Facility" },
    { type: "photo", location: "other", src: "/images/gallery/life/serbia-03.jpg", caption: "Cadets — Serbia Flying Facility" },
    { type: "photo", location: "other", src: "/images/gallery/life/south-africa-01.jpg", caption: "South Africa Flying Facility" },
    { type: "photo", location: "other", src: "/images/gallery/life/south-africa-02.jpg", caption: "South Africa Flying Facility" },
  ],
  FAQs: [
    {
      type: "video",
      src: "/videos/media/media-cockpit.mp4",
      poster: "/images/gallery/media/media-cockpit.jpg",
      caption: "Inside the Cockpit",
    },
    {
      type: "video",
      src: "/videos/media/media-informative-02.mp4",
      poster: "/images/gallery/media/media-informative-02.jpg",
      caption: "Captains' Window — Q&A",
    },
  ],
  Testimonials: [
    {
      type: "video",
      src: "/videos/testimonials/testimonial-gayathri.mp4",
      poster: "/images/gallery/testimonials/testimonial-gayathri.jpg",
      caption: "Gayathri — Student Testimonial",
    },
    {
      type: "video",
      src: "/videos/testimonials/testimonial-ir.mp4",
      poster: "/images/gallery/testimonials/testimonial-ir.jpg",
      caption: "Student Testimonial",
    },
    {
      type: "video",
      src: "/videos/testimonials/testimonial-zidan.mp4",
      poster: "/images/gallery/testimonials/testimonial-zidan.jpg",
      caption: "Zidan — Student Testimonial",
    },
    {
      type: "video",
      src: "/videos/testimonials/testimonial-04.mp4",
      poster: "/images/gallery/testimonials/testimonial-04.jpg",
      caption: "Student Testimonial",
    },
    {
      type: "video",
      src: "/videos/testimonials/testimonial-05.mp4",
      poster: "/images/gallery/testimonials/testimonial-05.jpg",
      caption: "Student Testimonial",
    },
  ],
};

const hasLocationFilters = (tab: GalleryTab) => albums[tab].some((t) => t.location);

function Caption({ text }: { text: string }) {
  // Fixed-height bar anchored to the tile bottom so captions sit at the same spot on every tile.
  return (
    <div className="absolute bottom-0 inset-x-0 h-16 px-3 pb-3 flex items-end bg-gradient-to-t from-navy-950/85 to-transparent pointer-events-none">
      <span className="block w-full line-clamp-2 text-[11px] leading-snug tracking-wide text-white/90 text-left">{text}</span>
    </div>
  );
}

export function Gallery() {
  const [active, setActive] = useState<GalleryTab>(galleryTabs[0]);
  const [location, setLocation] = useState<LocationFilter>("all");
  const [lightboxTile, setLightboxTile] = useState<GalleryTile | null>(null);

  const showFilters = hasLocationFilters(active);
  const tiles =
    showFilters && location !== "all" ? albums[active].filter((t) => t.location === location) : albums[active];

  const pill = (isActive: boolean) =>
    `rounded-full px-5 py-2.5 text-xs md:text-sm tracking-wide border transition-all ${
      isActive ? "bg-red-600 text-white border-red-600 font-semibold" : "border-navy-900/15 text-ink-600 hover:border-navy-900/35"
    }`;

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-5xl text-navy-900">
            <span className="text-gradient-red">Gallery</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center gap-3 mb-6 flex-wrap">
          {galleryTabs.map((tab) => (
            <button key={tab} type="button" onClick={() => setActive(tab)} className={pill(active === tab)} aria-pressed={active === tab}>
              {tab}
            </button>
          ))}
        </Reveal>

        <div className="min-h-[2.75rem] mb-8 flex justify-center">
          {showFilters && (
            <div role="group" aria-label="Filter by location" className="inline-flex flex-wrap justify-center gap-1 rounded-full bg-blue-50 p-1 ring-1 ring-navy-900/10">
              {locationFilters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setLocation(f.id)}
                  aria-pressed={location === f.id}
                  className={`rounded-full px-4 py-1.5 text-xs md:text-sm transition-colors ${
                    location === f.id ? "bg-navy-900 text-white font-semibold" : "text-ink-600 hover:text-navy-900"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          key={`${active}-${location}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          {tiles.map((tile, i) =>
            tile.type === "placeholder" ? (
              <div
                key={i}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-dashed border-navy-900/20 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center gap-2 text-ink-400"
              >
                <ImageIcon size={28} strokeWidth={1.2} />
                <span className="text-[10px] tracking-widest uppercase">Photo coming soon</span>
                <Caption text={tile.caption} />
              </div>
            ) : (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxTile(tile)}
                aria-label={`${tile.type === "video" ? "Play video" : "View photo"}: ${tile.caption}`}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-navy-900 cursor-pointer"
              >
                {tile.type === "photo" || tile.poster ? (
                  <img
                    src={tile.type === "photo" ? tile.src : tile.poster}
                    alt={tile.caption}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <video src={tile.src} preload="metadata" muted playsInline className="absolute inset-0 h-full w-full object-cover" />
                )}
                {tile.type === "video" && (
                  <div className="absolute inset-0 bg-navy-950/25 flex items-center justify-center">
                    <PlayCircle size={36} className="text-white drop-shadow-lg" strokeWidth={1.3} />
                  </div>
                )}
                <Caption text={tile.caption} />
              </button>
            )
          )}
        </motion.div>
      </div>

      <Modal isOpen={!!lightboxTile} onClose={() => setLightboxTile(null)}>
        {lightboxTile?.type === "photo" && (
          <img src={lightboxTile.src} alt={lightboxTile.caption} className="w-full h-auto rounded-3xl" />
        )}
        {lightboxTile?.type === "video" && (
          <video src={lightboxTile.src} poster={lightboxTile.poster} controls autoPlay className="w-full h-auto rounded-3xl bg-navy-950" />
        )}
      </Modal>
    </section>
  );
}
