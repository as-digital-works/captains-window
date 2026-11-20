import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { NewsCard } from "../components/NewsCard";
import { CtaBand } from "../components/CtaBand";
import { formatNewsDate, getNewsPost, newsPosts } from "../data/news";
import { usePageMeta } from "../hooks/usePageMeta";

/** Renders the simple text format described in data/news.ts. */
function PostBody({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\s*\n/);
  return (
    <div className="space-y-5 text-base leading-relaxed text-ink-600">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc pl-5 space-y-1.5 marker:text-red-600">
              {lines.map((l) => (
                <li key={l}>{l.slice(2)}</li>
              ))}
            </ul>
          );
        }
        if (lines[0].startsWith("## ")) {
          const rest = lines.slice(1).join(" ");
          return (
            <div key={i} className="space-y-2 pt-2">
              <h2 className="font-display text-xl text-navy-900">{lines[0].slice(3)}</h2>
              {rest && <p>{rest}</p>}
            </div>
          );
        }
        return <p key={i}>{lines.join(" ")}</p>;
      })}
    </div>
  );
}

export function NewsDetailPage() {
  const { slug = "" } = useParams();
  const post = getNewsPost(slug);
  usePageMeta(post ? post.title : "Post not found", post?.excerpt);

  if (!post) {
    return (
      <section className="pt-44 pb-28 bg-white text-center px-6">
        <h1 className="font-display text-3xl text-navy-900">Post not found</h1>
        <p className="mt-3 text-ink-600">This article may have moved or been removed.</p>
        <Link to="/news" className="btn-primary mt-8">
          <ArrowLeft size={16} /> Back to News
        </Link>
      </section>
    );
  }

  const more = newsPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="relative pt-36 pb-14 md:pt-44 md:pb-16 bg-navy-950 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[20rem] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl mx-auto px-6"
        >
          <Link to="/news" className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-white/60 hover:text-white">
            <ArrowLeft size={14} /> News &amp; Updates
          </Link>
          <h1 className="font-display text-3xl md:text-5xl mt-5 text-white leading-tight">{post.title}</h1>
          <time dateTime={post.date} className="mt-4 flex items-center gap-1.5 text-sm text-white/60">
            <CalendarDays size={14} /> {formatNewsDate(post.date)}
          </time>
        </motion.div>
      </section>

      <article className="bg-white py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-2xl md:rounded-3xl shadow-xl shadow-black/10"
          />
          {post.placeholder && (
            <p className="mt-6 rounded-xl bg-red-50 border border-red-500/20 px-4 py-3 text-xs text-red-700">
              Sample post — content to be replaced by Captains&rsquo; Window.
            </p>
          )}
          <div className="mt-10">
            <PostBody content={post.content} />
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="bg-blue-50 py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reveal className="mb-8">
              <h2 className="font-display text-2xl text-navy-900">More News</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {more.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08} className="h-full">
                  <NewsCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
