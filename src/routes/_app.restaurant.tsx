import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { StatusPill } from "@/components/kit/status-pill";
import { restaurantApi } from "@/lib/api";
import { Users } from "lucide-react";

export const Route = createFileRoute("/_app/restaurant")({
  head: () => ({
    meta: [
      { title: "Restaurant · Azure & Co." },
      { name: "description", content: "Tables, orders and the kitchen pass — one calm view." },
      { property: "og:title", content: "Restaurant · Azure & Co." },
      { property: "og:description", content: "Tables, orders and the kitchen pass — one calm view." },
    ],
  }),
  component: Restaurant,
});

function Restaurant() {
  const [tables, setTables] = useState<Awaited<ReturnType<typeof restaurantApi.tables>>>([]);
  const [orders, setOrders] = useState<Awaited<ReturnType<typeof restaurantApi.orders>>>([]);
  const [menu, setMenu] = useState<Awaited<ReturnType<typeof restaurantApi.menu>>>([]);

  useEffect(() => {
    restaurantApi.tables().then(setTables);
    restaurantApi.orders().then(setOrders);
    restaurantApi.menu().then(setMenu);
  }, []);

  const grouped = menu.reduce<Record<string, typeof menu>>((acc, m) => {
    (acc[m.category] ??= []).push(m);
    return acc;
  }, {});

  return (
    <>
      <PageHeader eyebrow="Food & Beverage" title="Restaurant" description="La Table — the property's flagship dining room." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="surface p-5 lg:col-span-2">
          <div className="mb-4 text-sm font-medium">Floor plan</div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tables.map((t) => (
              <div key={t.id} className="surface-lift rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="font-display text-xl">{t.label}</div>
                  <StatusPill status={t.status} />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Users className="size-3" /> {t.seats} seats</span>
                  <span>{t.guests} guests</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 mb-3 text-sm font-medium">Active orders</div>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-left text-[11px] uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">Table</th>
                  <th className="px-4 py-2 font-medium">Items</th>
                  <th className="px-4 py-2 font-medium">Total</th>
                  <th className="px-4 py-2 font-medium">Time</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{o.table}</td>
                    <td className="px-4 py-3 text-muted-foreground">{o.items}</td>
                    <td className="px-4 py-3">${o.total}</td>
                    <td className="px-4 py-3 text-muted-foreground">{o.time}</td>
                    <td className="px-4 py-3"><StatusPill status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="surface p-5">
          <div className="mb-4 text-sm font-medium">Menu</div>
          <div className="space-y-5">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat}>
                <div className="mb-2 text-[11px] uppercase tracking-widest text-gold">{cat}</div>
                <ul className="space-y-2">
                  {items.map((i) => (
                    <li key={i.id} className="flex items-baseline justify-between gap-3">
                      <span className="text-sm">{i.name}</span>
                      <span className="grow border-b border-dashed border-border" />
                      <span className="text-sm font-medium">${i.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
