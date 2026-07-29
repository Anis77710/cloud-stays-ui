import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [
      { title: "Profile · Azure & Co." },
      { name: "description", content: "Your account, preferences and activity." },
      { property: "og:title", content: "Profile · Azure & Co." },
      { property: "og:description", content: "Your account, preferences and activity." },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <>
      <PageHeader eyebrow="You" title="Profile" description="Your account across the property." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
        <div className="surface p-6 text-center">
          <div className="relative mx-auto w-fit">
            <Avatar className="size-24 ring-4 ring-gold/20">
              <AvatarImage src="https://i.pravatar.cc/240?u=manager" />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 grid size-8 place-items-center rounded-full border border-border bg-card shadow-soft transition hover:bg-secondary">
              <Camera className="size-4" />
            </button>
          </div>
          <div className="mt-4 font-display text-2xl">Marcus Chen</div>
          <div className="text-xs text-muted-foreground">General Manager · Riviera</div>
          <div className="mt-4 flex justify-center gap-2">
            <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-medium text-gold">Admin</span>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium">2 properties</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="surface p-6">
            <div className="mb-3 text-sm font-medium">Account</div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="text-xs text-muted-foreground">Full name
                <input defaultValue="Marcus Chen" className="mt-1 h-9 w-full rounded-lg border border-input bg-secondary/60 px-3 text-sm text-foreground" />
              </label>
              <label className="text-xs text-muted-foreground">Email
                <input defaultValue="marcus@azureco.com" className="mt-1 h-9 w-full rounded-lg border border-input bg-secondary/60 px-3 text-sm text-foreground" />
              </label>
              <label className="text-xs text-muted-foreground">Phone
                <input defaultValue="+1 415 555 2201" className="mt-1 h-9 w-full rounded-lg border border-input bg-secondary/60 px-3 text-sm text-foreground" />
              </label>
              <label className="text-xs text-muted-foreground">Role
                <input defaultValue="General Manager" className="mt-1 h-9 w-full rounded-lg border border-input bg-secondary/60 px-3 text-sm text-foreground" />
              </label>
            </div>
          </div>
          <div className="surface p-6">
            <div className="mb-3 text-sm font-medium">Activity</div>
            <ol className="relative space-y-4 pl-4">
              <span className="absolute left-1 top-1 bottom-1 w-px bg-border" />
              {[
                { t: "Approved invoice INV-24085", d: "12m ago" },
                { t: "Confirmed Laurent–Moreau Wedding", d: "3h ago" },
                { t: "Adjusted room 205 rate", d: "1d ago" },
                { t: "Signed in from Safari · macOS", d: "2d ago" },
              ].map((e, i) => (
                <li key={i} className="relative text-sm">
                  <span className="absolute -left-3 top-1.5 size-2 rounded-full bg-gold ring-4 ring-gold/15" />
                  <div>{e.t}</div>
                  <div className="text-[11px] text-muted-foreground">{e.d}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
