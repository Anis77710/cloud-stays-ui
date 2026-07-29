import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { StatusPill } from "@/components/kit/status-pill";
import { eventsApi } from "@/lib/api";
import { Calendar, Users } from "lucide-react";

export const Route = createFileRoute("/_app/events")({
  head: () => ({
    meta: [
      { title: "Events · Azure & Co." },
      { name: "description", content: "Weddings, conferences and private hires." },
      { property: "og:title", content: "Events · Azure & Co." },
      { property: "og:description", content: "Weddings, conferences and private hires." },
    ],
  }),
  component: Events,
});

function Events() {
  const [events, setEvents] = useState<Awaited<ReturnType<typeof eventsApi.list>>>([]);
  useEffect(() => { eventsApi.list().then(setEvents); }, []);

  return (
    <>
      <PageHeader eyebrow="Occasions" title="Events" description="Every gathering the property will host, from intimate to grand." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => (
          <div key={e.id} className="surface surface-lift p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-display text-xl leading-tight">{e.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{e.hall}</div>
              </div>
              <StatusPill status={e.status} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="size-3.5" /> {e.date}
              </div>
              <div className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Users className="size-3.5" /> {e.guests} guests
              </div>
            </div>
            <div className="mt-4 border-t border-border pt-3 text-right">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Package</div>
              <div className="font-display text-2xl text-gold">${e.revenue.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
