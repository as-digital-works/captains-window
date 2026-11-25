import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Folder, ImageIcon, PlayCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { Modal } from "./Modal";
import { galleryAlbums, type GalleryAlbum } from "../data/galleryAlbums";

type GalleryLocation = "calicut" | "gurgaon" | "ajman" | "other";

type GalleryTile = { caption: string; location?: GalleryLocation } & (
  | { type: "photo"; src: string }
  | { type: "video"; src: string; poster?: string }
  /** A folder that opens one of the albums in data/galleryAlbums.ts. */
  | { type: "album"; albumId: string }
  /** Empty slot shown until the client's media arrives. Not clickable. */
  | { type: "placeholder" }
);

const albumTile = (album: GalleryAlbum): GalleryTile => ({
  type: "album",
  albumId: album.id,
  location: album.location,
  caption: album.title,
});
const getAlbum = (id: string) => galleryAlbums.find((a) => a.id === id)!;

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
 * Photo folders (e.g. Captains' Window Gurgaon, First Solo) live in data/galleryAlbums.ts
 * and appear first in "Life at Captains Window". Single photos/videos are listed below.
 */
const albums: Record<GalleryTab, GalleryTile[]> = {
  "Life at Captains Window": [
    ...galleryAlbums.map(albumTile),
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

function FolderTile({ album, onOpen }: { album: GalleryAlbum; onOpen: () => void }) {
  const [cover, second, third] = album.photos;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open folder: ${album.title} (${album.photos.length} photos)`}
      className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy-900 cursor-pointer ring-1 ring-navy-900/10"
    >
      {/* Stacked-photo look: two back photos peek out behind the cover. */}
      <div className="absolute inset-0 grid grid-rows-[minmax(0,2fr)_minmax(0,1fr)] gap-0.5">
        <img src={cover.thumb} alt="" loading="lazy" decoding="async" className="h-full w-full min-h-0 object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
        <div className="grid grid-cols-2 gap-0.5 min-h-0 overflow-hidden">
          {[second ?? cover, third ?? cover].map((p, i) => (
            <img key={i} src={p.thumb} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          ))}
        </div>
      </div>
      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wide text-navy-900 shadow">
        <Folder size={13} className="text-red-600" /> {album.photos.length} photos
      </span>
      <Caption text={album.title} />
    </button>
  );
}

export function Gallery() {
  const [active, setActive] = useState<GalleryTab>(galleryTabs[0]);
  const [location, setLocation] = useState<LocationFilter>("all");
  const [lightboxTile, setLightboxTile] = useState<GalleryTile | null>(null);
  const [openAlbum, setOpenAlbum] = useState<GalleryAlbum | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  const showFilters = hasLocationFilters(active);
  const tiles =
    showFilters && location !== "all" ? albums[active].filter((t) => t.location === location) : albums[active];

  const pill = (isActive: boolean) =>
    `rounded-full px-5 py-2.5 text-xs md:text-sm tracking-wide border transition-all ${
      isActive ? "bg-red-600 text-white border-red-600 font-semibold" : "border-navy-900/15 text-ink-600 hover:border-navy-900/35"
    }`;

  const openFolder = (album: GalleryAlbum) => {
    setOpenAlbum(album);
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const count = openAlbum?.photos.length ?? 0;
  const step = useCallback(
    (dir: 1 | -1) => setPhotoIndex((i) => (i === null || !count ? i : (i + dir + count) % count)),
    [count]
  );
  const closePhoto = useCallback(() => setPhotoIndex(null), []);

  useEffect(() => {
    if (photoIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [photoIndex, step]);

  const currentPhoto = openAlbum && photoIndex !== null ? openAlbum.photos[photoIndex] : null;

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-5xl text-navy-900">
            <span className="text-gradient-red">Gallery</span>
          </h2>
        </Reveal>

        {openAlbum ? (
          <motion.div key={openAlbum.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-navy-900/10 pb-6">
              <div>
                <button
                  type="button"
                  onClick={() => setOpenAlbum(null)}
                  className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-ink-600 hover:text-red-600"
                >
                  <ArrowLeft size={14} /> Back to Gallery
                </button>
                <h3 className="mt-3 font-display text-2xl md:text-3xl text-navy-900 flex items-center gap-3">
                  <Folder size={24} className="text-red-600 shrink-0" /> {openAlbum.title}
                </h3>
                <p className="mt-2 text-sm text-ink-600 max-w-2xl">{openAlbum.description}</p>
              </div>
              <span className="text-sm text-ink-400 shrink-0">{openAlbum.photos.length} photos</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {openAlbum.photos.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setPhotoIndex(i)}
                  aria-label={`View photo: ${p.caption}`}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy-900 cursor-pointer"
                >
                  <img
                    src={p.thumb}
                    alt={p.caption}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <Caption text={p.caption} />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <>
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
                tile.type === "album" ? (
                  <FolderTile key={tile.albumId} album={getAlbum(tile.albumId)} onOpen={() => openFolder(getAlbum(tile.albumId))} />
                ) : tile.type === "placeholder" ? (
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
          </>
        )}
      </div>

      <Modal isOpen={!!lightboxTile} onClose={() => setLightboxTile(null)}>
        {lightboxTile?.type === "photo" && (
          <img src={lightboxTile.src} alt={lightboxTile.caption} className="w-full h-auto rounded-3xl" />
        )}
        {lightboxTile?.type === "video" && (
          <video src={lightboxTile.src} poster={lightboxTile.poster} controls autoPlay className="w-full h-auto rounded-3xl bg-navy-950" />
        )}
      </Modal>

      <Modal isOpen={!!currentPhoto} onClose={closePhoto} maxWidthClassName="max-w-4xl">
        {currentPhoto && (
          <figure className="relative bg-navy-950">
            <img src={currentPhoto.src} alt={currentPhoto.caption} className="mx-auto max-h-[75vh] w-auto object-contain" />
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
            <figcaption className="flex items-center justify-between gap-4 bg-white px-5 py-3 text-sm text-navy-900">
              <span>{currentPhoto.caption}</span>
              <span className="text-ink-400 tabular-nums shrink-0">
                {(photoIndex ?? 0) + 1} / {count}
              </span>
            </figcaption>
          </figure>
        )}
      </Modal>
    </section>
  );
}
