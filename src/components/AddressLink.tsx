import { ExternalLink, MapPin } from "lucide-react";
import type { LocationEntry } from "../data/content";
import { external, mapsHref } from "../lib/links";

/** Address that opens Google Maps in a new tab. Pin turns red + text underlines on hover/focus. */
export function AddressLink({
  location,
  iconSize = 13,
  className = "",
}: {
  location: Pick<LocationEntry, "mapsUrl" | "address" | "name">;
  iconSize?: number;
  className?: string;
}) {
  if (!location.address) return null;
  return (
    <a
      href={mapsHref(location)}
      {...external}
      aria-label={`${location.address} (opens Google Maps in a new tab)`}
      className={`group flex items-start gap-2 hover:text-navy-900 focus-visible:text-navy-900 transition-colors ${className}`}
    >
      <MapPin
        size={iconSize}
        className="shrink-0 mt-0.5 transition-colors group-hover:text-red-600 group-focus-visible:text-red-600"
      />
      <span className="underline-offset-2 decoration-red-500/60 group-hover:underline group-focus-visible:underline">
        {location.address}
        <ExternalLink
          size={iconSize - 3}
          className="inline-block ml-1 -mt-0.5 opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70 transition-opacity"
          aria-hidden
        />
      </span>
    </a>
  );
}
