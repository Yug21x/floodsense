import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CHECKLIST_ITEMS, getLocation, LOCATIONS, type FloodLocation } from "./floodsense-data";

type Store = {
  locationId: string;
  location: FloodLocation;
  setLocationId: (id: string) => void;
  checked: string[];
  toggleItem: (id: string) => void;
  resetChecklist: () => void;
  progress: number;
};

const FloodSenseContext = createContext<Store | null>(null);

const STORAGE_KEY = "floodsense-state-v1";

export function FloodSenseProvider({ children }: { children: ReactNode }) {
  const [locationId, setLocationId] = useState<string>(LOCATIONS[0].id);
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { locationId?: string; checked?: string[] };
      if (parsed.locationId && LOCATIONS.some((l) => l.id === parsed.locationId)) {
        setLocationId(parsed.locationId);
      }
      if (Array.isArray(parsed.checked)) setChecked(parsed.checked);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ locationId, checked }));
    } catch {
      /* ignore */
    }
  }, [locationId, checked]);

  const value = useMemo<Store>(() => {
    const progress = Math.round((checked.length / CHECKLIST_ITEMS.length) * 100);
    return {
      locationId,
      location: getLocation(locationId),
      setLocationId,
      checked,
      toggleItem: (id: string) =>
        setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      resetChecklist: () => setChecked([]),
      progress,
    };
  }, [locationId, checked]);

  return <FloodSenseContext.Provider value={value}>{children}</FloodSenseContext.Provider>;
}

export function useFloodSense() {
  const ctx = useContext(FloodSenseContext);
  if (!ctx) throw new Error("useFloodSense must be used inside FloodSenseProvider");
  return ctx;
}
