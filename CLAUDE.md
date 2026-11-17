# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

**Бөөний Зах Онлайн**: a B2B wholesale food market for the Bars / Nariin Nuguu markets (Ulaanbaatar).
Plan and 10-day schedule: `docs/full-flow.md`. UI text is Mongolian (Cyrillic). The old single-seller
"Ургац" app is on branch `legacy/urgats` for reference only.

Stack: Next.js 16.4 (App Router, Turbopack) · React 19 · Tailwind 4 · shadcn/ui (`base-nova`, Base UI)
· Clerk 7 (Core 3) · Supabase Postgres + **Prisma 6** (owner's choice over the plan's Drizzle) · Netlify.

## Commands

```bash
npm run dev            # http://localhost:3000 (needs .env.local: Clerk keys, OTP_SECRET; DB URLs in .env)
npm run lint           # eslint . (fails on any rule break below)
npm run typecheck      # tsc --noEmit
npm run build          # production build; run all three before finishing
npm run db:status      # prisma migrate status
npm run db:migrate:dev # prisma migrate dev: writes to Supabase, ask the owner first (db-change skill)
npx prisma generate    # after schema changes (also runs on npm install); then restart dev
npx clerk@latest doctor --mode agent   # Clerk link/keys health; the project is linked to app "grocery-store"
```

No test runner exists yet. Verify with lint + typecheck + build, and run the app for UI changes.
If `tsc` reports errors in `.next/types/`, delete `.next/types` (stale route types after moving pages).

## The owner's rules (enforced, not optional)

1. **1 file = 1 job**: each file exports exactly one runtime thing (component, hook, function, server
   action, const, class). Context / provider / hook are separate files. One server action per
   `"use server"` file. No barrel `index.ts`; import the exact file. Lint: `local/one-logic-per-file`
   (`eslint/one-logic-per-file.mjs`) + `react/no-multi-comp`. Details: `.claude/rules/one-file-one-job.md`.
2. **Max 150 lines per file**: `.claude/hooks/max-lines.mjs` blocks bigger writes; ESLint `max-lines`.
3. **Every page owns its folder**: `page.tsx` + `_components/` (UI used only by that page) +
   `_features/` (business logic & hooks for that page, no JSX). Folders only when needed. Shared UI
   (2+ pages) → `src/components/<area>/`; shared logic and DB queries → `src/lib/<domain>/`.
   Never put `_components`/`_features` directly in a route group. Details: `.claude/rules/page-structure.md`.
4. **No hard-coded data**: products, categories, prices, counts, menu links come from the DB via Prisma.
   Only page copy and settings in `src/lib/constants.ts` are fixed.
5. Never read or print `.env*` files (a deny rule exists); `.env.example` lists the key names.

## Architecture

**Routing.** All pages live under the `(shop)` route group: `layout.tsx` renders `Header`/`Footer`
(async Server Components that load categories from the DB to build the menu, see
`components/layout/buildNav.ts`). Home is `(shop)/(home)/` so the URL stays `/`. Root
`app/layout.tsx` wraps everything in `ClerkProvider` (inside `<body>`) and `CartProvider`.
`src/proxy.ts` is Next 16's renamed middleware and runs `clerkMiddleware()`; no route is protected
yet (`/admin`, `/business` guards are Day 2).

**Data.** `page.tsx` calls query functions in `src/lib/catalog/*.ts` (`server-only`, Prisma via
`src/lib/prisma.ts`) and passes results down as props. Types come from Prisma (`src/types/catalog.ts`
re-exports `Product`, `Category`). The Supabase DB is shared with the old Ургац tables (`User`,
`Order`, `OrderItem`, ...): they stay in the schema (`prisma/schema/*.prisma`, one file per domain; migrations in
`prisma/schema/migrations/`) so migrations never drop them.
Product images are Unsplash URLs (the only host allowed in `next.config.ts`).

**Cart / wishlist** are client-only, in localStorage (`components/cart/`: `CartContext`,
`CartProvider`, `useCart`).

**Checkout → Wire.mn.** `checkout/_features/placeOrder.ts` re-prices the cart from the DB, saves an
UNPAID `Order`, creates a Wire PaymentIntent + hosted checkout (`lib/wire/`) and redirects there.
Wire returns the buyer to `/orders/[id]`. An order becomes PAID only in `markOrderPaid` (amount must
equal the total, idempotent), called from the signed webhook `api/webhooks/wire` or, as a fallback,
after asking Wire's API server-to-server (`syncWirePayment`). Wire has no test mode (API accepts
only `sk_live_` keys), so test with small real amounts. Env: `WIRE_API_KEY`, `WIRE_WEBHOOK_SECRET`.
Delivery address lives in localStorage (`components/location/`); first visit asks for browser location.

**Sign-in = Clerk Google + our own phone OTP.** Clerk cannot send SMS to Mongolia (+976), and its
verification SMS can't be taken over. So `/sign-in` and `/sign-up` render Clerk's card (Google only)
plus `components/auth/PhoneLogin.tsx`:
1. `lib/auth/sendPhoneCode.ts` → `lib/otp/requestOtp.ts`: stores an HMAC (`OTP_SECRET`) of a 6-digit
   code in `phone_otps` (Prisma `PhoneOtp`), 5 min TTL, rate limits, sends via `lib/sms.ts`.
2. `lib/auth/verifyPhoneCode.ts` → `lib/otp/verifyOtp.ts`, then finds/creates the Clerk user by phone
   and returns a 60 s sign-in token; the browser calls `signIn.ticket()` + `signIn.finalize()`.

`lib/sms.ts` is a generic JSON POST until the SMS provider is chosen; with no `SMS_API_URL` in dev
the code is printed in the dev server terminal. Clerk instance config: phone enabled but
`used_for_sign_in: false`; email/password off; "force organization selection" is still on.

**Roles.** Clerk `publicMetadata.role` (typed in `src/types/clerk.d.ts`), writable only by the server:
`"admin"` = owner, `"b2b"` = approved business buyer (free delivery via `deliveryFeeFor(subtotal, isB2B)`),
unset = regular buyer. Buyers apply at `/business` → `business_applications` table (Prisma
`BusinessApplication`) → admin approves at `/admin/business`, which sets the role. `src/proxy.ts`
requires sign-in for `/admin`, `/business`, `/checkout`; the admin role is checked server-side in
`app/admin/layout.tsx` (`requireAdmin`) and again in every admin server action. An approved B2B
customer's `/business` is a dashboard with a monthly order list (`StandingOrder` +
`StandingOrderItem`: products, quantities, day 1–28, active): saved via `saveMonthlyOrder` (re-checks
the b2b role and each product's `minQty`), and "add all to cart". Auto-placing it on that day
comes after orders exist (Day 6–8).

**Styling.** `app/styles/brand.css` holds the Ургац palette (`brand`, `cream`, `ink`, `clay`, `line`)
and classes (`.btn`, `.card`, `.input`, `.container-x`); `globals.css` maps shadcn tokens onto it.
Grey text is `text-muted-foreground` (`text-muted` is a background color in shadcn).

## Gotchas

- **Next 16**: APIs differ from older versions; read `node_modules/next/dist/docs/` first (AGENTS.md).
- **Clerk Core 3**: `<SignedIn>`/`<SignedOut>`/`<Protect>` exist but throw at runtime; use
  `<Show when="signed-in" | "signed-out">`, wrapped in `<Suspense>` in Server Components. Optional
  fields are hidden unless `appearance.options.showOptionalFields` is set. `await auth()`.
- **shadcn `base-nova`** uses Base UI: no `asChild`, use `render`.
- Clerk config changes: `npx clerk@latest config patch --file x.json --dry-run --mode agent` first.
