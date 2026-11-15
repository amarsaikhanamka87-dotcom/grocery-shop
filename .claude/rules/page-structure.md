---
paths:
  - "src/app/**"
  - "src/components/**"
---

# Page structure: `_components/` = UI, `_features/` = logic

The owner's layout. Every page keeps its own UI and its own logic inside its own folder:

```
app/
├── shop/
│   ├── _components/      # UI components used only in /shop
│   ├── _features/        # Business logic & hooks specific to /shop
│   └── page.tsx
└── checkout/
    ├── _components/      # UI components used only in /checkout
    ├── _features/        # Business logic & hooks specific to /checkout
    └── page.tsx
```

## What goes where

| Folder | Holds | Examples | Never |
|---|---|---|---|
| `page.tsx` | The route: `metadata`, auth check, data loading, then renders `_components` | `CheckoutPage` | markup sections, business rules |
| `_components/` | **All UI of this page**: big sections and small pieces. `.tsx`, PascalCase | `CheckoutForm.tsx`, `OrderSummary.tsx`, `CartRow.tsx` | price math, validation, fetch/DB calls, state machines |
| `_features/` | **Business logic & hooks of this page**: hooks, calculations, validation, URL/state helpers, page-only server actions. `.ts`, camelCase | `useCheckoutForm.ts`, `shopHref.ts`, `calcCartTotals.ts`, `placeOrder.ts` | JSX / UI |
| `src/components/<area>/` | UI shared by 2+ pages | `layout/Header.tsx`, `product/ProductCard.tsx` | page-specific UI |
| `src/lib/<domain>/` | Logic shared by 2+ pages, DB queries (Prisma), external services | `catalog/getProduct.ts`, `otp/verifyOtp.ts` | page-specific logic |

## Rules

- **UI and logic are separate files.** A `_components` file shows things and calls a hook or prop;
  the rule/calculation/state lives in a `_features` file. If a component grows logic, move the logic
  into a `use<Thing>.ts` hook or a plain function in `_features/`.
- **Imports:** `page.tsx` → `_components` + `_features`; `_components` → `_features` (hooks/helpers)
  and `src/components`; `_features` → `src/lib`. `_features` never imports from `_components`.
- **Every page owns its folder.** Never put `_components/` or `_features/` directly in a route group
  like `(shop)/`; they'd look global. The home page lives in `(shop)/(home)/` (the `(home)` group
  keeps the URL `/`). A route group root holds only `layout.tsx` and page folders.
- **Create folders only when needed.** A page with no page-specific logic has no `_features/`
  (e.g. `/farms`, `/help`); one that only renders shared pieces may have neither (`/sign-in`).
- **Shared code is the one exception to isolation** (owner let Claude decide): UI used by 2+ pages
  lives in `src/components/<area>/`, logic used by 2+ pages in `src/lib/<domain>/`, so a fix
  happens in one place. Code starts in its page's folder and moves out only when a second page
  needs it. Never copy a shared piece into a page.
- `_` folders are private (not routes). Never put `page.tsx`, `layout.tsx` or `route.ts` inside them.
- **1 file = 1 job** (`.claude/rules/one-file-one-job.md`): one component, hook or function per
  file; **max 150 lines** (hook `.claude/hooks/max-lines.mjs` + ESLint `max-lines`).
- Add `"use client"` only to the smallest component that needs state or events, never `page.tsx`.
  Client hooks in `_features/` start with `"use client"` too when they use React state.

## Existing code

All pages follow this layout (converted 2026-11-16). Keep it that way: new UI → `_components/`,
new logic → `_features/`, using the `page-structure` skill.
