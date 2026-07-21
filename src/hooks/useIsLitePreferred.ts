import { useEffect, useState } from "react";

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function useIsLitePreferred() {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 2;
    const hasWebGL = detectWebGL();

    setLite(reducedMotion || isMobile || lowCores || !hasWebGL);
  }, []);

  return lite;
}
