import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/kit/stat-card";
import { StatusPill } from "@/components/kit/status-pill";
import { financeApi, reportsApi } from "@/lib/api";
import { CreditCard, PiggyBank, Receipt, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_app/finance")({
  head: () => ({
    meta: [
      { title: "Finance · Azure & Co." },
      { name: "description", content: "Revenue, expenses, invoices and taxes." },
      { property: "og:title", content: "Finance · Azure & Co." },
      { property: "og:description", content: "Revenue, expenses, invoices and taxes." },
    ],
  }),
  component: Finance,
});

const c = (n: number) => `$${n.toLocaleString()}`;

function Finance() {
  const [ov, setOv] = useState<Awaited<ReturnType<typeof financeApi.overview>>>();
  const [inv, setInv] = useState<Awaited<ReturnType<typeof financeApi.invoices>>>([]);
  const [ex, setEx] = useState<Awaited<ReturnType<typeof financeApi.expenses>>>([]);
  const [rep, setRep] = useState<Awaited<ReturnType<typeof reportsApi.summary>>>();

  useEffect(() => {
    financeApi.overview().then(setOv);
    financeApi.invoices().then(setInv);
    financeApi.expenses().then(setEx);
    reportsApi.summary().then(setRep);
  }, []);

  return (
    <>
      <PageHeader eyebrow="Numbers" title="Finance" description="Revenue, spend and everything owed." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard accent label="Revenue YTD" value={ov ? c(ov.revenue) : "—"} icon={TrendingUp} delta={12.8} />
        <StatCard label="Expenses YTD" value={ov ? c(ov.expenses) : "—"} icon={Receipt} delta={4.2} />
        <StatCard label="Net" value={ov ? c(ov.net) : "—"} icon={PiggyBank} delta={16.4} />
        <StatCard label="Outstanding" value={ov ? c(ov.outstanding) : "—"} icon={CreditCard} delta={-3.1} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="surface p-5 lg:col-span-2">
          <div className="mb-3 text-sm font-medium">Revenue trend</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rep?.monthlyRevenue ?? []} margin={{ left: 0, right: 8, top: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="fin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
                <Area type="monotone" dataKey="v" stroke="var(--chart-1)" strokeWidth={2} fill="url(#fin)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="surface p-5">
          <div className="mb-3 text-sm font-medium">Recent expenses</div>
          <ul className="divide-y divide-border">
            {ex.map((e) => (
              <li key={e.id} className="flex items-center justify-between py-2.5">
                <div>
                  <div className="text-sm">{e.label}</div>
                  <div className="text-[11px] text-muted-foreground">{e.category} · {e.date}</div>
                </div>
                <div className="font-medium">${e.amount.toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="surface mt-4 overflow-hidden">
        <div className="border-b border-border p-4 text-sm font-medium">Invoices</div>
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-[11px] uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Code</th>
              <th className="px-5 py-3 font-medium">Guest</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {inv.map((i) => (
              <tr key={i.id} className="border-t border-border">
                <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{i.code}</td>
                <td className="px-5 py-3">{i.guest}</td>
                <td className="px-5 py-3 text-muted-foreground">{i.date}</td>
                <td className="px-5 py-3 font-medium">${i.amount.toLocaleString()}</td>
                <td className="px-5 py-3"><StatusPill status={i.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
