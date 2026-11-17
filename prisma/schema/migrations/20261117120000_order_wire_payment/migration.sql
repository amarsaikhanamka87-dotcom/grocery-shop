-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "clerkUserId" TEXT,
ADD COLUMN     "deliveryDate" DATE,
ADD COLUMN     "deliveryType" TEXT,
ADD COLUMN     "wireCheckoutUrl" TEXT,
ADD COLUMN     "wireIntentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_wireIntentId_key" ON "Order"("wireIntentId");

-- CreateIndex
CREATE INDEX "Order_clerkUserId_idx" ON "Order"("clerkUserId");

