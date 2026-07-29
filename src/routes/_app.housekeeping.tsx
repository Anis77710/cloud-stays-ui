import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { StatusPill } from "@/components/kit/status-pill";
import { housekeepingApi } from "@/lib/api";
import { Clock, User } from "lucide-react";

export const Route = createFileRoute("/_app/housekeeping")({
  head: () => ({
    meta: [
      { title: "Housekeeping · Azure & Co." },
      { name: "description", content: "Cleaning queue, priorities, and staff assignments." },
      { property: "og:title", content: "Housekeeping · Azure & Co." },
      { property: "og:description", content: "Cleaning queue, priorities, and staff assignments." },
    ],
  }),
  component: Housekeeping,
});

type Task = Awaited<ReturnType<typeof housekeepingApi.list>>[number];

const columns: { key: Task["status"]; label: string }[] = [
  { key: "queued", label: "Queued" },
  { key: "in-progress", label: "In progress" },
  { key: "done", label: "Done" },
];

function Housekeeping() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    housekeepingApi.list().then((t) => setTasks(t as unknown as Task[]));
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Housekeeping"
        description="A calm board for the cleaning brigade. Priority, assignee, and ETA — always visible."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {columns.map((col) => {
          const list = tasks.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-medium">{col.label}</div>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                  {list.length}
                </span>
              </div>
              <div className="space-y-2">
                {list.map((t) => (
                  <div
                    key={t.id}
                    className="group rounded-xl border border-border bg-card p-3 transition hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-soft"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-display text-lg">Room {t.room}</div>
                      <StatusPill status={t.priority} />
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">{t.type}</div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <User className="size-3" /> {t.assignee}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" /> {t.eta}
                      </span>
                    </div>
                  </div>
                ))}
                {list.length === 0 && (
                  <div className="rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                    Nothing here.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
