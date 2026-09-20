import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CloudRain, Droplets, Gauge, ShieldCheck, Waves } from "lucide-react";
import { RiskBadge } from "@/components/floodsense/RiskBadge";
import { StatCard } from "@/components/floodsense/StatCard";
import { LocationPicker } from "@/components/floodsense/LocationPicker";
import { SimulatedNotice } from "@/components/floodsense/SimulatedNotice";
import { useFloodSense } from "@/lib/floodsense-store";
import { DEMO_ALERTS, riskStyles } from "@/lib/floodsense-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FloodSense Dashboard — Know the Risk. Stay Ahead." },
      {
        name: "description",
        content:
          "FloodSense is a flood risk awareness dashboard with simulated risk levels, rainfall indicators and preparedness guidance for Indian cities.",
      },
      { property: "og:title", content: "FloodSense Dashboard — Know the Risk. Stay Ahead." },
      {
        property: "og:description",
        content: "Check simulated flood risk, rainfall and preparedness steps for your city.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { location, progress } = useFloodSense();
  const styles = riskStyles[location.risk];
  const alerts = DEMO_ALERTS.filter((a) => a.locationId === location.id);

  return (
    <div className="space-y-6">
      <section className="surface-card hero-gradient overflow-hidden p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Waves className="h-3.5 w-3.5" /> HACKDAY 1.0 · Demo build
            </span>
            <h1 className="text-3xl font-bold sm:text-4xl">Know the Risk. Stay Ahead.</h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              FloodSense turns flood conditions into a clear risk picture and practical steps you can
              take before water reaches your door.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button asChild>
                <Link to="/map">Open risk map</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/checklist">Emergency checklist ({progress}%)</Link>
              </Button>
            </div>
          </div>

          <div className="w-full max-w-xs rounded-xl border border-border bg-background/60 p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Current location</p>
            <p className="mt-1 text-2xl font-bold">{location.name}</p>
            <p className="text-xs text-muted-foreground">{location.state}</p>
            <div className="mt-4">
              <RiskBadge risk={location.risk} />
            </div>
          </div>
        </div>
      </section>

      <SimulatedNotice />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Gauge}
          label="Flood risk level"
          value={location.risk}
          sub="Composite of rainfall, river level and drainage"
          progress={(["Low", "Moderate", "High", "Severe"].indexOf(location.risk) + 1) * 25}
          barClass={styles.bar}
        />
        <StatCard
          icon={CloudRain}
          label="Rainfall (last 24h)"
          value={`${location.rainfall24h} mm`}
          sub={`${location.rainfallForecast} mm expected in next 24h`}
          progress={Math.min(100, (location.rainfall24h / 200) * 100)}
        />
        <StatCard
          icon={Droplets}
          label="River level"
          value={`${location.riverLevel}%`}
          sub="Percentage of the danger mark"
          progress={location.riverLevel}
        />
        <StatCard
          icon={ShieldCheck}
          label="Drainage capacity"
          value={`${location.drainageScore}/100`}
          sub="Higher means water clears faster"
          progress={location.drainageScore}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="surface-card space-y-4 p-6 lg:col-span-2">
          <div>
            <h2 className="text-lg font-semibold">Why this risk level?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{location.explanation}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Preparedness recommendations
            </h3>
            <ul className="mt-3 space-y-2">
              {location.recommendations.map((r) => (
                <li key={r} className="flex items-start gap-2 rounded-lg bg-surface px-3 py-2 text-sm">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {alerts.length > 0 && (
            <div className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <AlertTriangle className="h-4 w-4 text-risk-high" />
                Demo alert for {location.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {alerts[0].title} — {alerts[0].action}
              </p>
              <Link to="/alerts" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
                View alert center →
              </Link>
            </div>
          )}
        </section>

        <section className="surface-card space-y-4 p-6">
          <div>
            <h2 className="text-lg font-semibold">Change location</h2>
            <p className="text-xs text-muted-foreground">
              Selecting a city updates every risk figure on this page.
            </p>
          </div>
          <LocationPicker compact />
        </section>
      </div>
    </div>
  );
}
