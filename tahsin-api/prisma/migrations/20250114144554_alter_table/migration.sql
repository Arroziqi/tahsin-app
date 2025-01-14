/*
  Warnings:

  - A unique constraint covering the columns `[academicTerm_id]` on the table `AcademicTermPaymentFee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `AcademicTermPaymentFee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AcademicTermPaymentFee" ADD COLUMN     "admin_id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AcademicTermPaymentFee_academicTerm_id_key" ON "AcademicTermPaymentFee"("academicTerm_id");

-- AddForeignKey
ALTER TABLE "AcademicTermPaymentFee" ADD CONSTRAINT "AcademicTermPaymentFee_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
