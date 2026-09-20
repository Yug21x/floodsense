import { createFileRoute } from "@tanstack/react-router";
import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimulatedNotice } from "@/components/floodsense/SimulatedNotice";
import { CHECKLIST_ITEMS } from "@/lib/floodsense-data";
import { useFloodSense } from "@/lib/floodsense-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checklist")({
  head: () => ({
    meta: [
      { title: "Emergency Checklist — FloodSense" },
      {
        name: "description",
        content:
          "Track your flood emergency kit: drinking water, first aid, flashlight, documents and emergency contacts.",
      },
      { property: "og:title", content: "Emergency Checklist — FloodSense" },
      {
        property: "og:description",
        content: "Tick off essentials and watch your flood readiness progress update.",
      },
    ],
  }),
  component: Checklist,
});

function Checklist() {
  const { checked, toggleItem, resetChecklist, progress } = useFloodSense();
  const done = checked.length;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Emergency Checklist</h1>
        <p className="text-sm text-muted-foreground">
          Prepare your kit before the water rises. Your progress is saved on this device.
        </p>
      </header>

      <section className="surface-card p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Readiness</p>
            <p className="text-4xl font-bold">{progress}%</p>
            <p className="text-sm text-muted-foreground">
              {done} of {CHECKLIST_ITEMS.length} essentials ready
            </p>
          </div>
          <Button variant="outline" onClick={resetChecklist} disabled={done === 0}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              progress === 100 ? "bg-risk-low" : "bg-primary",
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <p className="mt-3 text-sm font-medium text-risk-low">
            Your basic flood kit is complete. Review it again before each monsoon season.
          </p>
        )}
      </section>

      <div className="grid gap-3">
        {CHECKLIST_ITEMS.map((item) => {
          const isDone = checked.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              aria-pressed={isDone}
              className={cn(
                "flex items-center gap-4 rounded-xl border px-4 py-4 text-left transition-colors",
                isDone
                  ? "border-risk-low/40 bg-risk-low/10"
                  : "border-border bg-card hover:border-primary/50",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border",
                  isDone ? "border-risk-low bg-risk-low text-background" : "border-border",
                )}
              >
                {isDone && <Check className="h-4 w-4" strokeWidth={3} />}
              </span>
              <span>
                <span className={cn("block font-semibold", isDone && "line-through opacity-70")}>
                  {item.label}
                </span>
                <span className="block text-xs text-muted-foreground">{item.hint}</span>
              </span>
            </button>
          );
        })}
      </div>

      <SimulatedNotice text="This checklist is general preparedness guidance for the HACKDAY 1.0 demo and does not replace official emergency instructions." />
    </div>
  );
}
