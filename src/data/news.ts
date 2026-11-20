/**
 * News & Updates — add a post by adding an object to `newsPosts`.
 * Posts are sorted newest-first by `date` automatically, so order here doesn't matter.
 *
 * `content` is plain text: separate paragraphs with a blank line, start a line with
 * "## " for a sub-heading, or "- " for a bullet point.
 * `coverImage` is a path under /public (ideally a 1600px-wide .webp — see scripts/optimize-media.ps1).
 */
export type NewsPost = {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-11-18". */
  date: string;
  excerpt: string;
  coverImage: string;
  content: string;
  /** Marks seeded sample posts. Shows a "Sample post" tag until the client replaces it. */
  placeholder?: boolean;
};

const posts: NewsPost[] = [
  {
    slug: "new-cadet-batch-november-2026",
    title: "New Cadet Batch Begins Ground Training",
    date: "2026-11-18",
    excerpt:
      "A new group of aspiring pilots has started DGCA ground classes with Captains' Window — here's what their first months of training will look like.",
    coverImage: "/images/about/cadets-garden.jpg",
    placeholder: true,
    content: `PLACEHOLDER POST — replace with the client's real announcement.

This month we welcomed a new batch of cadets to our ground training programme. Over the coming months they will work through the full set of DGCA ground subjects with our airline-pilot instructors.

## What the batch will cover
- Air Navigation and Flight Planning
- Air Regulations
- Aviation Meteorology
- Technical General and Technical Specific

Alongside classroom sessions, each cadet gets one-to-one mentoring on their licensing pathway, medical requirements and flight school options in India and abroad.

We're proud to have them on board and look forward to following their journey into the cockpit.`,
  },
  {
    slug: "dgca-exam-preparation-tips",
    title: "5 Tips to Prepare for Your DGCA Ground Exams",
    date: "2026-11-05",
    excerpt:
      "Our instructors share practical advice on planning your study time, tackling Air Navigation, and walking into the DGCA exam hall with confidence.",
    coverImage: "/images/about/courses-cockpit.jpg",
    placeholder: true,
    content: `PLACEHOLDER POST — replace with the client's real article.

The DGCA ground exams are the first big milestone on the road to a Commercial Pilot Licence. Here are five habits our instructors see in cadets who clear them first time.

## 1. Get your Computer Number early
You can't book an exam without it, so apply before ground classes begin.

## 2. Start with Air Navigation
It's the subject most cadets find hardest. Give it the most time and practise problems daily.

## 3. Study in short, regular sessions
Two focused hours every day beat a ten-hour weekend cram.

## 4. Practise with past-pattern questions
Timed practice papers show you where you're losing marks.

## 5. Ask early, ask often
Our instructors are airline pilots and CPL holders. Use them — no question is too basic.`,
  },
  {
    slug: "gurgaon-ground-training-facility-opens",
    title: "Our Gurgaon Ground Training Facility Is Now Open",
    date: "2026-10-22",
    excerpt:
      "Captains' Window now serves cadets across Delhi NCR from our new facility at Vipul Plaza, Golf Course Road, Gurgaon.",
    coverImage: "/images/destinations/gurgaon-cyber-city.jpg",
    placeholder: true,
    content: `PLACEHOLDER POST — replace with the client's real announcement.

We're delighted to announce that our Gurgaon ground training facility is open to students across North India.

Located at Vipul Plaza, Suncity, Sector 54, Golf Course Road, the facility brings the same structured ground school, DGCA exam preparation and career counselling that our Calicut campus is known for.

## Visit us
Drop in for a free counselling session or call +91 7034 41 6000 to book a time with our team.`,
  },
];

export const newsPosts: NewsPost[] = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export function getNewsPost(slug: string) {
  return newsPosts.find((p) => p.slug === slug);
}

export function formatNewsDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
