import { PageBanner } from "../components/PageBanner";
import { Reveal } from "../components/Reveal";
import { NewsCard } from "../components/NewsCard";
import { CtaBand } from "../components/CtaBand";
import { newsPosts } from "../data/news";
import { usePageMeta } from "../hooks/usePageMeta";

export function NewsPage() {
  usePageMeta(
    "News & Updates",
    "The latest news, batch announcements, DGCA exam tips and facility updates from Captains' Window Aviation Solutions."
  );

  return (
    <>
      <PageBanner eyebrow="Captains' Window" title={<>News &amp; <span className="text-gradient-red">Updates</span></>} />
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {newsPosts.length === 0 ? (
            <p className="text-center text-ink-600">No news yet — check back soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsPosts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.08} className="h-full">
                  <NewsCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
