/**
 * Aviator's Corner — add an article by adding an object to `posts`.
 * Articles are shown in `order` (lowest first); the home page shows the first 3.
 *
 * `content` is plain text: separate paragraphs with a blank line, start a line with
 * "## " for a sub-heading, or "- " for a bullet point.
 * `coverImage` is a path under /public (ideally a 1600px .webp — see scripts/optimize-media.ps1);
 * `coverPosition` keeps the important part of the photo in frame when it's cropped.
 */
export const NEWS_BASE = "/aviators-corner";
export const NEWS_TITLE = "Aviator's Corner";

export type NewsPost = {
  slug: string;
  title: string;
  order: number;
  /** Optional ISO date, e.g. "2026-11-18". Shown on the card only when set. */
  date?: string;
  /** Short description shown on cards (2 lines) and used as the page's meta description. */
  excerpt: string;
  coverImage: string;
  coverPosition?: string;
  content: string;
  /** Marks sample posts. Shows a "Sample post" tag until the client replaces it. */
  placeholder?: boolean;
};

const posts: NewsPost[] = [
  {
    slug: "conventional-vs-cadet-pilot-programme",
    title: "Conventional vs Cadet Pilot Programme",
    order: 1,
    excerpt:
      "Conventional or Cadet Pilot Programme? Both can lead to an airline career, but they differ in structure, investment, selection procedures and career pathways.",
    coverImage: "/images/aviators-corner/conventional-vs-cadet.webp",
    coverPosition: "object-[center_30%]",
    content: `Choosing the right training pathway is one of the most important decisions an aspiring pilot will make. While both the Conventional and Cadet Pilot Programmes can lead to a career as a commercial airline pilot, they differ in structure, investment, selection procedures and career pathways.

## Conventional Pilot Programme
Offers students the flexibility to choose their flying school, training location and pace of training. Upon obtaining their Commercial Pilot Licence (CPL), candidates can apply independently for airline recruitment opportunities.

## Cadet Pilot Programme
An airline-associated, structured training pathway where candidates typically undergo a selection process before commencing training. The programme is designed around the airline's training requirements, with progression subject to successful completion and applicable airline conditions.

Understanding the advantages and challenges of both pathways can help aspiring pilots choose a programme that aligns with their financial capabilities, personal preferences and long-term career aspirations.`,
  },
  {
    slug: "financial-journey-of-becoming-a-pilot",
    title: "Financial Journey of Becoming a Pilot",
    order: 2,
    excerpt:
      "Becoming a pilot is a significant financial commitment. Here's what students and their families should plan for beyond flying training fees.",
    coverImage: "/images/aviators-corner/financial-journey.webp",
    coverPosition: "object-[center_20%]",
    content: `Becoming a pilot is not only a career aspiration but also a significant financial commitment. Understanding the overall investment involved in pilot training is essential for both students and their families.

Beyond flying training fees, aspiring pilots must consider expenses such as ground school, medical examinations, licensing examinations, accommodation, licence conversion, additional flying hours and type rating, where applicable.

Exploring education loans, financing options, payment structures and maintaining a contingency fund can help students prepare financially and avoid unexpected challenges during their training journey.

Proper financial planning is an important step towards a smoother and more sustainable aviation career.`,
  },
  {
    slug: "choosing-the-right-flying-school",
    title: "Choosing the Right Flying School",
    order: 3,
    excerpt:
      "Your choice of flying school shapes the quality, duration and overall experience of your training. Look beyond price and location before you decide.",
    coverImage: "/images/aviators-corner/choosing-flying-school.webp",
    coverPosition: "object-[center_35%]",
    content: `Selecting a flying training organisation is a crucial decision that can significantly influence the quality, duration and overall experience of pilot training.

Rather than making a decision based solely on attractive pricing or geographical location, aspiring pilots should evaluate several important factors:

- Regulatory approvals and licensing requirements
- Aircraft fleet size and serviceability
- Instructor qualifications and student-to-instructor ratio
- Safety standards and maintenance practices
- Weather conditions and flying opportunities
- Average training completion timelines
- Transparency in pricing and refund policies
- Accommodation and student support services
- Licence conversion requirements for overseas training

A well-informed decision can help students minimise unnecessary delays, additional expenses and complications throughout their flying journey.`,
  },
  {
    slug: "aviation-medicals-are-you-fit-to-fly",
    title: "Aviation Medicals – Are You Fit to Fly?",
    order: 4,
    excerpt:
      "Medical fitness is a fundamental requirement for a commercial pilot. Understand the DGCA Class 1 and Class 2 medicals before you commit to training.",
    coverImage: "/images/aviators-corner/aviation-medicals.webp",
    coverPosition: "object-[center_30%]",
    content: `Medical fitness is a fundamental requirement for pursuing a career as a commercial pilot. Aspiring pilots must meet the medical standards prescribed by the Directorate General of Civil Aviation (DGCA) in India.

Understanding the difference between Class 1 and Class 2 medical examinations, along with requirements relating to vision, hearing, cardiovascular health and overall physical fitness, is essential before committing to pilot training.

Contrary to popular belief, wearing spectacles does not automatically disqualify an individual from becoming a pilot, provided they meet the prescribed medical standards.

Obtaining the appropriate medical clearance early in the training journey can help candidates identify potential concerns before making a substantial financial investment.`,
  },
  {
    slug: "life-beyond-the-cockpit",
    title: "Life Beyond the Cockpit",
    order: 5,
    excerpt:
      "A pilot's career goes far beyond flying an aircraft — from responsibility and continuous learning to lifestyle realities and growth towards Captain.",
    coverImage: "/images/aviators-corner/life-beyond-cockpit.webp",
    coverPosition: "object-center",
    content: `A career as a pilot offers exciting opportunities, global exposure and immense professional satisfaction. However, the profession extends far beyond flying an aircraft.

Pilots are responsible for flight planning, weather assessment, operational decision-making, crew coordination and, above all, passenger safety.

Their careers require continuous learning, recurrent training, periodic medical examinations and proficiency assessments.

Aspiring pilots should also understand the realities of irregular working hours, time away from family, fatigue management and the importance of maintaining physical and mental well-being.

From beginning a career as a First Officer to progressing towards becoming a Captain, Training Captain or Examiner, aviation offers numerous opportunities for professional growth.

Becoming a pilot is not simply about earning your wings; it is about embracing a lifelong commitment to professionalism, discipline and excellence.`,
  },
];

export const newsPosts: NewsPost[] = [...posts].sort((a, b) => a.order - b.order);

export function getNewsPost(slug: string) {
  return newsPosts.find((p) => p.slug === slug);
}

export function newsHref(slug: string) {
  return `${NEWS_BASE}/${slug}`;
}

export function formatNewsDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
