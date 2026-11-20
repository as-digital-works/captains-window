import { lazy, Suspense } from "react";
import type { LocationEntry } from "../data/content";

// three.js + react-three are ~1 MB; load them in their own chunk so the rest of the
// site renders without waiting for the globe.
const LocationGlobe = lazy(() => import("./LocationGlobe").then((m) => ({ default: m.LocationGlobe })));

export function LazyLocationGlobe({ locations }: { locations: LocationEntry[] }) {
  return (
    <Suspense fallback={<div className="h-[380px] md:h-[460px] w-full" />}>
      <LocationGlobe locations={locations} />
    </Suspense>
  );
}
