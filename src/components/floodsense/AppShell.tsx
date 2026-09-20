import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  CheckSquare,
  Compass,
  Info,
  LayoutDashboard,
  Map,
  Menu,
  MessageCircle,
  Waves,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/locations", label: "Locations", icon: Compass },
  { to: "/map", label: "Risk Map", icon: Map },
  { to: "/assistant", label: "AI Assistant", icon: MessageCircle },
  { to: "/checklist", label: "Checklist", icon: CheckSquare },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/about", label: "About", icon: Info },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Waves className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-bold leading-none">FloodSense</span>
              <span className="block text-[11px] text-muted-foreground">Know the Risk. Stay Ahead.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                activeProps={{ className: "bg-primary/15 text-primary hover:bg-primary/15 hover:text-primary" }}
                activeOptions={{ exact: to === "/" }}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <button
            className="rounded-lg border border-border p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-border bg-background px-4 pb-4 pt-2 lg:hidden">
            {NAV.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground"
                activeProps={{ className: "bg-primary/15 text-primary" }}
                activeOptions={{ exact: to === "/" }}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className={cn("mx-auto w-full max-w-7xl px-4 py-8")}>{children}</main>

      <footer className="border-t border-border py-6">
        <div className="mx-auto max-w-7xl px-4 text-xs text-muted-foreground">
          FloodSense — HACKDAY 1.0 prototype. All risk levels, rainfall figures and alerts are
          simulated demo data, not live forecasts. In a real emergency, follow official local
          authorities.
        </div>
      </footer>
    </div>
  );
}
