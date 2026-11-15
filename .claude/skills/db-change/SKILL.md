---
name: db-change
description: Change the database schema safely with Prisma + Supabase — edit prisma/schema.prisma, create and review a migration, update the query functions, and verify. Use whenever a model, field, enum or relation is added, renamed or removed.
---

# Database schema change (Prisma + Supabase)

The Supabase database also holds the old Ургац app's tables (`User`, `Order`, `OrderItem`, ...).
They stay in `prisma/schema.prisma` so Prisma never generates a `DROP` for them.

1. **Edit** `prisma/schema.prisma`. Store money as `Int` tögrög. Keep Mongolian comments on enum values.
2. **Check:** `npx prisma format && npx prisma validate`.
3. **Create the migration:** `npx prisma migrate dev --name <snake_case>`. Ask the owner first, because
   this writes to the database. Never use `prisma db push` or `prisma migrate reset`.
   - Read the new `prisma/migrations/*/migration.sql`. If it has `DROP`, a rename (which Prisma turns
     into drop + add) or a `NOT NULL` column with no default, stop and explain the data-loss risk.
   - If the table already exists in the DB, write the SQL by hand, run
     `npx prisma migrate resolve --applied <name>`, then confirm
     `npx prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma`
     prints "No difference detected".
4. **Regenerate:** `npx prisma generate` (also runs on `npm install`). Restart `npm run dev`.
5. **Update dependents:** one query function per file in `src/lib/<domain>/` (1 file = 1 job), the zod
   schemas and server actions that use it, and Mongolian labels for new enum values.
6. **Verify:** `npm run lint && npm run typecheck && npm run build`.
7. **Summarize** what changed and whether anything was destructive.
