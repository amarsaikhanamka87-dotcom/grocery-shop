-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PAID');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "companyRegNo" TEXT,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
ADD COLUMN     "qpayInvoiceId" TEXT,
ADD COLUMN     "qpayQrImage" TEXT,
ADD COLUMN     "qpayShortUrl" TEXT,
ADD COLUMN     "qpayUrls" JSONB,
ALTER COLUMN "paymentMethod" SET DEFAULT 'QPAY';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "minQty" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "companyRegNo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_qpayInvoiceId_key" ON "Order"("qpayInvoiceId");

