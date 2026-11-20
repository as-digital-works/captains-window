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

export const milestoneCategories: MilestoneCategory[] = [
  {
    id: "academic-achievers",
    title: "Academic Achievers",
    description:
      "Celebrating our students who have successfully cleared their DGCA examinations, reflecting their dedication, determination and academic excellence.",
    icon: "student",
    // PLACEHOLDER: replace with real student names, photos and the DGCA subject they cleared.
    achievers: [
      { name: "Student Name", detail: "Air Navigation", placeholder: true },
      { name: "Student Name", detail: "Aviation Meteorology", placeholder: true },
      { name: "Student Name", detail: "Air Regulations", placeholder: true },
    ],
  },
  {
    id: "first-solo",
    title: "First Solo – Earning Their Wings",
    description:
      "The first solo flight is an unforgettable milestone in every aviator's journey. We proudly celebrate our students as they take to the skies independently, turning their dreams into reality.",
    icon: "plane",
    // PLACEHOLDER: replace with real student names and first-solo photos.
    achievers: [
      { name: "Student Name", placeholder: true },
      { name: "Student Name", placeholder: true },
      { name: "Student Name", placeholder: true },
    ],
  },
];
