/*
  Warnings:

  - Added the required column `hosp_bairro` to the `hospitals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hospitals" ADD COLUMN     "hosp_bairro" TEXT NOT NULL;
