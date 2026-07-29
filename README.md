# Horizon Suite

You are a senior UI/UX designer and a senior React frontend engineer.

Your task is to design and develop a modern, premium-quality Hotel Management System frontend.

IMPORTANT RULES

• Design ONLY the frontend.

• DO NOT implement any backend logic.

• DO NOT create Node.js APIs.

• DO NOT create Express routes.

• DO NOT create MongoDB models.

• DO NOT connect to any database.

• DO NOT implement authentication logic.

• DO NOT implement payment processing.

• Every API call should use placeholder endpoints and mock services that can easily be replaced later.

• Every page must function using mock JSON data.

• Keep all backend endpoints in one centralized api.js/config.js file for easy replacement later.

Tech Stack

Frontend:

- React 19

- Vite

- Tailwind CSS

- React Router

- React Query (optional)

- Axios

- Framer Motion

- React Hook Form

- Zod Validation

- Lucide Icons

- React Hot Toast

- Recharts

- TanStack Table

Future Backend (DO NOT IMPLEMENT)

- Node.js

- Express.js

- MongoDB

======================================

DESIGN GOAL

Create something that looks better than most hotel management systems.

Avoid generic admin dashboard designs.

The UI should feel like:

Luxury Hotel

Minimal

Premium

Elegant

Modern SaaS

Apple-level spacing

Stripe-level simplicity

Linear.app smoothness

Notion clean layout

Everything should feel polished.

Animations should be subtle.

No clutter.

Excellent typography.

Beautiful spacing.

Rounded corners.

Soft shadows.

Glassmorphism where appropriate.

Beautiful gradients.

Excellent color hierarchy.

Smooth hover effects.

Micro interactions everywhere.

Loading skeletons.

Beautiful empty states.

Responsive on all screen sizes.

Dark Mode.

Light Mode.

======================================

GLOBAL DESIGN SYSTEM

Create reusable components.

Buttons

Cards

Inputs

Tables

Badges

Status Pills

Dialogs

Drawers

Dropdowns

Tabs

Breadcrumbs

Search bars

Pagination

Charts

Date Pickers

File Upload

Notifications

Everything should follow one design language.

======================================

APPLICATION LAYOUT

Sidebar

Contains

Dashboard

Reservations

Rooms

Guests

Housekeeping

Restaurant

Spa

Events

Staff

Finance

Inventory

Reports

Messages

Settings

Profile

Top Navbar

Search

Notifications

Quick Add Button

Theme Toggle

Profile Dropdown

======================================

DASHBOARD

Beautiful analytics cards

Today's Check-ins

Today's Check-outs

Occupied Rooms

Available Rooms

Revenue

Bookings

Guests

Charts

Occupancy Rate

Revenue Chart

Booking Trends

Recent Reservations

Upcoming Check-ins

Room Status Grid

Calendar Widget

Weather Widget

Recent Activities

Notifications

======================================

ROOM MANAGEMENT

Grid View

List View

Beautiful Room Cards

Room Images

Room Number

Room Type

Price

Capacity

Amenities

Status

Available

Occupied

Maintenance

Cleaning

Filters

Search

Sorting

Room Details Drawer

Image Gallery

Interactive Room Status

======================================

BOOKING MANAGEMENT

Reservation Table

Advanced Filters

Search

Date Picker

Guest Details

Room Details

Booking Status

Upcoming

Checked In

Checked Out

Cancelled

Pending

Booking Timeline

Booking Details Modal

Invoice Preview

======================================

CHECK-IN PROCESS

Interactive Wizard

Guest Information

Identity Upload UI

Room Selection

Payment Summary

Digital Signature Placeholder

Success Animation

======================================

CHECK-OUT

Invoice Preview

Additional Charges

Damage Charges

Discount

Tax

Payment Summary

Success Screen

======================================

GUEST MANAGEMENT

Guest Profiles

Past Stays

Current Booking

Loyalty Status

Documents

Notes

Timeline

======================================

HOUSEKEEPING

Room Cleaning Queue

Priority Indicators

Cleaning Status

Staff Assignment

Progress Timeline

Interactive Drag & Drop

======================================

RESTAURANT MODULE

Table Reservations

Orders

Bills

Menu Categories

Kitchen Status

======================================

SPA MODULE

Appointments

Calendar

Staff

Treatments

======================================

EVENT MANAGEMENT

Hall Booking

Conference Rooms

Wedding Packages

Schedules

======================================

INVENTORY

Products

Suppliers

Stock

Low Stock Alerts

Purchase Orders

======================================

STAFF

Employees

Attendance

Schedules

Departments

Roles

======================================

FINANCE

Revenue

Expenses

Invoices

Taxes

Reports

Charts

======================================

REPORTS

Revenue Reports

Occupancy Reports

Customer Reports

Performance Charts

Export Buttons (UI only)

======================================

SETTINGS

Hotel Information

Theme

Notifications

Room Types

Taxes

Currency

Language

Profile

Security

======================================

PROFILE

Profile Page

Avatar Upload UI

Preferences

Password Change UI

Activity History

======================================

UI INTERACTIONS

Everything must be interactive.

Buttons animate.

Cards lift on hover.

Tables support sorting.

Search updates instantly.

Dropdowns animate.

Sidebar collapses.

Charts animate.

Tabs animate.

Modals animate.

Drawers animate.

Skeleton loaders.

Toast notifications.

Loading indicators.

Transitions under 250ms.

Smooth page transitions.

Keyboard shortcuts where appropriate.

======================================

RESPONSIVE DESIGN

Desktop

Laptop

Tablet

Mobile

Collapsible Sidebar

Responsive Tables

Responsive Cards

Touch Friendly

======================================

ACCESSIBILITY

ARIA Labels

Keyboard Navigation

Focus Rings

Color Contrast

Screen Reader Friendly

======================================

CODE QUALITY

Feature-based folder structure.

Reusable components.

Reusable hooks.

Clean architecture.

No duplicated code.

Type-safe component props.

Well-commented code.

Scalable project structure.

======================================

MOCK DATA

Create realistic JSON data for:

Rooms

Guests

Reservations

Employees

Revenue

Inventory

Invoices

Restaurant

Spa

Events

======================================

API PLACEHOLDERS

Create a centralized API layer.

Example:

GET /api/dashboard

GET /api/rooms

GET /api/rooms/:id

POST /api/rooms

PUT /api/rooms/:id

DELETE /api/rooms/:id

GET /api/reservations

POST /api/reservations

GET /api/guests

GET /api/staff

GET /api/reports

DO NOT implement these endpoints.

Simply create placeholder functions that return mock data.

======================================

DELIVERABLE

Generate a complete production-ready frontend that could later be connected to a Node.js + Express + MongoDB backend without changing the UI architecture.

The project should feel like a premium SaaS product rather than a college project. Every screen should be polished, every interaction smooth, and every component reusable. Prioritize maintainability, scalability, and an exceptional user experience.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2ae9c650-3244-4ab8-97ce-280437ff1af6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
