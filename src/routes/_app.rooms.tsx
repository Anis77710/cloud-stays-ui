import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Grid3x3, LayoutList, Plus, Search, Star, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { StatusPill } from "@/components/kit/status-pill";
import { roomsApi } from "@/lib/api";
import type { Room, RoomStatus } from "@/lib/mock-data";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/_app/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms · Azure & Co." },
      { name: "description", content: "Every suite, deluxe and standard room across the property in one place." },
      { property: "og:title", content: "Rooms · Azure & Co." },
      { property: "og:description", content: "Every suite, deluxe and standard room across the property in one place." },
    ],
  }),
  component: Rooms,
});

const filters: (RoomStatus | "all")[] = ["all", "available", "occupied", "cleaning", "maintenance"];

function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof filters)[number]>("all");
  const [selected, setSelected] = useState<Room | null>(null);

  useEffect(() => {
    roomsApi.list().then(setRooms);
  }, []);

  const filtered = useMemo(() => {
    return rooms.filter((r) => {
      if (status !== "all" && r.status !== status) return false;
      if (q && !`${r.number} ${r.type}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [rooms, q, status]);

  return (
    <>
      <PageHeader
        eyebrow="Inventory"
        title="Rooms"
        description="A living map of every key on property. Filter, browse, and dive into any room."
        actions={
          <>
            <div className="flex rounded-lg border border-border bg-card p-0.5">
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                className={`grid size-8 place-items-center rounded-md transition ${view === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
              >
                <Grid3x3 className="size-4" />
              </button>
              <button
                onClick={() => setView("list")}
                aria-label="List view"
                className={`grid size-8 place-items-center rounded-md transition ${view === "list" ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
              >
                <LayoutList className="size-4" />
              </button>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition hover:shadow-lift">
              <Plus className="size-4" /> Add room
            </button>
          </>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setStatus(f)}
              className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition ${
                status === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search rooms…"
            className="h-9 w-64 rounded-lg border border-input bg-secondary/60 pl-8 pr-3 text-sm outline-none focus:border-ring focus:bg-background focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r)}
              className="surface surface-lift group text-left overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={r.image}
                  alt={`Room ${r.number}`}
                  className="size-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest backdrop-blur">
                  {r.type}
                </div>
                <div className="absolute right-3 top-3">
                  <StatusPill status={r.status} />
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="font-display text-2xl leading-none">Room {r.number}</div>
                  <div className="mt-1 flex items-center gap-2 text-[11px] opacity-90">
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3 fill-current" /> {r.rating.toFixed(1)}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="size-3" /> {r.capacity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex flex-wrap gap-1">
                  {r.amenities.slice(0, 2).map((a) => (
                    <span key={a} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                      {a}
                    </span>
                  ))}
                  {r.amenities.length > 2 && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                      +{r.amenities.length - 2}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-display text-xl text-gold">${r.price}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">per night</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="surface overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-[11px] uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-3 font-medium">Room</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Floor</th>
                <th className="px-5 py-3 font-medium">Capacity</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className="cursor-pointer border-b border-border last:border-0 transition hover:bg-secondary/30"
                >
                  <td className="px-5 py-3 font-medium">Room {r.number}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.type}</td>
                  <td className="px-5 py-3 text-muted-foreground">Floor {r.floor}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.capacity}</td>
                  <td className="px-5 py-3 font-medium">${r.price}</td>
                  <td className="px-5 py-3">
                    <StatusPill status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          {selected && (
            <>
              <img src={selected.image} alt="" className="mb-4 aspect-[4/3] w-full rounded-xl object-cover" />
              <SheetHeader className="p-0">
                <SheetTitle className="font-display text-3xl">Room {selected.number}</SheetTitle>
                <SheetDescription>
                  {selected.type} · Floor {selected.floor} · Sleeps {selected.capacity}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 flex items-center justify-between">
                <StatusPill status={selected.status} />
                <div className="text-right">
                  <div className="font-display text-2xl text-gold">${selected.price}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">per night</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">Amenities</div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.amenities.map((a) => (
                    <span key={a} className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Assign guest
                </button>
                <button className="rounded-lg border border-border bg-card px-4 py-2 text-sm">Mark for cleaning</button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
