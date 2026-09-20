import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Clock, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/floodsense/RiskBadge";
import { SimulatedNotice } from "@/components/floodsense/SimulatedNotice";
import { DEMO_ALERTS, getLocation, RISK_ORDER, type RiskLevel } from "@/lib/floodsense-data";
import { useFloodSense } from "@/lib/floodsense-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alert Center — FloodSense" },
      {
        name: "description",
        content:
          "Sample flood alerts with location, risk level, timestamp and recommended action. Clearly labelled demo alerts.",
      },
      { property: "og:title", content: "Alert Center — FloodSense" },
      {
        property: "og:description",
        content: "Demo flood alerts showing how FloodSense would surface warnings.",
      },
    ],
  }),
  component: Alerts,
});

function Alerts() {
  const { setLocationId, locationId } = useFloodSense();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<RiskLevel | "All">("All");

  const alerts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DEMO_ALERTS.filter((a) => {
      const loc = getLocation(a.locationId);
      return (
        (filter === "All" || a.risk === filter) &&
        (q === "" || a.title.toLowerCase().includes(q) || loc.name.toLowerCase().includes(q))
      );
    });
  }, [query, filter]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Alert Center</h1>
        <p className="text-sm text-muted-foreground">
          How FloodSense would surface flood warnings. Every entry below is a demo alert.
        </p>
      </header>

      <SimulatedNotice text="DEMO ALERTS: these warnings are fabricated for the HACKDAY 1.0 prototype. They are not issued by any authority and must not be acted on as real warnings." />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search alerts by city or title…"
            className="pl-9"
            aria-label="Search alerts"
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

      <div className="space-y-3">
        {alerts.map((a) => {
          const loc = getLocation(a.locationId);
          return (
            <article key={a.id} className="surface-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <AlertTriangle className="h-3 w-3" /> Demo alert
                  </span>
                  <h2 className="text-lg font-semibold">{a.title}</h2>
                  <p className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {loc.name}, {loc.state}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {a.issued}
                    </span>
                  </p>
                </div>
                <RiskBadge risk={a.risk} size="sm" />
              </div>

              <p className="mt-3 rounded-lg bg-surface px-3 py-2 text-sm">
                <span className="font-semibold">Recommended action: </span>
                {a.action}
              </p>

              <Button
                className="mt-3"
                size="sm"
                variant="outline"
                onClick={() => setLocationId(a.locationId)}
                disabled={a.locationId === locationId}
              >
                {a.locationId === locationId ? "Active location" : `View ${loc.name} on dashboard`}
              </Button>
            </article>
          );
        })}

        {alerts.length === 0 && (
          <div className="surface-card p-10 text-center text-sm text-muted-foreground">
            No demo alerts match these filters.
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
    </div>
  );
}
