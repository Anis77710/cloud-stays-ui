import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { StatusPill } from "@/components/kit/status-pill";
import { spaApi } from "@/lib/api";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/_app/spa")({
  head: () => ({
    meta: [
      { title: "Spa · Azure & Co." },
      { name: "description", content: "Treatments, therapists and today's appointments." },
      { property: "og:title", content: "Spa · Azure & Co." },
      { property: "og:description", content: "Treatments, therapists and today's appointments." },
    ],
  }),
  component: Spa,
});

function Spa() {
  const [appts, setAppts] = useState<Awaited<ReturnType<typeof spaApi.appointments>>>([]);
  const [treatments, setTreatments] = useState<Awaited<ReturnType<typeof spaApi.treatments>>>([]);

  useEffect(() => {
    spaApi.appointments().then(setAppts);
    spaApi.treatments().then(setTreatments);
  }, []);

  return (
    <>
      <PageHeader eyebrow="Wellness" title="Spa" description="A quieter pace, on schedule." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="surface p-5 lg:col-span-2">
          <div className="mb-4 text-sm font-medium">Today's schedule</div>
          <ul className="divide-y divide-border">
            {appts.map((a) => (
              <li key={a.id} className="flex items-center gap-4 py-3">
                <div className="grid size-14 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10">
                  <div className="text-center">
                    <div className="font-display text-lg leading-none">{a.time.split(":")[0]}</div>
                    <div className="text-[10px] text-muted-foreground">:{a.time.split(":")[1]}</div>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{a.guest}</div>
                  <div className="text-xs text-muted-foreground">{a.treatment} · {a.therapist}</div>
                </div>
                <StatusPill status={a.status} />
              </li>
            ))}
          </ul>
        </div>
        <div className="surface p-5">
          <div className="mb-4 text-sm font-medium">Treatments</div>
          <ul className="space-y-3">
            {treatments.map((t) => (
              <li key={t.id} className="surface-lift rounded-xl border border-border p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" /> {t.duration} min
                    </div>
                  </div>
                  <div className="font-display text-lg text-gold">${t.price}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
