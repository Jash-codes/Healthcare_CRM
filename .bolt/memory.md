# Project memory

## Product intent & audience

- Healthcare CRM dashboard demo for a hospital/clinic ("MediCare Plus"), meant to be showcased to potential clients.
- Focus is a polished, simple SaaS dashboard demo — not complex hospital management.
- Core entities: patients, doctors, appointments, invoices/billing, reports, settings.

## Brand personality & voice

- Professional, clinical, trustworthy, modern SaaS feel.
- Clear and concise labels; realistic but fictional demo data.

## Visual design & UX direction

- White background; medical blue + teal palette; rounded cards with subtle shadows.
- Clean sidebar navigation to all pages; top bar with search and profile.
- Modern typography (fonts loaded via index.html), professional tables, Recharts charts.
- Fully responsive: desktop and mobile layouts.
- Reusable UI helpers (badges, modal, form fields) in shared components.
- Demo login screen with credentials shown on the page.
- Stat cards, profile cards for doctors, searchable patient table with profile detail view.

## Decisions, constraints & rationale

- Stack: Vite + React + Tailwind + React Router + Lucide React + Recharts. UI-theme/icon packages avoided per global instructions.
- `@/` path alias used for all project imports.
- State persisted to localStorage (explicit user requirement); local dummy data as seed.
- Seed data: 16 patients, 5 doctors, 10 appointments.
- CRUD implemented for patients and doctors; appointment scheduling/status updates; simple invoice creation; settings edit reflects in sidebar/top bar.
- Auth is a simple demo gate (admin@medicareplus.com / demo1234), not real security.
- Build and type checks pass.

## Open questions & assumptions

- No backend intended; all data is local/dummy and device-specific.
- Demo credentials are intentionally exposed on the login screen.
- Reports are read-only analytics derived from local data, not exportable.
- No user roles/permissions beyond a single admin profile.