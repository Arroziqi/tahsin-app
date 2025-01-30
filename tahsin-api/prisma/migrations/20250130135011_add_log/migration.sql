-- AlterTable
ALTER TABLE "PaymentConfirmation" ADD COLUMN     "admin_id" INTEGER;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "admin_id" INTEGER;

-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "admin_id" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "admin_id" INTEGER;
