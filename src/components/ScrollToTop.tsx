import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to the top on page change, or to the #section in the URL when there is one. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the new page has rendered before looking for the section.
      const id = decodeURIComponent(hash.slice(1));
      const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
