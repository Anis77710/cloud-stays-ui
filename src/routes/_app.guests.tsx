import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Mail, MapPin, Phone, Search, Sparkles, Star } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { guestsApi } from "@/lib/api";
import type { Guest } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/_app/guests")({
  head: () => ({
    meta: [
      { title: "Guests · Azure & Co." },
      { name: "description", content: "Guest profiles, loyalty and stay history." },
      { property: "og:title", content: "Guests · Azure & Co." },
      { property: "og:description", content: "Guest profiles, loyalty and stay history." },
    ],
  }),
  component: Guests,
});

const loyaltyTone: Record<Guest["loyalty"], string> = {
  Bronze: "bg-amber-700/15 text-amber-700",
  Silver: "bg-slate-400/15 text-slate-500",
  Gold: "bg-gold/20 text-gold",
  Platinum: "bg-primary/15 text-primary",
};

function Guests() {
  const [data, setData] = useState<Guest[]>([]);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Guest | null>(null);

  useEffect(() => {
    guestsApi.list().then(setData);
  }, []);

  const filtered = useMemo(
    () => data.filter((g) => (q ? `${g.name} ${g.email} ${g.country}`.toLowerCase().includes(q.toLowerCase()) : true)),
    [data, q],
  );

  return (
    <>
      <PageHeader
        eyebrow="Relationships"
        title="Guests"
        description="Everyone who's stayed with us. Loyalty, preferences, and history at a glance."
        actions={
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search guests…"
              className="h-9 w-72 rounded-lg border border-input bg-secondary/60 pl-8 pr-3 text-sm outline-none focus:border-ring focus:bg-background focus:ring-2 focus:ring-ring/20"
            />
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_420px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelected(g)}
              className={`surface surface-lift group text-left p-5 ${selected?.id === g.id ? "border-gold/60" : ""}`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="size-12">
                  <AvatarImage src={g.avatar} />
                  <AvatarFallback>{g.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="truncate font-medium">{g.name}</div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${loyaltyTone[g.loyalty]}`}>
                      {g.loyalty}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="size-3" /> {g.country}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{g.email}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="font-display text-lg">{g.stays}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Stays</div>
                </div>
                <div>
                  <div className="font-display text-lg text-gold">${(g.totalSpent / 1000).toFixed(1)}k</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Spend</div>
                </div>
                <div>
                  <div className="font-display text-lg">{g.lastStay.slice(5)}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Last</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="surface sticky top-24 h-fit p-6">
          {selected ? (
            <>
              <div className="flex items-center gap-4">
                <Avatar className="size-16 ring-2 ring-gold/30">
                  <AvatarImage src={selected.avatar} />
                  <AvatarFallback>{selected.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-display text-2xl">{selected.name}</div>
                  <div className="mt-1 inline-flex items-center gap-1.5">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${loyaltyTone[selected.loyalty]}`}>
                      {selected.loyalty}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-xs text-muted-foreground">
                      <Star className="size-3 fill-gold text-gold" /> 4.9
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="size-4" /> {selected.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-4" /> {selected.phone}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" /> {selected.country}
                </div>
              </div>
              {selected.notes && (
                <div className="mt-6 rounded-lg border border-gold/20 bg-gold/5 p-3 text-xs">
                  <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-gold">
                    <Sparkles className="size-3" /> Concierge note
                  </div>
                  <div className="text-foreground/80">{selected.notes}</div>
                </div>
              )}
              <div className="mt-6 border-t border-border pt-4">
                <div className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">Timeline</div>
                <ol className="relative space-y-3 pl-4">
                  <span className="absolute left-1 top-1 bottom-1 w-px bg-border" />
                  {[
                    { t: "Checked out · Room 205", d: selected.lastStay },
                    { t: "Loyalty upgrade to " + selected.loyalty, d: "2026-04-02" },
                    { t: "First stay", d: "2023-11-14" },
                  ].map((e, i) => (
                    <li key={i} className="relative text-sm">
                      <span className="absolute -left-3 top-1.5 size-2 rounded-full bg-gold ring-4 ring-gold/15" />
                      <div>{e.t}</div>
                      <div className="text-[11px] text-muted-foreground">{e.d}</div>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto grid size-12 place-items-center rounded-full bg-secondary text-muted-foreground">
                <Search className="size-5" />
              </div>
              <div className="mt-3 font-medium">Select a guest</div>
              <div className="text-xs text-muted-foreground">Pick anyone on the left to see their profile.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
