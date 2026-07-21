import { PageBanner } from "../components/PageBanner";
import { Gallery } from "../components/Gallery";

export function GalleryPage() {
  return (
    <>
      <PageBanner eyebrow="Gallery" title="Behind the Scenes" />
      <Gallery />
    </>
  );
}
