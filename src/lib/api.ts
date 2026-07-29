/**
 * Centralized API layer.
 * Swap `BASE_URL` and the `request` implementation with axios/fetch when the
 * Node.js + Express backend is ready. Every UI page consumes these functions —
 * do NOT call fetch/axios directly in components.
 */
import * as mock from "./mock-data";

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL ?? "/api",
  TIMEOUT_MS: 15_000,
};

export const ENDPOINTS = {
  dashboard: "/dashboard",
  rooms: "/rooms",
  roomById: (id: string) => `/rooms/${id}`,
  reservations: "/reservations",
  reservationById: (id: string) => `/reservations/${id}`,
  guests: "/guests",
  guestById: (id: string) => `/guests/${id}`,
  housekeeping: "/housekeeping",
  restaurant: "/restaurant",
  spa: "/spa",
  events: "/events",
  staff: "/staff",
  finance: "/finance",
  inventory: "/inventory",
  reports: "/reports",
  messages: "/messages",
  notifications: "/notifications",
} as const;

// Simulated latency for a realistic loading feel
const wait = (ms = 280) => new Promise((r) => setTimeout(r, ms));

async function ok<T>(data: T, ms?: number): Promise<T> {
  await wait(ms);
  return data;
}

/* ------------------------------ Dashboard ------------------------------- */
export const dashboardApi = {
  getOverview: () => ok(mock.dashboardOverview),
  getRevenue: () => ok(mock.revenueSeries),
  getOccupancy: () => ok(mock.occupancySeries),
  getBookingTrends: () => ok(mock.bookingTrends),
  getActivities: () => ok(mock.activities),
};

/* -------------------------------- Rooms --------------------------------- */
export const roomsApi = {
  list: () => ok(mock.rooms),
  get: (id: string) => ok(mock.rooms.find((r) => r.id === id) ?? null),
  create: (data: Partial<mock.Room>) => ok({ ...mock.rooms[0], ...data }),
  update: (id: string, data: Partial<mock.Room>) =>
    ok({ ...mock.rooms.find((r) => r.id === id)!, ...data }),
  remove: (_id: string) => ok({ success: true }),
};

/* ---------------------------- Reservations ------------------------------ */
export const reservationsApi = {
  list: () => ok(mock.reservations),
  get: (id: string) => ok(mock.reservations.find((r) => r.id === id) ?? null),
  create: (data: Partial<mock.Reservation>) => ok({ ...mock.reservations[0], ...data }),
};

/* -------------------------------- Guests -------------------------------- */
export const guestsApi = {
  list: () => ok(mock.guests),
  get: (id: string) => ok(mock.guests.find((g) => g.id === id) ?? null),
};

/* ---------------------------- Housekeeping ------------------------------ */
export const housekeepingApi = {
  list: () => ok(mock.housekeepingTasks),
};

/* ------------------------------ Restaurant ------------------------------ */
export const restaurantApi = {
  tables: () => ok(mock.restaurantTables),
  orders: () => ok(mock.restaurantOrders),
  menu: () => ok(mock.menu),
};

/* -------------------------------- Spa ----------------------------------- */
export const spaApi = {
  appointments: () => ok(mock.spaAppointments),
  treatments: () => ok(mock.treatments),
};

/* -------------------------------- Events -------------------------------- */
export const eventsApi = {
  list: () => ok(mock.events),
};

/* -------------------------------- Staff --------------------------------- */
export const staffApi = {
  list: () => ok(mock.staff),
};

/* ------------------------------- Finance -------------------------------- */
export const financeApi = {
  overview: () => ok(mock.financeOverview),
  invoices: () => ok(mock.invoices),
  expenses: () => ok(mock.expenses),
};

/* ------------------------------ Inventory ------------------------------- */
export const inventoryApi = {
  list: () => ok(mock.inventory),
  suppliers: () => ok(mock.suppliers),
};

/* ------------------------------- Reports -------------------------------- */
export const reportsApi = {
  summary: () => ok(mock.reportSummary),
};

/* ------------------------------ Messages -------------------------------- */
export const messagesApi = {
  threads: () => ok(mock.messageThreads),
};

/* --------------------------- Notifications ------------------------------ */
export const notificationsApi = {
  list: () => ok(mock.notifications, 120),
};
