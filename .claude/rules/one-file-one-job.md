# 1 file = 1 job

Every code file does **one thing** and exports **one runtime unit**: one component, one hook, one
function, one server action, one const object or one class. The file name is that thing's name.

Enforced by the local ESLint rule `local/one-logic-per-file` (`eslint/one-logic-per-file.mjs`), plus
`react/no-multi-comp`, and the 150-line hook (`.claude/hooks/max-lines.mjs`).

## What counts

- ✅ Allowed alongside the one export: `export type` / `interface`, private (non-exported) helpers
  that only serve that one export, and Next.js route exports (`metadata`, `generateMetadata`,
  `dynamic`, `revalidate`, `viewport`, ...).
- ❌ Two exported functions, a component plus a hook, a provider plus its hook, two server actions,
  or a const map plus the function that uses it. Split them.
- Need a second export? Create a new file next to it. Need a helper in two files? Give it its own file.

## Folder structure

```
src/
  app/(shop)/<page>/          one folder per page (see page-structure rule)
    page.tsx                  data + auth, stacks features
    _components/<Name>.tsx    UI used only by this page, one component per file
    _features/<name>.ts       logic & hooks of this page, one function/hook per file
  components/<area>/<Name>.tsx   shared UI used by 2+ pages, one per file
  components/ui/              shadcn (generated, exempt)
  lib/<domain>/<fnName>.ts    one function per file, grouped by domain:
    catalog/                  getCategories.ts, findProducts.ts, getProduct.ts, sorts.ts, ...
    otp/                      requestOtp.ts, verifyOtp.ts, hashCode.ts, limits.ts
    auth/                     sendPhoneCode.ts, verifyPhoneCode.ts (server actions), ...
    format/  phone/  delivery/
  lib/prisma.ts               the Prisma client (schema: prisma/schema/*.prisma)
  types/<domain>.ts           shared types only (exempt)
  lib/constants.ts            settings values only, no functions (exempt)
```

- Import the exact file: `import { getProduct } from "@/lib/catalog/getProduct"`. No barrel
  `index.ts` files that re-export a folder; they hide which file owns the logic.
- React context: the context in `XContext.ts`, the provider in `XProvider.tsx`, the hook in `useX.ts`.
- Server actions: one action per `"use server"` file, named after the action (`sendPhoneCode.ts`).
- Exempt paths are listed in `eslint.config.mjs`. Don't add new exemptions without asking the user.
