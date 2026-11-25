---
name: ui-review
description: Run a UI/UX review of the site as a buyer and as the admin. It launches the ui-ux-reviewer agent, which uses the running app (phone + desktop) and pins everything unclear, hard to read or off the 3-color / 3-text-style rule. Use after any UI change, before a release, or when the owner says a page feels unclear ("review the UI", "/ui-review", "is this understandable?").
---

# UI/UX review

The review is done by the **`ui-ux-reviewer`** agent (`.claude/agents/ui-ux-reviewer.md`). It only
looks and pins. Fixing happens afterwards, here, after the owner picks pins.

1. **Scope.** Take the pages from the request (e.g. `/admin/physical-store`, "the landing page").
   With no scope, use the pages changed in `git status` / `git diff --stat` (map `src/app/**/page.tsx`
   to URLs). If nothing changed, review the whole buyer flow and the admin flow.
2. **App running?** `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/`. If it is not 200,
   start `npm run dev` in the background. If CSS changes don't show (Turbopack keeps a stale
   `globals.css`), tell the owner to restart the dev server.
3. **Launch** the `ui-ux-reviewer` agent with: the scope (URLs + roles: buyer, admin), the reason
   (what changed and what the owner asked), the session scratchpad path for screenshots, and
   "do not edit files".
4. **Relay** its pins to the owner: the 🔴 and 🟠 pins in full, the 🟡 pins as one line each, plus
   anything it could not review (for example admin pages when Chrome is not connected).
5. **Ask** which pins to fix (all 🔴, specific numbers, or none). Don't fix anything without that
   answer. Then fix them following the project rules (1 file = 1 job, max 150 lines,
   page-structure), and verify with `npm run lint && npm run typecheck && npm run build`.
6. Optional: re-run the agent on just the fixed pages to confirm the pins are gone.

`shot.mjs` in this folder takes headless full-page screenshots of public pages:
`node .claude/skills/ui-review/shot.mjs http://localhost:3000/ <scratchpad>/home.png 390`.
