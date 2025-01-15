-- CreateEnum
CREATE TYPE "PaymentConfirmationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "FeeType" ADD VALUE 'LAB_FEE';
ALTER TYPE "FeeType" ADD VALUE 'ACTIVITY_FEE';

-- CreateTable
CREATE TABLE "PaymentConfirmation" (
    "id" SERIAL NOT NULL,
    "type" "FeeType" NOT NULL,
    "payment_receipt_img_path" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,
    "transaction_number" INTEGER NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "status" "PaymentConfirmationStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "student_id" INTEGER NOT NULL,

    CONSTRAINT "PaymentConfirmation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaymentConfirmation" ADD CONSTRAINT "PaymentConfirmation_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
