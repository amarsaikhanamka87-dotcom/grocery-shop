-- CreateEnum
CREATE TYPE "ReceiptEmailStatus" AS ENUM ('PENDING', 'SENT', 'SKIPPED', 'FAILED');

-- CreateTable
CREATE TABLE "Receipt" (
    "id" TEXT NOT NULL,
    "number" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "email" TEXT,
    "emailStatus" "ReceiptEmailStatus" NOT NULL DEFAULT 'PENDING',
    "emailedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_number_key" ON "Receipt"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_orderId_key" ON "Receipt"("orderId");

-- CreateIndex
CREATE INDEX "Receipt_createdAt_idx" ON "Receipt"("createdAt");

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Backfill: every order already paid gets its receipt, numbered in payment order. They were never
-- emailed as БМ-3, so they start as SKIPPED (the admin can still send one from /admin/receipts).
INSERT INTO "Receipt" ("id", "orderId", "email", "emailStatus", "createdAt")
SELECT 'r' || "id", "id", "email", 'SKIPPED', COALESCE("paidAt", "createdAt")
FROM "Order"
WHERE "paymentStatus" = 'PAID'
ORDER BY COALESCE("paidAt", "createdAt");
