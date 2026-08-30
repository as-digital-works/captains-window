import { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { Modal } from "./Modal";

type GalleryTile =
  | { type: "photo"; src: string; caption: string }
  | { type: "video"; src: string; poster?: string; caption: string };

const galleryTabs = ["Life at Captains Window", "FAQs", "Testimonials"] as const;
type GalleryTab = (typeof galleryTabs)[number];

const albums: Record<GalleryTab, GalleryTile[]> = {
  "Life at Captains Window": [
    { type: "photo", src: "/images/gallery/calicut/calicut-01.jpg", caption: "Calicut Facility" },
    { type: "photo", src: "/images/gallery/calicut/calicut-02.jpg", caption: "Calicut Facility" },
    { type: "photo", src: "/images/gallery/calicut/calicut-03.jpg", caption: "Calicut Facility" },
    {
      type: "video",
      src: "/videos/gallery/calicut/calicut-video-01.mp4",
      poster: "/images/gallery/calicut/calicut-01.jpg",
      caption: "Life at Our Calicut Campus",
    },
    {
      type: "video",
      src: "/videos/gallery/calicut/calicut-video-02.mp4",
      poster: "/images/gallery/calicut/calicut-02.jpg",
      caption: "Calicut Campus Event",
    },
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
    { type: "photo", src: "/images/gallery/life/serbia-01.jpg", caption: "Cadets — Serbia Flying Facility" },
    { type: "photo", src: "/images/gallery/life/serbia-02.jpg", caption: "Serbia Flying Facility" },
    { type: "photo", src: "/images/gallery/life/serbia-03.jpg", caption: "Cadets — Serbia Flying Facility" },
    { type: "photo", src: "/images/gallery/life/south-africa-01.jpg", caption: "South Africa Flying Facility" },
    { type: "photo", src: "/images/gallery/life/south-africa-02.jpg", caption: "South Africa Flying Facility" },
    {
      type: "video",
      src: "/videos/gallery/life/life-video-03.mp4",
      poster: "/images/gallery/life/life-video-03.jpg",
      caption: "Inside Our Office",
    },
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

export function Gallery() {
  const [active, setActive] = useState<GalleryTab>(galleryTabs[0]);
  const [lightboxTile, setLightboxTile] = useState<GalleryTile | null>(null);

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-5xl text-navy-900">
            <span className="text-gradient-red">Gallery</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="flex justify-center gap-3 mb-12 flex-wrap">
          {galleryTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`rounded-full px-5 py-2.5 text-xs md:text-sm tracking-wide border transition-all ${
                active === tab
                  ? "bg-red-600 text-white border-red-600 font-semibold"
                  : "border-navy-900/15 text-ink-600 hover:border-navy-900/35"
              }`}
            >
              {tab}
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
          {albums[active].map((tile, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLightboxTile(tile)}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center bg-navy-900 cursor-pointer"
            >
              {tile.type === "photo" && (
                <>
                  <img src={tile.src} alt={tile.caption} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-navy-950/85 to-transparent">
                    <span className="text-[11px] leading-snug tracking-wide text-white/90">{tile.caption}</span>
                  </div>
                </>
              )}
              {tile.type === "video" && (
                <>
                  {tile.poster ? (
                    <img src={tile.poster} alt={tile.caption} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <video
                      src={tile.src}
                      preload="metadata"
                      muted
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-navy-950/25 flex items-center justify-center">
                    <PlayCircle size={36} className="text-white drop-shadow-lg" strokeWidth={1.3} />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-navy-950/85 to-transparent">
                    <span className="text-[11px] leading-snug tracking-wide text-white/90">{tile.caption}</span>
                  </div>
                </>
              )}
            </button>
          ))}
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
