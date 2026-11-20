import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { NewsCard } from "./NewsCard";
import { newsPosts } from "../data/news";

/** Home-page teaser: latest 3 posts + link to /news. */
export function NewsSection() {
  const latest = newsPosts.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section className="relative py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-12 md:mb-14">
          <span className="section-label inline-flex items-center gap-3">
            <span className="h-0.5 w-8 bg-red-600 rounded-full" aria-hidden />
            Captains&rsquo; Window
            <span className="h-0.5 w-8 bg-red-600 rounded-full" aria-hidden />
          </span>
          <h2 className="font-display text-3xl md:text-5xl mt-4 text-navy-900">
            Latest News &amp; <span className="text-gradient-red">Updates</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08} className={`h-full ${i === 2 ? "sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto sm:w-full lg:max-w-none" : ""}`}>
              <NewsCard post={post} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <Link to="/news" className="btn-primary">
            View All News <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
