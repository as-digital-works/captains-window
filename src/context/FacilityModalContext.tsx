import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { LocationEntry } from "../data/content";

type FacilityModalContextValue = {
  location: LocationEntry | null;
  open: (location: LocationEntry) => void;
  close: () => void;
};

const FacilityModalContext = createContext<FacilityModalContextValue | null>(null);

export function FacilityModalProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationEntry | null>(null);

  const value = useMemo(
    () => ({
      location,
      open: (loc: LocationEntry) => setLocation(loc),
      close: () => setLocation(null),
    }),
    [location]
  );

  return <FacilityModalContext.Provider value={value}>{children}</FacilityModalContext.Provider>;
}

export function useFacilityModal() {
  const ctx = useContext(FacilityModalContext);
  if (!ctx) throw new Error("useFacilityModal must be used within FacilityModalProvider");
  return ctx;
}
