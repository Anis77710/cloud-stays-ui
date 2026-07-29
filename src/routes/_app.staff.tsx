import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { StatusPill } from "@/components/kit/status-pill";
import { staffApi } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/_app/staff")({
  head: () => ({
    meta: [
      { title: "Staff · Azure & Co." },
      { name: "description", content: "Team, shifts and departments." },
      { property: "og:title", content: "Staff · Azure & Co." },
      { property: "og:description", content: "Team, shifts and departments." },
    ],
  }),
  component: Staff,
});

function Staff() {
  const [staff, setStaff] = useState<Awaited<ReturnType<typeof staffApi.list>>>([]);
  useEffect(() => { staffApi.list().then(setStaff); }, []);

  return (
    <>
      <PageHeader eyebrow="Team" title="Staff" description="Who's on shift and who's off." />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {staff.map((s) => (
          <div key={s.id} className="surface surface-lift p-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-11">
                <AvatarImage src={s.avatar} />
                <AvatarFallback>{s.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{s.name}</div>
                <div className="truncate text-xs text-muted-foreground">{s.role}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium">{s.dept}</span>
              <StatusPill status={s.status} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
