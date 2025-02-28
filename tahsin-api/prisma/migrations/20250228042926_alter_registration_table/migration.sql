/*
  Warnings:

  - You are about to drop the column `level_id` on the `Registration` table. All the data in the column will be lost.
  - Added the required column `level_id` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "PaymentConfirmationStatus" ADD VALUE 'UNPAID';

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_level_id_fkey";

-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "level_id";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "level_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
