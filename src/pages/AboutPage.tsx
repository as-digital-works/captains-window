import { PageBanner } from "../components/PageBanner";
import { About } from "../components/About";

export function AboutPage() {
  return (
    <>
      <PageBanner eyebrow="About Us" title="Who We Are" />
      <About />
    </>
  );
}
