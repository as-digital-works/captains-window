import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { GoogleG, Stars } from "./ReviewBadge";
import { googleRating, googleReviews } from "../data/content";
import { external, mapsSearchUrl } from "../lib/links";

type SliderReview = { name: string; text: string; rating: number; when?: string; photo?: string };

const fallbackUrl = mapsSearchUrl(googleRating.fallbackQuery);
const readUrl = googleRating.readUrl || fallbackUrl;
const writeUrl = googleRating.writeUrl || fallbackUrl;

const savedReviews: SliderReview[] = googleReviews.map((r) => ({ name: r.name, text: r.quote, rating: 5 }));

type PlacesReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string; photoUri?: string };
};

/**
 * Pulls the latest reviews straight from Google when a Places API key and place ID are
 * configured (see `googleRating` in data/content.ts). Google returns up to 5 recent/relevant
 * reviews; they're shown first, followed by the saved reviews.
 */
function useLiveReviews() {
  const [live, setLive] = useState<{ reviews: SliderReview[]; rating?: number; count?: number } | null>(null);
  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_PLACES_API_KEY as string | undefined;
    if (!key || !googleRating.placeId) return;
    const ctrl = new AbortController();
    fetch(`https://places.googleapis.com/v1/places/${googleRating.placeId}`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "rating,userRatingCount,reviews" },
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { rating?: number; userRatingCount?: number; reviews?: PlacesReview[] }) => {
        const reviews = (data.reviews ?? [])
          .map((r) => ({
            name: r.authorAttribution?.displayName ?? "Google user",
            photo: r.authorAttribution?.photoUri,
            text: r.originalText?.text ?? r.text?.text ?? "",
            rating: r.rating ?? 5,
            when: r.relativePublishTimeDescription,
          }))
          .filter((r) => r.text && r.rating >= 4);
        setLive({ reviews, rating: data.rating, count: data.userRatingCount });
      })
      .catch(() => {
        /* Keep showing the saved reviews. */
      });
    return () => ctrl.abort();
  }, []);
  return live;
}

function ReviewCard({ review }: { review: SliderReview }) {
  const [open, setOpen] = useState(false);
  const long = review.text.length > 150;
  return (
    <article className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)] rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy-900/10 flex flex-col">
      <header className="flex items-start gap-3">
        {review.photo ? (
          <img src={review.photo} alt="" referrerPolicy="no-referrer" className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white font-semibold text-sm">
            {review.name[0]}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-navy-900 truncate">{review.name}</div>
          {review.when && <div className="text-[11px] text-ink-400">{review.when}</div>}
        </div>
        <GoogleG size={18} />
      </header>
      <div className="mt-3">
        <Stars rating={review.rating} size={14} />
      </div>
      <p className={`mt-3 text-sm leading-relaxed text-ink-600 ${open ? "" : "line-clamp-4"}`}>{review.text}</p>
      {long && (
        <button type="button" onClick={() => setOpen((o) => !o)} className="mt-2 self-start text-xs font-medium text-ink-400 hover:text-red-600">
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </article>
  );
}

export function GoogleReviewsSlider() {
  const live = useLiveReviews();
  const reviews = live ? [...live.reviews, ...savedReviews.filter((s) => !live.reviews.some((l) => l.name === s.name))] : savedReviews;
  const rating = live?.rating ?? googleRating.rating;
  const countLabel = live?.count ? `${live.count}` : googleRating.countLabel;

  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const scroll = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const stepPx = card ? card.offsetWidth + 20 : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: dir * stepPx, behavior: "smooth" });
  }, []);

  // Auto-advance every 5s; pauses while the visitor hovers or touches the slider.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => scroll(1), 5000);
    return () => window.clearInterval(id);
  }, [paused, scroll]);

  return (
    <section id="google-reviews" className="relative py-20 md:py-28 bg-blue-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12">
          <span className="section-label">Their Voice, Our Pride</span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 text-navy-900">
            Flying High on <span className="text-gradient-red">Google</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[15rem_1fr] gap-8 items-center">
          <Reveal className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="" className="h-10 w-auto" />
            </div>
            <div className="font-display text-navy-900 leading-snug">Captains&rsquo; Window Aviation Solutions</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-navy-900">{rating.toFixed(1)}</span>
              <Stars rating={rating} size={18} />
            </div>
            <a href={readUrl} {...external} className="text-sm text-ink-600 hover:text-red-600 underline-offset-2 hover:underline">
              {countLabel} Google reviews
            </a>
            <a href={writeUrl} {...external} className="mt-1 inline-flex items-center gap-2 rounded-full border border-navy-900/20 bg-white px-4 py-2 text-sm font-medium text-navy-900 hover:border-red-500/40 hover:text-red-600">
              <GoogleG size={14} /> Write a review
            </a>
          </Reveal>

          <div
            className="relative min-w-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div
              ref={track}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Google reviews"
            >
              {reviews.map((r, i) => (
                <ReviewCard key={`${r.name}-${i}`} review={r} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous reviews"
              className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white text-navy-900 shadow ring-1 ring-navy-900/10 hover:text-red-600"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next reviews"
              className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-white text-navy-900 shadow ring-1 ring-navy-900/10 hover:text-red-600"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
