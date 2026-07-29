import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Download, Filter, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { StatusPill } from "@/components/kit/status-pill";
import { reservationsApi } from "@/lib/api";
import type { Reservation, ReservationStatus } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/_app/reservations")({
  head: () => ({
    meta: [
      { title: "Reservations · Azure & Co." },
      { name: "description", content: "Search, filter and manage every reservation across your property." },
      { property: "og:title", content: "Reservations · Azure & Co." },
      { property: "og:description", content: "Search, filter and manage every reservation across your property." },
    ],
  }),
  component: Reservations,
});

const currency = (n: number) => `$${n.toLocaleString()}`;
const statuses: (ReservationStatus | "all")[] = ["all", "upcoming", "checked-in", "checked-out", "cancelled", "pending"];

function Reservations() {
  const [data, setData] = useState<Reservation[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("all");

  useEffect(() => {
    reservationsApi.list().then(setData);
  }, []);

  const filtered = useMemo(() => {
    return data.filter((r) => {
      if (status !== "all" && r.status !== status) return false;
      if (q && !`${r.guestName} ${r.code} ${r.room}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [data, q, status]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: data.length };
    for (const r of data) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [data]);

  return (
    <>
      <PageHeader
        eyebrow="Front Desk"
        title="Reservations"
        description="A calm, precise ledger of every stay. Search, filter and drill in with a click."
        actions={
          <>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm transition hover:border-gold/50">
              <Download className="size-4 text-muted-foreground" /> Export
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition hover:shadow-lift">
              <Plus className="size-4" /> New reservation
            </button>
          </>
        }
      />

      <div className="surface overflow-hidden">
        {/* Filters bar */}
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize transition ${
                  status === s
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                }`}
              >
                {s.replace(/-/g, " ")}
                <span className={`text-[10px] ${status === s ? "opacity-80" : "opacity-60"}`}>
                  {counts[s] ?? 0}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search guest, code, room…"
                className="h-9 w-64 rounded-lg border border-input bg-secondary/60 pl-8 pr-3 text-sm outline-none focus:border-ring focus:bg-background focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition hover:border-gold/50 hover:text-foreground">
              <CalendarDays className="size-4" />
              Dates
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition hover:border-gold/50 hover:text-foreground">
              <Filter className="size-4" />
              More
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-[11px] uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-3 font-medium">Code</th>
                <th className="px-5 py-3 font-medium">Guest</th>
                <th className="px-5 py-3 font-medium">Room</th>
                <th className="px-5 py-3 font-medium">Check-in → out</th>
                <th className="px-5 py-3 font-medium">Nights</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="group border-b border-border last:border-0 transition hover:bg-secondary/30">
                  <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{r.code}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={r.guestAvatar} />
                        <AvatarFallback>{r.guestName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="truncate font-medium">{r.guestName}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {r.guests} {r.guests > 1 ? "guests" : "guest"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-medium">{r.room}</div>
                    <div className="text-[11px] text-muted-foreground">{r.roomType}</div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {r.checkIn} → {r.checkOut}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{r.nights}</td>
                  <td className="px-5 py-4 text-muted-foreground">{r.source}</td>
                  <td className="px-5 py-4 font-medium">{currency(r.total)}</td>
                  <td className="px-5 py-4">
                    <StatusPill status={r.status} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <div className="mx-auto max-w-sm">
                      <div className="mx-auto grid size-12 place-items-center rounded-full bg-secondary text-muted-foreground">
                        <Search className="size-5" />
                      </div>
                      <div className="mt-3 font-medium">No reservations match</div>
                      <div className="text-xs text-muted-foreground">Try clearing filters or adjusting your search.</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
          <div>
            Showing <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
            <span className="font-medium text-foreground">{data.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="rounded-md border border-border px-2 py-1 hover:bg-secondary">Previous</button>
            <button className="rounded-md border border-border bg-secondary px-2 py-1">1</button>
            <button className="rounded-md border border-border px-2 py-1 hover:bg-secondary">2</button>
            <button className="rounded-md border border-border px-2 py-1 hover:bg-secondary">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}
