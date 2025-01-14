/*
  Warnings:

  - You are about to drop the column `user_id` on the `Class` table. All the data in the column will be lost.
  - Added the required column `teacher_id` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_user_id_fkey";

-- AlterTable
ALTER TABLE "AcademicCalender" ALTER COLUMN "admin_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "AcademicTerm" ALTER COLUMN "admin_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "user_id",
ADD COLUMN     "teacher_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
