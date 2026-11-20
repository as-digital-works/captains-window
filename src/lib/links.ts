import type { LocationEntry } from "../data/content";

/** `tel:` href from a display-formatted phone number ("+91 8606 74 5000" → "tel:+918606745000"). */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Google Maps search URL for a free-text query (no API key needed). */
export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Pin link if the client supplied one, otherwise a Maps search for the address. */
export function mapsHref(location: Pick<LocationEntry, "mapsUrl" | "address" | "name">) {
  if (location.mapsUrl) return location.mapsUrl;
  return mapsSearchUrl(location.address ?? location.name);
}

/** No-API-key embeddable map for an address. */
export function mapEmbedSrc(address: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;
}

/** Shared props for every external link: new tab, no opener/referrer leak. */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;
