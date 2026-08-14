import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Smooth-scrolls to the element matching the current URL hash, if any. */
export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);

    const scrollToTarget = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // First pass once the target's content is in the DOM. Images below the
    // fold (in the location cards/globes above it) can still shift layout
    // as they finish loading after that, so a second corrective pass
    // re-aligns to the same element once things have settled.
    const firstPass = setTimeout(scrollToTarget, 150);
    const secondPass = setTimeout(scrollToTarget, 700);
    return () => {
      clearTimeout(firstPass);
      clearTimeout(secondPass);
    };
  }, [hash]);
}
