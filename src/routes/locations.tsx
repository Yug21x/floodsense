import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CloudRain, Droplets, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/floodsense/RiskBadge";
import { SimulatedNotice } from "@/components/floodsense/SimulatedNotice";
import { LOCATIONS, RISK_ORDER, riskStyles, type RiskLevel } from "@/lib/floodsense-data";
import { useFloodSense } from "@/lib/floodsense-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Location Explorer — FloodSense" },
      {
        name: "description",
        content:
          "Browse simulated flood risk profiles for Delhi, Guwahati, Patna, Mumbai and Chennai and set your active location.",
      },
      { property: "og:title", content: "Location Explorer — FloodSense" },
      {
        property: "og:description",
        content: "Compare simulated flood risk across five Indian cities.",
      },
    ],
  }),
  component: LocationExplorer,
});

function LocationExplorer() {
  const { locationId, setLocationId } = useFloodSense();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<RiskLevel | "All">("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LOCATIONS.filter(
      (l) =>
        (filter === "All" || l.risk === filter) &&
        (q === "" || l.name.toLowerCase().includes(q) || l.state.toLowerCase().includes(q)),
    );
  }, [query, filter]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Location Explorer</h1>
        <p className="text-sm text-muted-foreground">
          Five sample Indian cities with simulated flood profiles. Select one to drive the dashboard.
        </p>
      </header>

      <SimulatedNotice />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Delhi, Mumbai, Assam…"
            className="pl-9"
            aria-label="Search locations"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["All", ...RISK_ORDER] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((l) => {
          const active = l.id === locationId;
          return (
            <article
              key={l.id}
              className={cn(
                "surface-card flex flex-col gap-4 p-5 transition-colors",
                active && "border-primary",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">{l.name}</h2>
                  <p className="text-xs text-muted-foreground">{l.state}</p>
                </div>
                <RiskBadge risk={l.risk} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-surface px-3 py-2">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CloudRain className="h-3.5 w-3.5" /> Rain 24h
                  </p>
                  <p className="font-semibold">{l.rainfall24h} mm</p>
                </div>
                <div className="rounded-lg bg-surface px-3 py-2">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Droplets className="h-3.5 w-3.5" /> River level
                  </p>
                  <p className="font-semibold">{l.riverLevel}%</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">{l.explanation}</p>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className={cn("h-full rounded-full", riskStyles[l.risk].bar)}
                  style={{ width: `${(RISK_ORDER.indexOf(l.risk) + 1) * 25}%` }}
                />
              </div>

              <div className="mt-auto flex gap-2">
                <Button
                  className="flex-1"
                  variant={active ? "secondary" : "default"}
                  onClick={() => setLocationId(l.id)}
                >
                  {active ? "Selected" : "Select location"}
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">Dashboard</Link>
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      {results.length === 0 && (
        <div className="surface-card p-10 text-center text-sm text-muted-foreground">
          No demo locations match these filters.
          <div className="mt-3">
            <Button
              variant="outline"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
            >
              Reset filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
