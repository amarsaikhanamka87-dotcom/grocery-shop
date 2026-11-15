---
name: page-structure
description: Build a new page, or convert an existing one, into the owner's layout — page.tsx + _components/ (all UI of the page) + _features/ (business logic & hooks of the page). Use when creating a route/page, adding UI or logic to a page, or when a page mixes UI and logic.
---

# Build or convert a page

Follow `.claude/rules/page-structure.md`: `_components/` = UI, `_features/` = logic & hooks.

1. **Read the page.** Read `page.tsx` and everything it renders. Check `node_modules/next/dist/docs/`
   for any Next.js API you're unsure of (see `AGENTS.md`).
2. **Sort every piece into UI or logic.**
   - UI (sections, cards, rows, forms, empty states) → `_components/<Name>.tsx`.
   - Logic (hooks, calculations, validation, URL builders, state, page-only server actions) →
     `_features/<name>.ts` (hooks are `use<Name>.ts`).
   Show the user the list first if the page is large or the split is unclear.
3. **Reuse before creating.** Check `src/components/` (shared UI) and `src/lib/` (shared logic). If a
   second page needs the piece, put it there instead.
4. **Move the code.** 1 file = 1 job, under 150 lines each. Components call hooks/helpers from
   `_features/`; `_features/` never imports `_components/`. Data from the database comes through
   `src/lib/<domain>/` (Prisma), never hard-coded.
5. **Thin the page.** `page.tsx` ends up as imports, `metadata`, auth and data calls, and the list of
   `_components` it renders.
6. **Keep behaviour identical.** Don't change Mongolian UI text, classes, links or actions while
   moving code, unless the user asked.
7. **Verify.** `npm run lint && npm run typecheck && npm run build`; for visual pages, run the app.
8. **Report** the route's new file tree and anything moved to `src/components/` or `src/lib/`.
