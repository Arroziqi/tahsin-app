/*
  Warnings:

  - You are about to drop the column `name` on the `Teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "name",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_user_id_key" ON "Teacher"("user_id");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
