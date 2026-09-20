import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/floodsense/RiskBadge";
import { SimulatedNotice } from "@/components/floodsense/SimulatedNotice";
import { getLocation, LOCATIONS, RISK_ORDER, riskStyles } from "@/lib/floodsense-data";
import { useFloodSense } from "@/lib/floodsense-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Flood Risk Map — FloodSense" },
      {
        name: "description",
        content:
          "An illustrative flood risk map with colour-coded markers for five Indian cities using simulated demo data.",
      },
      { property: "og:title", content: "Flood Risk Map — FloodSense" },
      {
        property: "og:description",
        content: "Tap a marker to see simulated flood risk details for that city.",
      },
    ],
  }),
  component: RiskMap,
});

function RiskMap() {
  const { locationId, setLocationId } = useFloodSense();
  const [previewId, setPreviewId] = useState(locationId);
  const preview = getLocation(previewId);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Flood Risk Map</h1>
        <p className="text-sm text-muted-foreground">
          A stylised map view of the demo cities. Markers are placed for illustration only.
        </p>
      </header>

      <SimulatedNotice text="This is an illustrative map interface, not a geographic or live map. Marker positions and risk colours come from simulated demo data." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="surface-card relative overflow-hidden p-4 lg:col-span-2">
          <div
            className="relative h-[420px] w-full overflow-hidden rounded-xl border border-border bg-surface"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in oklab, var(--border) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--border) 60%, transparent) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          >
            <span className="absolute left-4 top-3 text-xs uppercase tracking-wide text-muted-foreground">
              India · schematic view
            </span>

            {LOCATIONS.map((l) => {
              const active = l.id === previewId;
              return (
                <button
                  key={l.id}
                  onClick={() => setPreviewId(l.id)}
                  style={{ top: `${l.map.top}%`, left: `${l.map.left}%` }}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-1 transition-transform hover:scale-110",
                    active && "scale-110",
                  )}
                  aria-label={`${l.name}, ${l.risk} risk`}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full text-background ring-4",
                      riskStyles[l.risk].bar,
                      active ? "ring-primary/60" : riskStyles[l.risk].ring,
                    )}
                  >
                    <MapPin className="h-4.5 w-4.5" strokeWidth={2.5} />
                  </span>
                  <span className="mt-1 block whitespace-nowrap text-xs font-semibold">{l.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="font-medium uppercase tracking-wide">Legend</span>
            {RISK_ORDER.map((r) => (
              <span key={r} className="flex items-center gap-1.5">
                <span className={cn("h-2.5 w-2.5 rounded-full", riskStyles[r].dot)} /> {r}
              </span>
            ))}
          </div>
        </div>

        <aside className="surface-card space-y-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">{preview.name}</h2>
              <p className="text-xs text-muted-foreground">{preview.state}</p>
            </div>
            <RiskBadge risk={preview.risk} size="sm" />
          </div>

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg bg-surface px-3 py-2">
              <dt className="text-xs text-muted-foreground">Rain 24h</dt>
              <dd className="font-semibold">{preview.rainfall24h} mm</dd>
            </div>
            <div className="rounded-lg bg-surface px-3 py-2">
              <dt className="text-xs text-muted-foreground">River level</dt>
              <dd className="font-semibold">{preview.riverLevel}%</dd>
            </div>
          </dl>

          <p className="text-sm leading-relaxed text-muted-foreground">{preview.explanation}</p>

          <ul className="space-y-1.5 text-sm">
            {preview.recommendations.slice(0, 3).map((r) => (
              <li key={r} className="rounded-lg bg-surface px-3 py-2">
                {r}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2">
            <Button onClick={() => setLocationId(preview.id)} disabled={preview.id === locationId}>
              {preview.id === locationId ? "Active on dashboard" : "Set as dashboard location"}
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Open dashboard</Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
