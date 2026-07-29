import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from "recharts";
import {
  Bed,
  CalendarCheck,
  DoorOpen,
  KeyRound,
  LogIn,
  LogOut,
  TrendingUp,
  Users,
  Wallet,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/kit/stat-card";
import { StatusPill } from "@/components/kit/status-pill";
import { dashboardApi, reservationsApi, roomsApi } from "@/lib/api";
import type { Reservation, Room } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Azure & Co. Hotel Management" },
      { name: "description", content: "Live overview of occupancy, revenue, arrivals, and hotel operations." },
      { property: "og:title", content: "Dashboard · Azure & Co." },
      { property: "og:description", content: "Live overview of occupancy, revenue, arrivals, and hotel operations." },
    ],
  }),
  component: Dashboard,
});

const currency = (n: number) => `$${n.toLocaleString()}`;

function Dashboard() {
  const [overview, setOverview] = useState<Awaited<ReturnType<typeof dashboardApi.getOverview>>>();
  const [revenue, setRevenue] = useState<Awaited<ReturnType<typeof dashboardApi.getRevenue>>>([]);
  const [occ, setOcc] = useState<Awaited<ReturnType<typeof dashboardApi.getOccupancy>>>([]);
  const [channels, setChannels] = useState<Awaited<ReturnType<typeof dashboardApi.getBookingTrends>>>([]);
  const [activities, setActivities] = useState<Awaited<ReturnType<typeof dashboardApi.getActivities>>>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    dashboardApi.getOverview().then(setOverview);
    dashboardApi.getRevenue().then(setRevenue);
    dashboardApi.getOccupancy().then(setOcc);
    dashboardApi.getBookingTrends().then(setChannels);
    dashboardApi.getActivities().then(setActivities);
    reservationsApi.list().then(setReservations);
    roomsApi.list().then(setRooms);
  }, []);

  const upcoming = reservations.filter((r) => r.status === "upcoming" || r.status === "checked-in").slice(0, 5);

  return (
    <>
      <PageHeader
        eyebrow="Wednesday · July 29, 2026"
        title="Good morning, Marcus."
        description="Here's what's happening across the property today. Occupancy is up 5.1% and today's arrivals are looking healthy."
        actions={
          <>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm transition hover:border-gold/50">
              <MapPin className="size-4 text-muted-foreground" /> Property · Riviera
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition hover:shadow-lift">
              <CalendarCheck className="size-4" /> New reservation
            </button>
          </>
        }
      />

      {/* Stat grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          accent
          label="Revenue today"
          value={overview ? currency(overview.revenue.value) : "—"}
          delta={overview?.revenue.delta}
          icon={Wallet}
          hint="Target $78,000"
        />
        <StatCard
          label="Occupied rooms"
          value={overview?.occupied.value ?? "—"}
          suffix={overview ? `/ ${overview.occupied.total}` : ""}
          delta={overview?.occupied.delta}
          icon={Bed}
        />
        <StatCard
          label="Check-ins today"
          value={overview?.todayCheckins.value ?? "—"}
          delta={overview?.todayCheckins.delta}
          icon={LogIn}
        />
        <StatCard
          label="Check-outs today"
          value={overview?.todayCheckouts.value ?? "—"}
          delta={overview?.todayCheckouts.delta}
          icon={LogOut}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Available"
          value={overview?.available.value ?? "—"}
          suffix={overview ? `/ ${overview.available.total}` : ""}
          icon={DoorOpen}
        />
        <StatCard label="Bookings" value={overview?.bookings.value ?? "—"} delta={overview?.bookings.delta} icon={KeyRound} />
        <StatCard label="Guests in-house" value={overview?.guests.value ?? "—"} delta={overview?.guests.delta} icon={Users} />
        <StatCard label="ADR" value={overview ? currency(overview.adr.value) : "—"} delta={overview?.adr.delta} icon={TrendingUp} />
      </div>

      {/* Charts row */}
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="surface p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Revenue this week
              </div>
              <div className="mt-1 font-display text-2xl">$91,090</div>
            </div>
            <div className="flex gap-1 rounded-lg border border-border bg-secondary/60 p-0.5 text-xs">
              {["7D", "30D", "90D"].map((t, i) => (
                <button
                  key={t}
                  className={`rounded-md px-2.5 py-1 transition ${
                    i === 0 ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue} margin={{ left: 0, right: 8, top: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="target" stroke="var(--muted-foreground)" strokeDasharray="4 4" fill="transparent" />
                <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface p-5">
          <div className="mb-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Occupancy rate</div>
            <div className="mt-1 font-display text-2xl">89%</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={occ} margin={{ left: 0, right: 8, top: 4, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
                <Line type="monotone" dataKey="rate" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--chart-1)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: bookings + upcoming + activities */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Booking channels</div>
            <span className="text-xs text-muted-foreground">Last 30 days</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channels} layout="vertical" margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="channel" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={70} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="value" fill="var(--chart-1)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Upcoming arrivals</div>
            <button className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-gold">
              View all <ChevronRight className="size-3" />
            </button>
          </div>
          <ul className="divide-y divide-border">
            {upcoming.map((r) => (
              <li key={r.id} className="flex items-center gap-3 py-3">
                <Avatar className="size-9">
                  <AvatarImage src={r.guestAvatar} />
                  <AvatarFallback>{r.guestName.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">{r.guestName}</span>
                    <span className="text-[11px] text-muted-foreground">{r.code}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {r.roomType} · Room {r.room} · {r.nights} nights
                  </div>
                </div>
                <div className="hidden text-right text-xs text-muted-foreground sm:block">
                  <div>{r.checkIn}</div>
                  <div>{currency(r.total)}</div>
                </div>
                <StatusPill status={r.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Room status grid + activities */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="surface p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Room status</div>
            <div className="flex flex-wrap gap-2">
              <StatusPill status="available" />
              <StatusPill status="occupied" />
              <StatusPill status="cleaning" />
              <StatusPill status="maintenance" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-10">
            {rooms.concat(rooms).slice(0, 40).map((r, i) => {
              const tone: Record<Room["status"], string> = {
                available: "bg-success/15 text-success border-success/25",
                occupied: "bg-info/15 text-info border-info/25",
                cleaning: "bg-warning/20 text-warning border-warning/30",
                maintenance: "bg-destructive/15 text-destructive border-destructive/25",
              };
              return (
                <div
                  key={i}
                  title={`Room ${r.number} · ${r.status}`}
                  className={`aspect-square rounded-lg border text-center text-[10px] font-medium leading-none flex items-center justify-center transition hover:scale-[1.06] cursor-pointer ${tone[r.status]}`}
                >
                  {r.number}
                </div>
              );
            })}
          </div>
        </div>

        <div className="surface p-5">
          <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Recent activity</div>
          <ol className="relative space-y-4 pl-4">
            <span className="absolute left-1 top-1 bottom-1 w-px bg-border" />
            {activities.map((a) => (
              <li key={a.id} className="relative">
                <span className="absolute -left-3 top-1.5 size-2 rounded-full bg-gold ring-4 ring-gold/15" />
                <div className="text-sm">
                  <span className="font-medium">{a.who}</span>{" "}
                  <span className="text-muted-foreground">{a.what}</span>{" "}
                  <span className="font-medium">{a.where}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">{a.when}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
