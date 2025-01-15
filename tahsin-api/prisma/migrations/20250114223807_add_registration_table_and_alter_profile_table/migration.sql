/*
  Warnings:

  - Added the required column `previous_education` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MeetingTimeEnum" AS ENUM ('MORNING', 'EVENING');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "intended_program" VARCHAR(255),
ADD COLUMN     "previous_education" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "session_type" "MeetingTypeEnum" NOT NULL,
    "session_time" "MeetingTimeEnum" NOT NULL,
    "objective" VARCHAR(500) NOT NULL,
    "audio_path" VARCHAR(255),
    "available_dateTime" TIMESTAMP(3),

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);
