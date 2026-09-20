import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function SimulatedNotice({ className, text }: { className?: string; text?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-xs text-muted-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
      <p>
        {text ??
          "All figures shown are simulated demo data created for HACKDAY 1.0. FloodSense is not connected to any live weather or emergency feed."}
      </p>
    </div>
  );
}
