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

# One-off script against server code (lib files import "server-only", which throws without this condition):
npx tsx --env-file=.env.local --env-file=.env --conditions=react-server -e 'import { x } from "./src/lib/..."; ...'
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
6. **Phone first.** The owner runs every admin page (Касс, orders, receipts, products) on a phone,
   and buyers mostly use the mobile site. Design and check at 390px first: no sideways scroll,
   nothing cut off, 44px tap targets, words next to icons, no duplicate or dead buttons.
7. **UI review after UI changes**: run the `ui-review` skill (agent `ui-ux-reviewer`). It uses the
   site as buyer and admin and pins what is unclear; it only reviews. The owner usually answers "fix
   all of them". Storefront design: max 3 colors (white, ink, brand green; clay only for admin
   warnings) and max 3 text styles per page (display, heading, body) in one font (Manrope).

## Coding rules

| Rule                               | Bad                               | Good                                             |
| ---------------------------------- | --------------------------------- | ------------------------------------------------ |
| No `any`                           | `(data: any)`                     | `(data: Post)`                                   |
| Names say what it is               | `d`, `flag`, `handle()`           | `posts`, `isLoading`, `savePost()`               |
| Return early                       | 3 nested `if`                     | `if (!user) return;` then the main code          |
| Small files                        | one 600-line page                 | one component per file, under 150 lines (rule 2) |
| Check input on the server          | trust `req.body`                  | check it with `zod` first                        |
| Catch errors from outside services | app crashes when Pinecone is slow | `try/catch`, friendly message to the user        |
| Never show raw errors              | "PostgresError: relation..."      | "Could not save. Try again."                     |
| No leftover logs                   | `console.log(user)` in a commit   | delete it before commit                          |

Checking input on the server:

```ts
const Body = z.object({ text: z.string().min(1).max(2000) });

const parsed = Body.safeParse(await req.json());
if (!parsed.success)
  return Response.json(
    { error: "Text is empty or too long." },
    { status: 400 },
  );
```

## Architecture

**Routing.** All pages live under the `(shop)` route group: `layout.tsx` renders `Header`/`Footer`
(async Server Components that load categories from the DB to build the menu, see
`components/layout/buildNav.ts`). Home is `(shop)/(home)/` so the URL stays `/`. Root
`app/layout.tsx` wraps everything in `ClerkProvider` (inside `<body>`) and `CartProvider`.
`src/proxy.ts` is Next 16's renamed middleware and runs `clerkMiddleware()` (route guards: see Roles).
Admin pages live outside `(shop)` in `app/admin/` with their own sidebar layout.

**Data.** `page.tsx` calls query functions in `src/lib/catalog/*.ts` (`server-only`, Prisma via
`src/lib/prisma.ts`) and passes results down as props. Types come from Prisma (`src/types/catalog.ts`
re-exports `Product`, `Category`). The Supabase DB is shared with the old Ургац tables (`User`,
`Order`, `OrderItem`, ...): they stay in the schema (`prisma/schema/*.prisma`, one file per domain; migrations in
`prisma/schema/migrations/`) so migrations never drop them.
Product images are Unsplash URLs (the only remote host allowed in `next.config.ts`); our own photos
(hero, farms) are in `public/images/`.

**Cart / wishlist** are client-only, in localStorage (`components/cart/`: `CartContext`,
`CartProvider`, `useCart`).

**Checkout → Wire.mn.** `checkout/_features/placeOrder.ts` re-prices the cart from the DB, saves an
UNPAID `Order`, creates a Wire PaymentIntent + hosted checkout (`lib/wire/`) and redirects there.
Wire returns the buyer to `/orders/[id]`. An unpaid order without a Wire link is paid from `/pay?order=<id>`
(`pay/_features/startPayment.ts`). Wire calls go through the SDK `@buildry-wire/wire` (`lib/wire/getWireClient.ts`). An order becomes PAID only in `markOrderPaid` (amount must
equal the total, idempotent), called from the signed webhook `api/webhooks/wire` or, as a fallback,
after asking Wire's API server-to-server (`syncWirePayment`). Wire has no test mode (API accepts
only `sk_live_` keys), so test with small real amounts. Env: `WIRE_API_KEY`, `WIRE_WEBHOOK_SECRET`.

**Receipts (БМ-3 "Зарлагын баримт").** `payOrder` creates a `Receipt` (prisma `receipts.prisma`, own
№) in the same transaction that flips the order to PAID, then schedules (`after()`) `lib/receipts/sendReceipt`:
if the order has an `email` (Clerk email saved at checkout) and total > `RECEIPT_EMAIL_MIN_TOTAL` it POSTs
`order.paid` to n8n (`lib/n8n/postN8nEvent`, header `x-n8n-secret`) and records `emailStatus`
(SENT/SKIPPED/FAILED); n8n is called only when an email should go out. `receiptHtml` renders the one
БМ-3 layout used by the email (`body.receipt.html`, `body.receipt.subject`, to `body.order.email`), the
admin view and the print page. Admin: `/admin/receipts` (filter by status), `/admin/receipts/[id]`
(sheet, "Хэвлэх" → `[id]/print` route, "И-мэйлээр илгээх" = `resendReceipt`, any amount). n8n workflow:
`n8n/order-paid-receipt.json` (Webhook → Gmail). Env: `N8N_ORDER_EVENT_URL`, `N8N_WEBHOOK_SECRET`,
`SITE_URL` (optional, for the order link). Seller register no. on the form: `SHOP_REG_NO` (constants).

**Delivery vs pickup.** The header switch `ModeToggle` ("Хүргэлтээр" / "Очиж авах") sets `mode` in
`LocationProvider` (localStorage, with the delivery address and saved addresses in
`components/location/`). Pickup = buyer collects at `PICKUP_POINT` (`lib/constants.ts`, also the footer
address + Google Maps link via `lib/location/googleMapsLinks.ts`): no address form, no delivery fee;
`placeOrder` forces fee 0 and the pickup address server-side. Once per browser session in delivery mode
`useAskLocationOnce` asks "Энэ хаяг руу хүргүүлэх үү?" (saved address, else GPS, else opens
"Хаяг сонгох"); the popup only closes on Тийм or by choosing an address.

**Order kinds.** `Order.deliveryType` (string): `scheduled` (day + slot), `recurring` ("Давтамжит":
`recurrence` enum WEEKLY/BIWEEKLY/MONTHLY + `recurrenceDays` weekdays 0=Ням + start/end dates, picked
in `RecurrenceDialog` with our own `MonthCalendar`; repeats are not auto-placed yet), `pickup`, and
`express` (logic kept, its card is hidden at checkout). Labels: `lib/orders/deliveryTypeLabel.ts`,
`recurrenceText.ts`. НӨАТ: checkout "Хувь хүн" / "Байгууллага"; company → `companyRegNo` (7 digits)
+ `companyName` on the order, pre-filled for approved B2B buyers. `checkoutSchema` (zod) re-validates
all of it on the server.

**Sign-in = Clerk Google + our own phone OTP.** Clerk cannot send SMS to Mongolia (+976), and its
verification SMS can't be taken over. So `/sign-in` and `/sign-up` render Clerk's card (Google only,
in Mongolian via `lib/auth/clerkLocalization.ts` = `@clerk/localizations` mn-MN + our titles, passed to
`ClerkProvider` in `app/layout.tsx`) plus `components/auth/PhoneLogin.tsx`:

1. `lib/auth/sendPhoneCode.ts` → `lib/otp/requestOtp.ts` → `lib/verify/createVerifySession.ts`: **verify.mn
   is reverse SMS**: it texts nothing; the buyer sends a 6-digit code to shortcode 144773 from their phone
   (`PhoneSmsStep`, `sms:` link). We store an HMAC (`OTP_SECRET`) of phone + sessionId in `phone_otps`
   (Prisma `PhoneOtp`), 1/min and 5/hour per phone.
2. `usePhoneVerifyPoll` calls `lib/auth/verifyPhoneCode.ts` every 3 s → `lib/otp/verifyOtp.ts` asks
   `GET /sessions/:id` (`lib/verify/getVerifyStatus.ts`); on VERIFIED it finds/creates the Clerk user via
   our `phone_users` table (Prisma `PhoneUser`; Clerk users have no phone, it rejects +976) and returns a
   60 s sign-in token; the browser calls `signIn.ticket()` + `signIn.finalize()`.

Env: `SMS_API_URL` = `https://api.verify.mn/sessions`, `SMS_API_KEY` = `vrf_...`. verify.mn keeps saying
PENDING after `expiresAt`, so our own row's expiry is what ends a session. Clerk instance config: phone
enabled but `used_for_sign_in: false`; email/password off; "force organization selection" off (2026-11-19).

**Roles.** Clerk `publicMetadata.role` (typed in `src/types/clerk.d.ts`), writable only by the server:
`"admin"` = owner, `"b2b"` = approved business buyer (free delivery via `deliveryFeeFor(subtotal, isB2B)`),
unset = regular buyer. Buyers apply at `/business` → `business_applications` table (Prisma
`BusinessApplication`) → admin approves (`approveApplication`, sets the role). The `/admin/business`
and `/admin/shops` pages are removed for now (menu entries hidden in `adminNav.ts`); the approval
pieces (`ApplicationsTable`, `ReviewActions`) still sit in `app/admin/`. `src/proxy.ts`
requires sign-in for `/admin`, `/business`, `/checkout`; the admin role is checked server-side in
`app/admin/layout.tsx` (`requireAdmin`) and again in every admin server action. An approved B2B
customer's `/business` is a dashboard with a monthly order list (`StandingOrder` +
`StandingOrderItem`: products, quantities, day 1–28, active): saved via `saveMonthlyOrder` (re-checks
the b2b role and each product's `minQty`), and "add all to cart". Auto-placing it on that day
comes after orders exist (Day 6–8).

**Admin.** `/admin` dashboard: day navigator `‹ [📅 11-р сарын 22, Ням] ›` + "Өнөөдөр рүү буцах"
(`DayNavigator`; the middle is a native `<input type="date">`, any past day). `?day=YYYY-MM-DD` →
`resolveDashboardDay` (`lib/date/ubDayFromKey` + `buildUbDay`, one UB day = UTC+8); an invalid or
future day falls back to today with a clay notice. One date format everywhere ("11-р сарын 22").
Admin "pick one" filters (orders, receipts, product categories) all use `components/admin/filterChipClass`.
Orders are listed under day headings ("Өнөөдөр", "Өчигдөр", …; `orders/_features/groupOrdersByDay`).
Status changes and deletes ask first inline, in words ("Тийм, устгах" / "Болих"). `page.tsx` starts the day's queries without awaiting and `DayReport`
awaits them inside `<Suspense key={day}>`, so switching days shows a skeleton, never the old day's
money. Cards: Нийт орлого (`getDayMoney`, PAID orders by `paidAt`) split into Онлайн захиалга and
Касс (`getStoreDaySales`); then one table of goods out with money per item (`getDayOutgoing`:
quantity, price range, `price × quantity`, stock left) + delivery fees = the total. Product units are
"шуудай" (sacks) since 2026-11-23; old order items keep "кг". `/admin/orders`: filters
`?pay=paid|unpaid|delivered&type=delivery|pickup`; Касс sales are never listed; DELIVERED orders show
only under "Хүргэгдсэн" (never deleted: receipts and income depend on them). One status badge per order
(`orders/_features/orderState.ts`). "Хүргэж өгсөн" / "Очиж авсан" (`markDelivered`, PAID only →
`DELIVERED`). `/admin/products` edit dialog changes only "Үнэ ба үлдэгдэл"; the other fields go along
unchanged as hidden inputs (`KeepFields`), creating a product shows the full form.

**Касс (POS, `/admin/physical-store`).** The owner sells at the market stall: tap product tiles, the
bill (`usePosCart`, client state) → `recordStoreSale` server action (re-checks admin, zod, re-prices
from the DB, checks stock) saves an `Order` with `deliveryType: "store"`, `status: DELIVERED`,
`paymentMethod` CASH/CARD/TRANSFER (labels in `lib/orders/paymentMethodLabel.ts`), then calls
`payOrder`, so the receipt, stock and income work exactly like an online order. No separate tables.
Cash needs the amount handed over ≥ total (`paymentBlockReason`); quick notes are fixed
(`QUICK_CASH_NOTES`) so they don't move under the cashier's finger.

**Styling.** `app/styles/brand.css` holds the palette (`brand`, `cream`, `ink`, `clay`, `line`) and
classes (`.btn`, `.card`, `.input`, `.container-x`); `globals.css` maps shadcn tokens onto it. The
storefront background is white (rule 7); `cream` is only for the admin. Grey text is
`text-muted-foreground` (`text-muted` is a background color in shadcn). The shop name is `SHOP_NAME`
("Бөөний Зах Онлайн", also the seller on receipts).

## Gotchas

- **Next 16**: APIs differ from older versions; read `node_modules/next/dist/docs/` first (AGENTS.md).
- **Clerk Core 3**: `<SignedIn>`/`<SignedOut>`/`<Protect>` exist but throw at runtime; use
  `<Show when="signed-in" | "signed-out">`, wrapped in `<Suspense>` in Server Components. Optional
  fields are hidden unless `appearance.options.showOptionalFields` is set. `await auth()`.
- **shadcn `base-nova`** uses Base UI: no `asChild`, use `render`.
- **After a Prisma migration/generate, restart `npm run dev`.** `lib/prisma.ts` caches the client on
  `globalThis`, so a dev server started earlier keeps the old one: "Unknown field `x` for select
  statement" for a new field, "Cannot read properties of undefined (reading 'findMany')" for a new model.
- **The Supabase pooler sometimes refuses connections (P1001 "Can't reach database server").** `next build`
  prerenders DB-backed pages, so it fails on a random page (`/cart`, `/`, `/business`); retry before
  debugging the code. Migrations fail the same way.
- **Effects run twice in dev (StrictMode).** Don't combine a "done once" flag (sessionStorage) with
  cancelling async work in the effect cleanup; the second run sees the flag and the answer is lost.
- Don't run `prettier --write`: the repo isn't Prettier-formatted and it rewraps files past 150 lines.
- **`backdrop-blur` (or any filter/transform) on an ancestor traps `position: fixed`**: a drawer inside
  it gets clipped to that box. The admin top bar is solid white for this reason; the shop mobile menu
  renders its drawer through a portal.
- **Turbopack sometimes keeps a stale `globals.css`** (a changed CSS variable doesn't show): restart
  `npm run dev`.
- **Claude in Chrome can't resize the owner's maximized window.** For admin pages at phone width,
  inject a same-origin `<iframe>` (390×844) over any `localhost:3000` page with `javascript_tool`;
  it shares the admin's Clerk cookies. Zoom the screenshot onto it (the screenshot frame may be
  scaled vs CSS px) and measure tap targets via `iframe.contentDocument`. Buyer pages can be shot
  headless with `.claude/skills/ui-review/shot.mjs <url> <png> 390` (signed out).
- Clerk config changes: `npx clerk@latest config patch --file x.json --dry-run --mode agent` first.
