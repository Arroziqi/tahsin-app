-- CreateTable
CREATE TABLE "AcademicCalender" (
    "id" SERIAL NOT NULL,
    "academicTerm_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicCalender_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AcademicCalender" ADD CONSTRAINT "AcademicCalender_academicTerm_id_fkey" FOREIGN KEY ("academicTerm_id") REFERENCES "AcademicTerm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicCalender" ADD CONSTRAINT "AcademicCalender_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
