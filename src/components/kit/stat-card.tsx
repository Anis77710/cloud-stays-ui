import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  suffix,
  hint,
  accent,
}: {
  label: string;
  value: ReactNode;
  delta?: number;
  icon?: LucideIcon;
  suffix?: string;
  hint?: string;
  accent?: boolean;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div
      className={`surface surface-lift group relative overflow-hidden p-5 ${
        accent ? "bg-gradient-to-br from-card via-card to-gold/10" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <div className="font-display text-3xl leading-none text-foreground">{value}</div>
            {suffix && <div className="text-sm text-muted-foreground">{suffix}</div>}
          </div>
          {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
        </div>
        {Icon && (
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-muted-foreground transition group-hover:bg-gold/20 group-hover:text-gold">
            <Icon className="size-4" />
          </div>
        )}
      </div>
      {typeof delta === "number" && (
        <div className="mt-4 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
              positive
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {positive ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {Math.abs(delta).toFixed(1)}%
          </span>
          <span className="text-[11px] text-muted-foreground">vs last week</span>
        </div>
      )}
    </div>
  );
}
