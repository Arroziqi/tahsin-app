-- AlterTable
ALTER TABLE "PaymentConfirmation" ALTER COLUMN "payment_receipt_img_path" DROP NOT NULL,
ALTER COLUMN "transaction_number" DROP NOT NULL;
