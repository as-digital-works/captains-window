import { usePageMeta } from "../hooks/usePageMeta";
import { PageBanner } from "../components/PageBanner";
import { Gallery } from "../components/Gallery";

export function GalleryPage() {
  usePageMeta("Gallery", "Photos and videos from Captains' Window campuses in Calicut, Gurgaon and Ajman, plus student testimonials.");
  return (
    <>
      <PageBanner eyebrow="Gallery" title="Behind the Scenes" />
      <Gallery />
    </>
  );
}
