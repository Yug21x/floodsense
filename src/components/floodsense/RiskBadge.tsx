import { cn } from "@/lib/utils";
import { riskStyles, type RiskLevel } from "@/lib/floodsense-data";

export function RiskBadge({
  risk,
  className,
  size = "md",
}: {
  risk: RiskLevel;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-semibold",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        riskStyles[risk].badge,
        className,
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", riskStyles[risk].dot)} />
      {risk} risk
    </span>
  );
}
