-- CreateTable
CREATE TABLE "Pendaftar" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "namaAyah" TEXT NOT NULL,
    "namaIbu" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "akte" TEXT NOT NULL,
    "kk" TEXT NOT NULL,
    "ijazah" TEXT NOT NULL,
    "pasFoto" TEXT NOT NULL,
    "buktiPembayaran" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pendaftar_pkey" PRIMARY KEY ("id")
);
