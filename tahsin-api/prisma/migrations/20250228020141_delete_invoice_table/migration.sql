/*
  Warnings:

  - You are about to drop the column `type` on the `PaymentConfirmation` table. All the data in the column will be lost.
  - You are about to drop the `Invoices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `academicTermPaymentFee_id` to the `PaymentConfirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outstanding_amount` to the `PaymentConfirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_id` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_academicTermPaymentFee_id_fkey";

-- DropForeignKey
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_registration_id_fkey";

-- DropForeignKey
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_student_id_fkey";

-- AlterTable
ALTER TABLE "PaymentConfirmation" DROP COLUMN "type",
ADD COLUMN     "academicTermPaymentFee_id" INTEGER NOT NULL,
ADD COLUMN     "outstanding_amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "registration_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Invoices";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentConfirmation" ADD CONSTRAINT "PaymentConfirmation_academicTermPaymentFee_id_fkey" FOREIGN KEY ("academicTermPaymentFee_id") REFERENCES "AcademicTermPaymentFee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
