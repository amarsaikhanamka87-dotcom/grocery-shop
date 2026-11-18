-- CreateEnum
CREATE TYPE "Recurrence" AS ENUM ('WEEKLY', 'BIWEEKLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "recurrence" "Recurrence",
ADD COLUMN     "recurrence_days" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "recurrence_end" DATE,
ADD COLUMN     "recurrence_start" DATE;
