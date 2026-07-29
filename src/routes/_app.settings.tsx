import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Azure & Co." },
      { name: "description", content: "Hotel info, appearance, taxes and preferences." },
      { property: "og:title", content: "Settings · Azure & Co." },
      { property: "og:description", content: "Hotel info, appearance, taxes and preferences." },
    ],
  }),
  component: Settings,
});

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 border-b border-border py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Settings() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <PageHeader eyebrow="Preferences" title="Settings" description="Tune the property, the interface and the essentials." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr]">
        <nav className="surface h-fit p-2 text-sm">
          {["Hotel information", "Appearance", "Notifications", "Taxes & currency", "Security"].map((s, i) => (
            <button
              key={s}
              className={`block w-full rounded-lg px-3 py-2 text-left transition ${i === 0 ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60"}`}
            >
              {s}
            </button>
          ))}
        </nav>
        <div className="surface p-6">
          <Row label="Hotel name" hint="Displayed across guest-facing surfaces">
            <input defaultValue="Azure & Co. Riviera" className="h-9 w-72 rounded-lg border border-input bg-secondary/60 px-3 text-sm outline-none focus:border-ring focus:bg-background" />
          </Row>
          <Row label="Appearance" hint="Light or dark, project-wide">
            <div className="flex gap-1 rounded-lg border border-border p-0.5 text-xs">
              {(["light", "dark"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`rounded-md px-3 py-1.5 capitalize transition ${theme === t ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Row>
          <Row label="Currency" hint="Used for all invoices and reports">
            <select className="h-9 rounded-lg border border-input bg-secondary/60 px-3 text-sm outline-none">
              <option>USD $</option>
              <option>EUR €</option>
              <option>GBP £</option>
              <option>JPY ¥</option>
            </select>
          </Row>
          <Row label="Language">
            <select className="h-9 rounded-lg border border-input bg-secondary/60 px-3 text-sm outline-none">
              <option>English</option>
              <option>Français</option>
              <option>Español</option>
              <option>日本語</option>
            </select>
          </Row>
          <Row label="Guest email notifications" hint="Send arrival, welcome and folio emails automatically">
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <span className="h-6 w-11 rounded-full bg-secondary transition peer-checked:bg-gold" />
              <span className="absolute left-1 top-1 size-4 rounded-full bg-white transition peer-checked:translate-x-5" />
            </label>
          </Row>
          <div className="mt-6 flex justify-end gap-2">
            <button className="rounded-lg border border-border px-4 py-2 text-sm">Cancel</button>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Save changes</button>
          </div>
        </div>
      </div>
    </>
  );
}
