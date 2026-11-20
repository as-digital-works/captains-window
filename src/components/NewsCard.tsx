import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { formatNewsDate, newsHref, type NewsPost } from "../data/news";

export function NewsCard({ post }: { post: NewsPost }) {
  const href = newsHref(post.slug);
  return (
    <article className="group card-light rounded-2xl p-4 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10 hover:border-red-500/30">
      <Link to={href} className="relative block aspect-[16/10] rounded-xl overflow-hidden bg-navy-900" tabIndex={-1} aria-hidden>
        <img
          src={post.coverImage}
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${post.coverPosition ?? "object-center"} transition-transform duration-500 group-hover:scale-[1.04]`}
        />
        {post.placeholder && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-semibold tracking-widest uppercase text-red-600">
            Sample post
          </span>
        )}
      </Link>
      <div className="flex flex-col flex-1 px-1 pt-5 pb-1">
        <h3 className="font-display text-lg leading-snug text-navy-900 line-clamp-2 min-h-[2lh]">
          <Link to={href} className="hover:text-red-600 transition-colors">
            {post.title}
          </Link>
        </h3>
        {post.date && (
          <time dateTime={post.date} className="mt-2 flex items-center gap-1.5 text-xs text-ink-400">
            <CalendarDays size={13} /> {formatNewsDate(post.date)}
          </time>
        )}
        <p className="mt-3 text-sm text-ink-600 leading-relaxed line-clamp-2">{post.excerpt}</p>
        <div className="flex-1" />
        <Link
          to={href}
          className="mt-5 self-start text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
          aria-label={`Read more: ${post.title}`}
        >
          Read More &raquo;
        </Link>
      </div>
    </article>
  );
}
