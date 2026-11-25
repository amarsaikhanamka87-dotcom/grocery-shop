-- The column already existed in the DB (added outside migrations); this records it.
ALTER TABLE "Order" ADD COLUMN "email" TEXT;
