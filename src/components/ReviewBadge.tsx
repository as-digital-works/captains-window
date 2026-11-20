import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, PenLine, Star } from "lucide-react";
import { googleRating } from "../data/content";
import { external, mapsSearchUrl } from "../lib/links";

const fallback = mapsSearchUrl(googleRating.fallbackQuery);
const readUrl = googleRating.readUrl || fallback;
const writeUrl = googleRating.writeUrl || fallback;

export function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 text-amber-400/35" fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} className="text-amber-400" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/**
 * Google rating badge for the header. Desktop: opens on hover (stays open while the
 * cursor moves into the popover) and on keyboard focus. Touch: tap to toggle, tap outside to close.
 */
export function ReviewBadge({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const popId = useId();
  const label = `Rated ${googleRating.rating} out of 5 from ${googleRating.countLabel} Google reviews`;

  // Hover/focus fire just before click on the same tap or mouse press; remember when we
  // opened so that click doesn't immediately toggle the popover shut again.
  const openedAt = useRef(0);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    if (!open) openedAt.current = Date.now();
    setOpen(true);
  };
  const onClick = () => {
    if (open && Date.now() - openedAt.current < 400) return;
    if (!open) openedAt.current = Date.now();
    setOpen(!open);
  };
  const hideSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && hideSoon()}
      onFocus={show}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        aria-controls={popId}
        aria-label={label}
        className={`flex items-center gap-1.5 rounded-full ring-1 ring-navy-900/10 bg-white hover:ring-navy-900/25 transition-shadow whitespace-nowrap ${
          compact ? "px-2.5 py-1.5" : "px-3 py-2"
        }`}
      >
        <GoogleG size={compact ? 14 : 16} />
        {compact ? (
          <span className="flex items-center gap-0.5 text-xs font-semibold text-navy-900">
            <Star size={12} className="text-amber-400" fill="currentColor" strokeWidth={0} />
            {googleRating.rating}
          </span>
        ) : (
          <>
            <Stars rating={googleRating.rating} />
            <span className="text-xs font-semibold text-navy-900">{googleRating.rating}</span>
            <span className="text-xs text-ink-400">| {googleRating.countLabel}</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={popId}
            role="dialog"
            aria-label="Google reviews"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top right" }}
            // pt-3 is an invisible hover bridge between the badge and the card.
            className="absolute right-0 top-full pt-3 z-50 w-[min(18rem,calc(100vw-1.5rem))]"
          >
            <div className="rounded-2xl bg-white shadow-xl shadow-black/15 ring-1 ring-navy-900/10 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 ring-1 ring-navy-900/5">
                  <GoogleG size={22} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-navy-900">Google Reviews</div>
                  <div className="flex items-center gap-1.5 text-xs text-ink-600">
                    <span className="font-semibold text-navy-900">{googleRating.rating} ★</span>
                    from {googleRating.countLabel} reviews
                  </div>
                </div>
              </div>
              <div className="mt-2 pl-[3.25rem]">
                <Stars rating={googleRating.rating} size={14} />
              </div>
              <div className="mt-4 grid gap-2">
                <a
                  href={readUrl}
                  {...external}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-navy-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-navy-800 transition-colors"
                >
                  Read our reviews <ExternalLink size={12} />
                </a>
                <a
                  href={writeUrl}
                  {...external}
                  className="flex items-center justify-center gap-1.5 rounded-full border-2 border-red-500 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                >
                  <PenLine size={12} /> Write a review
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
