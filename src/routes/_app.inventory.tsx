import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { StatusPill } from "@/components/kit/status-pill";
import { inventoryApi } from "@/lib/api";

export const Route = createFileRoute("/_app/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory · Azure & Co." },
      { name: "description", content: "Linens, amenities, F&B and suppliers." },
      { property: "og:title", content: "Inventory · Azure & Co." },
      { property: "og:description", content: "Linens, amenities, F&B and suppliers." },
    ],
  }),
  component: Inventory,
});

function Inventory() {
  const [items, setItems] = useState<Awaited<ReturnType<typeof inventoryApi.list>>>([]);
  const [sup, setSup] = useState<Awaited<ReturnType<typeof inventoryApi.suppliers>>>([]);

  useEffect(() => {
    inventoryApi.list().then(setItems);
    inventoryApi.suppliers().then(setSup);
  }, []);

  return (
    <>
      <PageHeader eyebrow="Stockroom" title="Inventory" description="What's on hand, what's running low." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="surface overflow-hidden lg:col-span-2">
          <div className="border-b border-border p-4 text-sm font-medium">Stock</div>
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-left text-[11px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">Item</th>
                <th className="px-5 py-3 font-medium">SKU</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Min</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-t border-border">
                  <td className="px-5 py-3">
                    <div className="font-medium">{i.name}</div>
                    <div className="text-[11px] text-muted-foreground">{i.supplier}</div>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{i.sku}</td>
                  <td className="px-5 py-3 font-medium">{i.stock}</td>
                  <td className="px-5 py-3 text-muted-foreground">{i.min}</td>
                  <td className="px-5 py-3"><StatusPill status={i.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="surface p-5">
          <div className="mb-3 text-sm font-medium">Suppliers</div>
          <ul className="space-y-3">
            {sup.map((s) => (
              <li key={s.id} className="surface-lift rounded-xl border border-border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-[11px] text-muted-foreground">{s.category}</div>
                  </div>
                  <div className="text-xs text-gold">★ {s.rating}</div>
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">{s.contact}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
