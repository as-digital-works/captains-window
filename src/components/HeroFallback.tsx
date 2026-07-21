import { Plane } from "lucide-react";

export function HeroFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] flex items-end justify-center pb-16 sm:pb-20 md:items-center md:pb-0">
      <Plane
        size={110}
        strokeWidth={1.1}
        className="text-white drop-shadow-[0_0_28px_rgba(232,57,74,0.4)] -rotate-[8deg] md:hidden"
      />
      <Plane
        size={140}
        strokeWidth={1.1}
        className="hidden md:block text-white drop-shadow-[0_0_28px_rgba(232,57,74,0.4)] -rotate-[8deg]"
      />
    </div>
  );
}
