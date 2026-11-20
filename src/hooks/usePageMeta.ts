import { useEffect } from "react";

const SITE = "Captains' Window Aviation Solutions";
const DEFAULT_DESCRIPTION =
  "Captains' Window Aviation Solutions — A Global Aviation Training Ecosystem. Where Dreams Take Flight.";

/** Sets the document title and meta description for the current page. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Pilot Training, Calicut`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description ?? DEFAULT_DESCRIPTION;
  }, [title, description]);
}
