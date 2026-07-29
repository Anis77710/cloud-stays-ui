import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CalendarCheck2,
  BedDouble,
  Users,
  Sparkles,
  UtensilsCrossed,
  Flower2,
  PartyPopper,
  UserCog,
  Wallet,
  Package,
  BarChart3,
  MessagesSquare,
  Settings,
  User,
  Hotel,
} from "lucide-react";

const nav = [
  { section: "Overview", items: [
    { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/reservations", label: "Reservations", icon: CalendarCheck2 },
    { to: "/rooms", label: "Rooms", icon: BedDouble },
    { to: "/guests", label: "Guests", icon: Users },
  ]},
  { section: "Operations", items: [
    { to: "/housekeeping", label: "Housekeeping", icon: Sparkles },
    { to: "/restaurant", label: "Restaurant", icon: UtensilsCrossed },
    { to: "/spa", label: "Spa", icon: Flower2 },
    { to: "/events", label: "Events", icon: PartyPopper },
  ]},
  { section: "Business", items: [
    { to: "/staff", label: "Staff", icon: UserCog },
    { to: "/finance", label: "Finance", icon: Wallet },
    { to: "/inventory", label: "Inventory", icon: Package },
    { to: "/reports", label: "Reports", icon: BarChart3 },
  ]},
  { section: "Account", items: [
    { to: "/messages", label: "Messages", icon: MessagesSquare },
    { to: "/settings", label: "Settings", icon: Settings },
    { to: "/profile", label: "Profile", icon: User },
  ]},
] as const;

export function AppSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <>
      {/* Mobile backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-foreground/40 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Hotel className="size-4" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-xl leading-none">Azure &amp; Co.</div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Hotel Management
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {nav.map((group) => (
            <div key={group.section} className="mb-5">
              <div className="px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
                {group.section}
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.to, (item as { exact?: boolean }).exact);
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={onClose}
                        className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gold" />
                        )}
                        <Icon className={`size-4 shrink-0 ${active ? "text-gold" : ""}`} />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="glass flex items-center gap-3 rounded-xl p-3">
            <div className="grid size-10 place-items-center rounded-lg bg-gradient-to-br from-gold/40 to-gold/10 text-gold-foreground">
              <Sparkles className="size-4 text-gold" />
            </div>
            <div className="min-w-0 flex-1 text-xs">
              <div className="font-medium text-foreground">Upgrade to Suite</div>
              <div className="truncate text-muted-foreground">Multi-property tools</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
