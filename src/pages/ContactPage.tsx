import { usePageMeta } from "../hooks/usePageMeta";
import { PageBanner } from "../components/PageBanner";
import { Contact } from "../components/Contact";

export function ContactPage() {
  usePageMeta("Contact Us", "Contact Captains' Window in Calicut, Gurgaon or Ajman — phone, WhatsApp, email and directions.");
  return (
    <>
      <PageBanner eyebrow="Get In Touch" title="Contact Us" />
      <Contact />
    </>
  );
}
