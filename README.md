# Бөөний Зах Онлайн

An online wholesale market for food sellers at the Bars and Nariin Nuguu markets in
Ulaanbaatar. Buyers order and pay online; sellers manage products, prices and orders; the
admin approves shops and handles payouts.

Plan, workflows and 10-day schedule: [`docs/full-flow.md`](docs/full-flow.md).

**Stack:** Next.js 16 · Tailwind 4 · shadcn/ui · Clerk · Supabase · Prisma · Wire.mn · n8n · Netlify

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the keys
npm run dev                  # http://localhost:3000
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run lint` | ESLint (Pinebaatars rules, max 150 lines per file, one component per file) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Production build |

## Folder structure

```
src/
  proxy.ts            Clerk session on every request (Next 16 "middleware")
  app/<route>/
    page.tsx          thin: data + auth, stacks features
    _components/      UI components used only on this page
    _features/        business logic & hooks specific to this page
  components/         shared UI (layout/, ui/ = shadcn)
  lib/                helpers and service clients
```

The previous single-seller app ("Ургац", Prisma + QPay) is on the `legacy/urgats` branch.
