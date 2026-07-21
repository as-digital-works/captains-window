import { PageBanner } from "../components/PageBanner";
import { Contact } from "../components/Contact";

export function ContactPage() {
  return (
    <>
      <PageBanner eyebrow="Get In Touch" title="Contact Us" />
      <Contact />
    </>
  );
}
