/*
  Warnings:

  - You are about to drop the column `teacher_id` on the `Class` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_teacher_id_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "teacher_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
