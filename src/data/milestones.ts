/**
 * Milestones of Success — to add a student, add an entry to a category's `achievers`.
 *   { name: "Ananya R", photo: "/images/milestones/ananya-r.webp", detail: "Air Navigation" }
 * `photo` is optional (a placeholder tile shows until it's set); put photos in
 * public/images/milestones/ (portrait, ideally 800px wide .webp — see scripts/optimize-media.ps1).
 * `detail` is the subject/achievement line under the name; leave it out where it doesn't apply.
 */
export type Achiever = {
  name: string;
  photo?: string;
  /** Full congratulation poster, opened when the card is clicked. */
  poster?: string;
  /** CSS object-position for the card photo (defaults to the top of the photo). */
  photoPosition?: string;
  detail?: string;
  /** Sample entry — shown with placeholder styling until the client sends real details. */
  placeholder?: boolean;
};

export type MilestoneCategory = {
  id: string;
  title: string;
  description: string;
  /** Icon shown on placeholder photo tiles. */
  icon: "student" | "plane";
  achievers: Achiever[];
};

const academic = (slug: string, name: string, subject: string): Achiever => ({
  name,
  detail: subject,
  photo: `/images/milestones/academic/${slug}.webp`,
  // No `poster`: these cards don't open the full congratulation poster.
});

const firstSolo = (slug: string, name: string): Achiever => ({
  name,
  photo: `/images/gallery/first-solo/${slug}-thumb.webp`,
  poster: `/images/gallery/first-solo/${slug}.webp`,
  photoPosition: "object-[center_35%]",
});

export const milestoneCategories: MilestoneCategory[] = [
  {
    id: "academic-achievers",
    title: "Some of Our DGCA Achievers",
    description:
      "Celebrating our students who have successfully cleared their DGCA examinations, reflecting their dedication, determination and academic excellence.",
    icon: "student",
    // DGCA CPL subjects cleared, from the client's congratulation posters.
    achievers: [
      academic("farhana-pk", "Farhana P K", "Air Regulations, Air Navigation, Meteorology & RTR Part 1"),
      academic("fawaz", "Fawaz", "Meteorology"),
      academic("sana-fahmi", "Sana Fahmi", "Technical General"),
      academic("pranav-p", "Pranav P.", "Air Regulations"),
      academic("anhaj", "Anhaj", "Meteorology"),
      academic("nasrul-haq", "Nasrul Haq", "Radio Telephony (RT)"),
      academic("isha", "Isha", "Air Navigation"),
      academic("ajmal", "Ajmal", "Technical Specific"),
      academic("nidha", "Nidha", "Air Navigation"),
      academic("hishma", "Hishma", "Air Regulations"),
      academic("naif", "Naif", "Technical General"),
      academic("shanha", "Shanha", "Air Regulations"),
      academic("ashil", "Ashil", "Air Navigation"),
      academic("abishek", "Abishek", "Meteorology"),
      academic("navaneeth", "Navaneeth", "Radio Telephony (RT)"),
      academic("yazeed", "Yazeed", "Radio Telephony (RT)"),
    ],
  },
  {
    id: "first-solo",
    title: "First Solo – Earning Their Wings",
    description:
      "The first solo flight is an unforgettable milestone in every aviator's journey. We proudly celebrate our students as they take to the skies independently, turning their dreams into reality.",
    icon: "plane",
    achievers: [
      firstSolo("alan-saju", "Alan Saju"),
      firstSolo("nasrul-haq", "Nasrul Haq"),
      firstSolo("muhammed-sajid-mk", "Muhammed Sajid MK"),
      firstSolo("salman-fayis-t", "Salman Fayis T"),
      firstSolo("muhammed-ashil", "Muhammed Ashil"),
      firstSolo("aadil-manzoor-muhamad", "Aadil Manzoor Muhamad"),
    ],
  },
];
