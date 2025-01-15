/*
  Warnings:

  - A unique constraint covering the columns `[transaction_number]` on the table `PaymentConfirmation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PaymentConfirmation" ALTER COLUMN "transaction_number" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentConfirmation_transaction_number_key" ON "PaymentConfirmation"("transaction_number");
