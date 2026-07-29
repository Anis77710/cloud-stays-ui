import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/kit/stat-card";
import { reportsApi } from "@/lib/api";
import { Download, Repeat, Smile, Timer } from "lucide-react";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({
    meta: [
      { title: "Reports · Azure & Co." },
      { name: "description", content: "Deep dives into revenue, occupancy and guest experience." },
      { property: "og:title", content: "Reports · Azure & Co." },
      { property: "og:description", content: "Deep dives into revenue, occupancy and guest experience." },
    ],
  }),
  component: Reports,
});

function Reports() {
  const [r, setR] = useState<Awaited<ReturnType<typeof reportsApi.summary>>>();
  useEffect(() => { reportsApi.summary().then(setR); }, []);

  return (
    <>
      <PageHeader
        eyebrow="Analytics"
        title="Reports"
        description="Numbers that tell a story. Export any view."
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <Download className="size-4" /> Export PDF
          </button>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Guest satisfaction" value={r?.guestSatisfaction ?? "—"} suffix="/ 5" icon={Smile} accent />
        <StatCard label="Repeat guest rate" value={r ? `${Math.round(r.repeatRate * 100)}%` : "—"} icon={Repeat} />
        <StatCard label="Average stay" value={r?.avgStay ?? "—"} suffix="nights" icon={Timer} />
      </div>
      <div className="surface mt-4 p-5">
        <div className="mb-3 text-sm font-medium">Monthly revenue</div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={r?.monthlyRevenue ?? []}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="v" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
