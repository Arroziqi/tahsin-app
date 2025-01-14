-- CreateEnum
CREATE TYPE "FeeType" AS ENUM ('TUITION_FEE', 'DOWN_PAYMENT', 'FINAL_INSTALLMENT');

-- CreateTable
CREATE TABLE "AcademicTermPaymentFee" (
    "id" SERIAL NOT NULL,
    "academicTerm_id" INTEGER NOT NULL,
    "type" "FeeType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" VARCHAR(500),
    "due_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicTermPaymentFee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AcademicTermPaymentFee" ADD CONSTRAINT "AcademicTermPaymentFee_academicTerm_id_fkey" FOREIGN KEY ("academicTerm_id") REFERENCES "AcademicTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
