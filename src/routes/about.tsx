import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, HeartHandshake, Lightbulb, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimulatedNotice } from "@/components/floodsense/SimulatedNotice";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FloodSense — Problem, Solution and Impact" },
      {
        name: "description",
        content:
          "Why FloodSense exists: making flood risk understandable and actionable for households, volunteers and local responders.",
      },
      { property: "og:title", content: "About FloodSense" },
      {
        property: "og:description",
        content: "The problem, the solution, the users and the social impact behind FloodSense.",
      },
    ],
  }),
  component: About,
});

const SECTIONS = [
  {
    icon: AlertTriangle,
    title: "The problem",
    body: "Floods are India's most frequent natural disaster, yet flood information is scattered across bulletins, river gauges and news feeds written for experts. By the time a household understands that it is at risk, the safe window to act has often closed.",
  },
  {
    icon: Lightbulb,
    title: "The solution",
    body: "FloodSense compresses rainfall, river level and drainage capacity into one plain-language risk level per location, then pairs it with specific actions: what to move, what to pack, and what to avoid. A guided assistant, a readiness checklist and an alert center keep preparation practical rather than abstract.",
  },
  {
    icon: Users,
    title: "Who it's for",
    body: "Households in flood-prone wards, students and elderly residents living alone, local volunteers and RWA coordinators, small businesses protecting stock, and municipal teams who need a simple shared view during a monsoon spell.",
  },
  {
    icon: HeartHandshake,
    title: "Social impact",
    body: "Earlier, clearer warnings reduce injuries, property loss and displacement. A shared risk vocabulary helps neighbourhoods coordinate before roads close, and the readiness checklist turns awareness into preparation that lasts beyond a single storm.",
  },
];

function About() {
  return (
    <div className="space-y-6">
      <header className="surface-card hero-gradient space-y-3 p-8">
        <h1 className="text-3xl font-bold sm:text-4xl">About FloodSense</h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          FloodSense was built for HACKDAY 1.0 as a prototype for flood risk awareness and
          preparedness. Tagline: <span className="font-semibold text-foreground">Know the Risk. Stay Ahead.</span>
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {SECTIONS.map(({ icon: Icon, title, body }) => (
          <section key={title} className="surface-card space-y-3 p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
          </section>
        ))}
      </div>

      <section className="surface-card space-y-3 p-6">
        <h2 className="text-lg font-semibold">Scope of this prototype</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Five sample Indian cities with hand-authored, simulated risk profiles.</li>
          <li>• No paid APIs, no live weather feeds and no real emergency alerts.</li>
          <li>• A production version would connect to IMD rainfall data and CWC river gauges.</li>
        </ul>
        <SimulatedNotice />
        <div className="flex flex-wrap gap-2 pt-1">
          <Button asChild>
            <Link to="/">Back to dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/locations">Explore locations</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
