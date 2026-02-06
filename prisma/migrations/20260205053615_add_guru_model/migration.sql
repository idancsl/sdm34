-- CreateTable
CREATE TABLE "Guru" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guru_pkey" PRIMARY KEY ("id")
);
