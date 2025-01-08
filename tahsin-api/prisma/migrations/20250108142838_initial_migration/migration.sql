/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Batch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Calendar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GradeComponent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Registration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_registration_id_fkey";

-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Calendar" DROP CONSTRAINT "Calendar_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "classes_level_id_foreign";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "classes_teacher_id_foreign";

-- DropForeignKey
ALTER TABLE "CourseFee" DROP CONSTRAINT "CourseFee_class_id_fkey";

-- DropForeignKey
ALTER TABLE "GradeComponent" DROP CONSTRAINT "GradeComponent_class_id_fkey";

-- DropForeignKey
ALTER TABLE "GradeComponent" DROP CONSTRAINT "GradeComponent_component_id_fkey";

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "registration_user_id_foreign";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_day_id_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_start_time_id_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_class_id_fkey";

-- DropTable
DROP TABLE "Attendance";

-- DropTable
DROP TABLE "Batch";

-- DropTable
DROP TABLE "Calendar";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "GradeComponent";

-- DropTable
DROP TABLE "Registration";

-- DropTable
DROP TABLE "Schedule";

-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "Schedules" (
    "id" SERIAL NOT NULL,
    "day_id" INTEGER NOT NULL,
    "time_id" INTEGER NOT NULL,
    "type" "MeetingTypeEnum" NOT NULL,

    CONSTRAINT "Schedules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_time_id_fkey" FOREIGN KEY ("time_id") REFERENCES "Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
