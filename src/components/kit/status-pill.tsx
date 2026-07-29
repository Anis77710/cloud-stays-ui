import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  available: "bg-success/12 text-success border-success/25",
  occupied: "bg-info/12 text-info border-info/25",
  cleaning: "bg-warning/15 text-warning border-warning/30",
  maintenance: "bg-destructive/12 text-destructive border-destructive/25",
  upcoming: "bg-info/12 text-info border-info/25",
  "checked-in": "bg-success/12 text-success border-success/25",
  "checked-out": "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/12 text-destructive border-destructive/25",
  pending: "bg-warning/15 text-warning border-warning/30",
  paid: "bg-success/12 text-success border-success/25",
  overdue: "bg-destructive/12 text-destructive border-destructive/25",
  confirmed: "bg-success/12 text-success border-success/25",
  reserved: "bg-info/12 text-info border-info/25",
  preparing: "bg-warning/15 text-warning border-warning/30",
  served: "bg-success/12 text-success border-success/25",
  billed: "bg-muted text-muted-foreground border-border",
  done: "bg-success/12 text-success border-success/25",
  queued: "bg-muted text-muted-foreground border-border",
  "in-progress": "bg-warning/15 text-warning border-warning/30",
  ok: "bg-success/12 text-success border-success/25",
  low: "bg-warning/15 text-warning border-warning/30",
  "on-shift": "bg-success/12 text-success border-success/25",
  off: "bg-muted text-muted-foreground border-border",
  high: "bg-destructive/12 text-destructive border-destructive/25",
  medium: "bg-warning/15 text-warning border-warning/30",
};

export function StatusPill({ status, className }: { status: string; className?: string }) {
  const tone = tones[status] ?? "bg-muted text-muted-foreground border-border";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize",
        tone,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-80" />
      {status.replace(/-/g, " ")}
    </span>
  );
}
