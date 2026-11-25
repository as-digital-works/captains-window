/**
 * Gallery folders. Each album shows as one folder tile in the Gallery; opening it shows
 * every photo inside. To add an album, add an entry below and put its images in
 * public/images/gallery/<album-id>/ — a full-size .webp (1600px) plus a "-thumb.webp"
 * (640px) for the grid. scripts/optimize-media.ps1 makes the full-size files.
 */
export type AlbumPhoto = { src: string; thumb: string; caption: string };

export type GalleryAlbum = {
  id: string;
  title: string;
  description: string;
  location: "calicut" | "gurgaon" | "ajman" | "other";
  photos: AlbumPhoto[];
};

const gurgaon = (n: number, caption: string): AlbumPhoto => {
  const base = `/images/gallery/gurgaon/gurgaon-${String(n).padStart(2, "0")}`;
  return { src: `${base}.webp`, thumb: `${base}-thumb.webp`, caption };
};

const solo = (slug: string, name: string): AlbumPhoto => ({
  src: `/images/gallery/first-solo/${slug}.webp`,
  thumb: `/images/gallery/first-solo/${slug}-thumb.webp`,
  caption: `${name} — First Solo`,
});

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: "gurgaon",
    title: "Captains' Window Gurgaon",
    description: "Our ground training facility on Golf Course Road, Gurgaon, serving students across Delhi NCR and North India.",
    location: "gurgaon",
    photos: [
      gurgaon(1, "Window-Seat Lounge — Gurgaon Office"),
      gurgaon(2, "Student Lounge — Gurgaon Office"),
      gurgaon(3, "Reception — Gurgaon Office"),
      gurgaon(4, "World Map Wall — Gurgaon Office"),
      gurgaon(5, "Classroom — Gurgaon Office"),
      gurgaon(6, "Classroom — Gurgaon Office"),
      gurgaon(7, "Classroom — Gurgaon Office"),
      gurgaon(8, "Classroom — Gurgaon Office"),
      gurgaon(9, "Classroom — Gurgaon Office"),
      gurgaon(10, "Ground Class in Session — Gurgaon Office"),
      gurgaon(11, "Study Area — Gurgaon Office"),
      gurgaon(12, "Corridor — Gurgaon Office"),
      gurgaon(13, "Lounge & Meeting Room — Gurgaon Office"),
      gurgaon(14, "Lounge — Gurgaon Office"),
      gurgaon(15, "Welcome Display — Gurgaon Office"),
      gurgaon(16, "Workstations — Gurgaon Office"),
      gurgaon(17, "Boardroom — Gurgaon Office"),
    ],
  },
  {
    id: "first-solo",
    title: "First Solo — Earning Their Wings",
    description: "Congratulating our cadets on their first solo flights.",
    location: "other",
    photos: [
      solo("alan-saju", "Alan Saju"),
      solo("nasrul-haq", "Nasrul Haq"),
      solo("muhammed-sajid-mk", "Muhammed Sajid MK"),
      solo("salman-fayis-t", "Salman Fayis T"),
      solo("muhammed-ashil", "Muhammed Ashil"),
      solo("aadil-manzoor-muhamad", "Aadil Manzoor Muhamad"),
    ],
  },
];
