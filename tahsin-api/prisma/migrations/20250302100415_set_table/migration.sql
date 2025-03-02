-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_level_id_fkey";

-- AlterTable
ALTER TABLE "PaymentConfirmation" ALTER COLUMN "status" SET DEFAULT 'UNPAID';

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "level_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;
