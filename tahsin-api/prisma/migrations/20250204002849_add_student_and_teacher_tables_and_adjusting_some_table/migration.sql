-- DropForeignKey
ALTER TABLE "AcademicCalender" DROP CONSTRAINT "AcademicCalender_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "AcademicTerm" DROP CONSTRAINT "AcademicTerm_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "AcademicTermPaymentFee" DROP CONSTRAINT "AcademicTermPaymentFee_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_admin_id_fkey";

-- AlterTable
ALTER TABLE "AcademicCalender" ALTER COLUMN "admin_id" DROP NOT NULL,
ALTER COLUMN "admin_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "AcademicTerm" ALTER COLUMN "admin_id" DROP NOT NULL,
ALTER COLUMN "admin_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "AcademicTermPaymentFee" ALTER COLUMN "admin_id" DROP NOT NULL,
ALTER COLUMN "admin_id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Invoices" ALTER COLUMN "admin_id" DROP NOT NULL,
ALTER COLUMN "admin_id" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "AcademicTerm" ADD CONSTRAINT "AcademicTerm_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicCalender" ADD CONSTRAINT "AcademicCalender_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicTermPaymentFee" ADD CONSTRAINT "AcademicTermPaymentFee_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
