import { useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LOCATIONS, riskStyles } from "@/lib/floodsense-data";
import { useFloodSense } from "@/lib/floodsense-store";
import { cn } from "@/lib/utils";

export function LocationPicker({ compact = false }: { compact?: boolean }) {
  const { locationId, setLocationId } = useFloodSense();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LOCATIONS;
    return LOCATIONS.filter(
      (l) => l.name.toLowerCase().includes(q) || l.state.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a city or state…"
          className="pl-9"
          aria-label="Search location"
        />
      </div>

      <div className={cn("grid gap-2", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
        {results.map((l) => {
          const active = l.id === locationId;
          return (
            <button
              key={l.id}
              onClick={() => setLocationId(l.id)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors",
                active
                  ? "border-primary bg-primary/10"
                  : "border-border bg-surface hover:border-primary/50 hover:bg-surface-2",
              )}
            >
              <span className="flex items-center gap-2">
                <MapPin className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")} />
                <span>
                  <span className="block text-sm font-semibold">{l.name}</span>
                  <span className="block text-xs text-muted-foreground">{l.state}</span>
                </span>
              </span>
              <span className={cn("h-2.5 w-2.5 rounded-full", riskStyles[l.risk].dot)} title={`${l.risk} risk`} />
            </button>
          );
        })}
        {results.length === 0 && (
          <div className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-sm text-muted-foreground">
            No demo location matches “{query}”.
            <div className="mt-2">
              <Button variant="outline" size="sm" onClick={() => setQuery("")}>
                Clear search
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
