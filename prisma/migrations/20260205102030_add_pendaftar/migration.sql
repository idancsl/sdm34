/*
  Warnings:

  - The primary key for the `Pendaftar` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Pendaftar" DROP CONSTRAINT "Pendaftar_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Pendaftar_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Pendaftar_id_seq";
