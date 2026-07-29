/**
 * Mock data for the hotel management system.
 * Replace with real API responses when the backend is available.
 */

export type RoomStatus = "available" | "occupied" | "cleaning" | "maintenance";
export type Room = {
  id: string;
  number: string;
  type: "Deluxe" | "Suite" | "Presidential" | "Standard" | "Executive";
  floor: number;
  price: number;
  capacity: number;
  amenities: string[];
  status: RoomStatus;
  image: string;
  rating: number;
};

export type ReservationStatus =
  | "upcoming"
  | "checked-in"
  | "checked-out"
  | "cancelled"
  | "pending";

export type Reservation = {
  id: string;
  code: string;
  guestId: string;
  guestName: string;
  guestAvatar: string;
  room: string;
  roomType: Room["type"];
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  total: number;
  status: ReservationStatus;
  source: "Direct" | "Booking.com" | "Expedia" | "Airbnb" | "Corporate";
};

export type Guest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  avatar: string;
  loyalty: "Bronze" | "Silver" | "Gold" | "Platinum";
  stays: number;
  totalSpent: number;
  lastStay: string;
  notes?: string;
};

const img = (seed: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const avatar = (seed: string) =>
  `https://i.pravatar.cc/120?u=${encodeURIComponent(seed)}`;

/* -------------------------------- Rooms --------------------------------- */
export const rooms: Room[] = [
  {
    id: "r-101",
    number: "101",
    type: "Deluxe",
    floor: 1,
    price: 320,
    capacity: 2,
    amenities: ["King Bed", "Sea View", "Balcony", "Mini Bar"],
    status: "available",
    image: img("1566665797739-1674de7a421a"),
    rating: 4.8,
  },
  {
    id: "r-102",
    number: "102",
    type: "Standard",
    floor: 1,
    price: 180,
    capacity: 2,
    amenities: ["Queen Bed", "City View", "Desk"],
    status: "occupied",
    image: img("1611892440504-42a792e24d32"),
    rating: 4.4,
  },
  {
    id: "r-205",
    number: "205",
    type: "Suite",
    floor: 2,
    price: 640,
    capacity: 4,
    amenities: ["Living Room", "Jacuzzi", "Sea View", "Butler"],
    status: "cleaning",
    image: img("1631049307264-da0ec9d70304"),
    rating: 4.9,
  },
  {
    id: "r-301",
    number: "301",
    type: "Executive",
    floor: 3,
    price: 420,
    capacity: 3,
    amenities: ["King Bed", "Lounge Access", "Rain Shower"],
    status: "available",
    image: img("1590490360182-c33d57733427"),
    rating: 4.7,
  },
  {
    id: "r-410",
    number: "410",
    type: "Deluxe",
    floor: 4,
    price: 360,
    capacity: 2,
    amenities: ["King Bed", "Terrace", "Bathtub"],
    status: "maintenance",
    image: img("1618773928121-c32242e63f39"),
    rating: 4.6,
  },
  {
    id: "r-501",
    number: "501",
    type: "Presidential",
    floor: 5,
    price: 1450,
    capacity: 6,
    amenities: ["Private Pool", "Dining Room", "Butler", "Cinema"],
    status: "available",
    image: img("1582719508461-905c673771fd"),
    rating: 5.0,
  },
  {
    id: "r-502",
    number: "502",
    type: "Suite",
    floor: 5,
    price: 720,
    capacity: 4,
    amenities: ["Panoramic View", "Kitchenette", "Sauna"],
    status: "occupied",
    image: img("1596394516093-501ba68a0ba6"),
    rating: 4.9,
  },
  {
    id: "r-608",
    number: "608",
    type: "Executive",
    floor: 6,
    price: 480,
    capacity: 2,
    amenities: ["King Bed", "Skyline View", "Study"],
    status: "available",
    image: img("1578683010236-d716f9a3f461"),
    rating: 4.8,
  },
];

/* -------------------------------- Guests -------------------------------- */
export const guests: Guest[] = [
  {
    id: "g-01",
    name: "Amelia Laurent",
    email: "amelia@laurent.co",
    phone: "+33 6 12 45 88 21",
    country: "France",
    avatar: avatar("amelia"),
    loyalty: "Platinum",
    stays: 24,
    totalSpent: 48200,
    lastStay: "2026-06-11",
    notes: "Prefers south-facing rooms, allergic to feathers.",
  },
  {
    id: "g-02",
    name: "Kenji Watanabe",
    email: "kenji.w@marumi.jp",
    phone: "+81 90 3345 1029",
    country: "Japan",
    avatar: avatar("kenji"),
    loyalty: "Gold",
    stays: 12,
    totalSpent: 21400,
    lastStay: "2026-05-02",
  },
  {
    id: "g-03",
    name: "Priya Ramesh",
    email: "priya.r@northwind.io",
    phone: "+44 20 7946 0918",
    country: "United Kingdom",
    avatar: avatar("priya"),
    loyalty: "Silver",
    stays: 6,
    totalSpent: 9200,
    lastStay: "2026-04-19",
  },
  {
    id: "g-04",
    name: "Diego Alvarez",
    email: "d.alvarez@cortez.mx",
    phone: "+52 55 8901 2244",
    country: "Mexico",
    avatar: avatar("diego"),
    loyalty: "Gold",
    stays: 9,
    totalSpent: 15600,
    lastStay: "2026-07-01",
  },
  {
    id: "g-05",
    name: "Sofia Berg",
    email: "sofia@berg.se",
    phone: "+46 70 555 3312",
    country: "Sweden",
    avatar: avatar("sofia"),
    loyalty: "Bronze",
    stays: 2,
    totalSpent: 1800,
    lastStay: "2026-03-08",
  },
  {
    id: "g-06",
    name: "Marcus Chen",
    email: "m.chen@ridgewood.com",
    phone: "+1 415 555 2201",
    country: "USA",
    avatar: avatar("marcus"),
    loyalty: "Platinum",
    stays: 31,
    totalSpent: 72100,
    lastStay: "2026-07-20",
    notes: "Regular corporate account. Late check-out standing arrangement.",
  },
];

/* ---------------------------- Reservations ------------------------------ */
export const reservations: Reservation[] = [
  {
    id: "res-001",
    code: "AZ-8842",
    guestId: "g-01",
    guestName: "Amelia Laurent",
    guestAvatar: avatar("amelia"),
    room: "501",
    roomType: "Presidential",
    checkIn: "2026-07-29",
    checkOut: "2026-08-03",
    nights: 5,
    guests: 2,
    total: 7250,
    status: "checked-in",
    source: "Direct",
  },
  {
    id: "res-002",
    code: "AZ-8843",
    guestId: "g-02",
    guestName: "Kenji Watanabe",
    guestAvatar: avatar("kenji"),
    room: "301",
    roomType: "Executive",
    checkIn: "2026-07-30",
    checkOut: "2026-08-01",
    nights: 2,
    guests: 1,
    total: 840,
    status: "upcoming",
    source: "Booking.com",
  },
  {
    id: "res-003",
    code: "AZ-8844",
    guestId: "g-03",
    guestName: "Priya Ramesh",
    guestAvatar: avatar("priya"),
    room: "205",
    roomType: "Suite",
    checkIn: "2026-07-28",
    checkOut: "2026-07-31",
    nights: 3,
    guests: 2,
    total: 1920,
    status: "checked-in",
    source: "Expedia",
  },
  {
    id: "res-004",
    code: "AZ-8845",
    guestId: "g-04",
    guestName: "Diego Alvarez",
    guestAvatar: avatar("diego"),
    room: "102",
    roomType: "Standard",
    checkIn: "2026-07-31",
    checkOut: "2026-08-04",
    nights: 4,
    guests: 2,
    total: 720,
    status: "upcoming",
    source: "Airbnb",
  },
  {
    id: "res-005",
    code: "AZ-8846",
    guestId: "g-05",
    guestName: "Sofia Berg",
    guestAvatar: avatar("sofia"),
    room: "608",
    roomType: "Executive",
    checkIn: "2026-07-25",
    checkOut: "2026-07-28",
    nights: 3,
    guests: 1,
    total: 1440,
    status: "checked-out",
    source: "Direct",
  },
  {
    id: "res-006",
    code: "AZ-8847",
    guestId: "g-06",
    guestName: "Marcus Chen",
    guestAvatar: avatar("marcus"),
    room: "502",
    roomType: "Suite",
    checkIn: "2026-08-01",
    checkOut: "2026-08-06",
    nights: 5,
    guests: 2,
    total: 3600,
    status: "pending",
    source: "Corporate",
  },
  {
    id: "res-007",
    code: "AZ-8848",
    guestId: "g-01",
    guestName: "Amelia Laurent",
    guestAvatar: avatar("amelia"),
    room: "101",
    roomType: "Deluxe",
    checkIn: "2026-06-10",
    checkOut: "2026-06-14",
    nights: 4,
    guests: 2,
    total: 1280,
    status: "cancelled",
    source: "Direct",
  },
];

/* ------------------------------ Dashboard ------------------------------- */
export const dashboardOverview = {
  todayCheckins: { value: 24, delta: 12.4 },
  todayCheckouts: { value: 18, delta: -3.2 },
  occupied: { value: 142, total: 180, delta: 5.1 },
  available: { value: 38, total: 180, delta: -5.1 },
  revenue: { value: 84210, delta: 8.6 },
  bookings: { value: 312, delta: 14.2 },
  guests: { value: 268, delta: 6.8 },
  adr: { value: 428, delta: 3.4 },
};

export const revenueSeries = [
  { day: "Mon", revenue: 9420, target: 9000 },
  { day: "Tue", revenue: 11220, target: 9500 },
  { day: "Wed", revenue: 10450, target: 10000 },
  { day: "Thu", revenue: 12800, target: 10500 },
  { day: "Fri", revenue: 15100, target: 12000 },
  { day: "Sat", revenue: 17840, target: 13000 },
  { day: "Sun", revenue: 14260, target: 12500 },
];

export const occupancySeries = [
  { month: "Feb", rate: 62 },
  { month: "Mar", rate: 68 },
  { month: "Apr", rate: 71 },
  { month: "May", rate: 77 },
  { month: "Jun", rate: 82 },
  { month: "Jul", rate: 89 },
];

export const bookingTrends = [
  { channel: "Direct", value: 42 },
  { channel: "Booking", value: 28 },
  { channel: "Expedia", value: 14 },
  { channel: "Airbnb", value: 9 },
  { channel: "Corporate", value: 7 },
];

export const activities = [
  { id: "a1", who: "Amelia Laurent", what: "checked into", where: "Suite 501", when: "2m ago" },
  { id: "a2", who: "Kenji Watanabe", what: "booked", where: "Executive 301", when: "18m ago" },
  { id: "a3", who: "Housekeeping", what: "completed", where: "Room 205", when: "42m ago" },
  { id: "a4", who: "Priya Ramesh", what: "requested spa", where: "Deep Tissue 60min", when: "1h ago" },
  { id: "a5", who: "Marcus Chen", what: "paid invoice", where: "AZ-8846 · $3,600", when: "2h ago" },
];

/* ---------------------------- Housekeeping ------------------------------ */
export const housekeepingTasks = [
  { id: "hk1", room: "205", priority: "high", status: "in-progress", assignee: "Rosa M.", eta: "12m", type: "Full clean" },
  { id: "hk2", room: "102", priority: "medium", status: "queued", assignee: "Ana P.", eta: "30m", type: "Turn-down" },
  { id: "hk3", room: "410", priority: "high", status: "queued", assignee: "Unassigned", eta: "—", type: "Maintenance follow-up" },
  { id: "hk4", room: "608", priority: "low", status: "done", assignee: "Ivan D.", eta: "0m", type: "Full clean" },
  { id: "hk5", room: "301", priority: "medium", status: "in-progress", assignee: "Rosa M.", eta: "22m", type: "Linen change" },
  { id: "hk6", room: "502", priority: "high", status: "queued", assignee: "Ana P.", eta: "45m", type: "Full clean" },
] as const;

/* ------------------------------ Restaurant ------------------------------ */
export const restaurantTables = [
  { id: "t1", label: "T-01", seats: 2, status: "occupied", guests: 2 },
  { id: "t2", label: "T-02", seats: 4, status: "reserved", guests: 0 },
  { id: "t3", label: "T-03", seats: 4, status: "available", guests: 0 },
  { id: "t4", label: "T-04", seats: 6, status: "occupied", guests: 5 },
  { id: "t5", label: "T-05", seats: 2, status: "available", guests: 0 },
  { id: "t6", label: "T-06", seats: 8, status: "reserved", guests: 0 },
];

export const restaurantOrders = [
  { id: "o1", table: "T-01", items: 4, total: 168, status: "preparing", time: "8m" },
  { id: "o2", table: "T-04", items: 7, total: 342, status: "served", time: "24m" },
  { id: "o3", table: "T-06", items: 3, total: 96, status: "billed", time: "1h" },
];

export const menu = [
  { id: "m1", category: "Starters", name: "Burrata & Heirloom Tomato", price: 22 },
  { id: "m2", category: "Starters", name: "Tuna Tartare", price: 28 },
  { id: "m3", category: "Mains", name: "Wagyu Ribeye 220g", price: 78 },
  { id: "m4", category: "Mains", name: "Line-Caught Sea Bass", price: 46 },
  { id: "m5", category: "Desserts", name: "Valrhona Soufflé", price: 18 },
];

/* -------------------------------- Spa ----------------------------------- */
export const spaAppointments = [
  { id: "s1", guest: "Amelia Laurent", treatment: "Deep Tissue 60m", therapist: "Elena", time: "10:00", status: "confirmed" },
  { id: "s2", guest: "Kenji Watanabe", treatment: "Aromatherapy 90m", therapist: "Marco", time: "11:30", status: "confirmed" },
  { id: "s3", guest: "Priya Ramesh", treatment: "Facial 45m", therapist: "Elena", time: "14:00", status: "pending" },
  { id: "s4", guest: "Diego Alvarez", treatment: "Couples Massage", therapist: "Team", time: "16:00", status: "confirmed" },
];

export const treatments = [
  { id: "tr1", name: "Signature Massage", duration: 60, price: 180 },
  { id: "tr2", name: "Hot Stone Therapy", duration: 90, price: 240 },
  { id: "tr3", name: "Hydrating Facial", duration: 45, price: 140 },
  { id: "tr4", name: "Couples Suite", duration: 90, price: 420 },
];

/* -------------------------------- Events -------------------------------- */
export const events = [
  { id: "e1", name: "Laurent–Moreau Wedding", hall: "Grand Ballroom", date: "2026-08-14", guests: 220, status: "confirmed", revenue: 68000 },
  { id: "e2", name: "Northwind Q3 Summit", hall: "Conference A", date: "2026-08-06", guests: 60, status: "confirmed", revenue: 14200 },
  { id: "e3", name: "Chen Family Reunion", hall: "Garden Pavilion", date: "2026-09-02", guests: 80, status: "pending", revenue: 18400 },
  { id: "e4", name: "Ridgewood Gala", hall: "Grand Ballroom", date: "2026-09-19", guests: 300, status: "confirmed", revenue: 92000 },
];

/* -------------------------------- Staff --------------------------------- */
export const staff = [
  { id: "st1", name: "Elena Rossi", role: "Spa Therapist", dept: "Wellness", status: "on-shift", avatar: avatar("elena") },
  { id: "st2", name: "Marco Bianchi", role: "Concierge", dept: "Front Office", status: "on-shift", avatar: avatar("marco") },
  { id: "st3", name: "Rosa Mendez", role: "Housekeeper", dept: "Housekeeping", status: "on-shift", avatar: avatar("rosa") },
  { id: "st4", name: "Ivan Dvorak", role: "Housekeeper", dept: "Housekeeping", status: "off", avatar: avatar("ivan") },
  { id: "st5", name: "Chef Laurent Dubois", role: "Executive Chef", dept: "F&B", status: "on-shift", avatar: avatar("laurent") },
  { id: "st6", name: "Ana Pereira", role: "Housekeeping Sup.", dept: "Housekeeping", status: "on-shift", avatar: avatar("ana") },
  { id: "st7", name: "Julien Marchand", role: "Sommelier", dept: "F&B", status: "on-shift", avatar: avatar("julien") },
  { id: "st8", name: "Nadia Hassan", role: "Events Manager", dept: "Events", status: "on-shift", avatar: avatar("nadia") },
];

/* ------------------------------- Finance -------------------------------- */
export const financeOverview = {
  revenue: 1284000,
  expenses: 682000,
  net: 602000,
  taxes: 148000,
  outstanding: 92400,
};

export const invoices = [
  { id: "inv-1", code: "INV-24081", guest: "Amelia Laurent", amount: 7250, status: "paid", date: "2026-07-28" },
  { id: "inv-2", code: "INV-24082", guest: "Priya Ramesh", amount: 1920, status: "paid", date: "2026-07-28" },
  { id: "inv-3", code: "INV-24083", guest: "Marcus Chen", amount: 3600, status: "pending", date: "2026-07-29" },
  { id: "inv-4", code: "INV-24084", guest: "Diego Alvarez", amount: 720, status: "overdue", date: "2026-07-20" },
  { id: "inv-5", code: "INV-24085", guest: "Ridgewood Corp.", amount: 92000, status: "pending", date: "2026-07-27" },
];

export const expenses = [
  { id: "ex1", label: "Linen laundry", category: "Operations", amount: 4200, date: "2026-07-27" },
  { id: "ex2", label: "F&B ingredients", category: "F&B", amount: 18400, date: "2026-07-26" },
  { id: "ex3", label: "HVAC maintenance", category: "Facilities", amount: 6800, date: "2026-07-25" },
  { id: "ex4", label: "Marketing campaign", category: "Marketing", amount: 12200, date: "2026-07-22" },
];

/* ------------------------------ Inventory ------------------------------- */
export const inventory = [
  { id: "in1", name: "Egyptian Cotton Sheets", sku: "LN-001", stock: 240, min: 120, status: "ok", supplier: "Frette" },
  { id: "in2", name: "Bathroom Amenity Kit", sku: "AM-014", stock: 88, min: 200, status: "low", supplier: "Molton Brown" },
  { id: "in3", name: "Bordeaux 2018", sku: "WN-221", stock: 42, min: 20, status: "ok", supplier: "Château Margaux" },
  { id: "in4", name: "Espresso Beans 1kg", sku: "FB-090", stock: 14, min: 30, status: "low", supplier: "Illy" },
  { id: "in5", name: "Pool Towels", sku: "LN-041", stock: 320, min: 200, status: "ok", supplier: "Frette" },
];

export const suppliers = [
  { id: "sp1", name: "Frette", category: "Linens", contact: "orders@frette.com", rating: 4.8 },
  { id: "sp2", name: "Molton Brown", category: "Amenities", contact: "b2b@moltonbrown.com", rating: 4.7 },
  { id: "sp3", name: "Illy", category: "F&B", contact: "corporate@illy.com", rating: 4.6 },
];

/* ------------------------------- Reports -------------------------------- */
export const reportSummary = {
  monthlyRevenue: [
    { m: "Jan", v: 182000 },
    { m: "Feb", v: 168000 },
    { m: "Mar", v: 196000 },
    { m: "Apr", v: 210000 },
    { m: "May", v: 238000 },
    { m: "Jun", v: 264000 },
    { m: "Jul", v: 284000 },
  ],
  guestSatisfaction: 4.82,
  repeatRate: 0.42,
  avgStay: 3.4,
};

/* ------------------------------ Messages -------------------------------- */
export const messageThreads = [
  { id: "mt1", name: "Amelia Laurent", avatar: avatar("amelia"), last: "Could we arrange a late check-out?", time: "2m", unread: 2 },
  { id: "mt2", name: "Kenji Watanabe", avatar: avatar("kenji"), last: "Thank you, that's perfect.", time: "1h", unread: 0 },
  { id: "mt3", name: "Housekeeping — Rosa", avatar: avatar("rosa"), last: "Room 205 ready for inspection.", time: "3h", unread: 1 },
  { id: "mt4", name: "Marcus Chen", avatar: avatar("marcus"), last: "Please invoice the corporate account.", time: "1d", unread: 0 },
];

/* --------------------------- Notifications ------------------------------ */
export const notifications = [
  { id: "n1", title: "New reservation", body: "Marcus Chen · Suite 502 · 5 nights", time: "just now", type: "info" as const, unread: true },
  { id: "n2", title: "Low stock", body: "Espresso Beans below threshold", time: "12m", type: "warning" as const, unread: true },
  { id: "n3", title: "Housekeeping done", body: "Room 205 marked ready", time: "42m", type: "success" as const, unread: false },
  { id: "n4", title: "Invoice overdue", body: "INV-24084 · Diego Alvarez", time: "2h", type: "error" as const, unread: true },
];
