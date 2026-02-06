// scripts/createGuru.js
import { prisma } from "../lib/prisma.js"; // pastikan .js kalau pakai module ESM

async function main() {
  const guru = await prisma.guru.create({
    data: {
      name: "Muhamad Wildan Firdaus, S.Kom",
      subject: "Guru Kelas 4",
      photo: "/img/wildan.jpg",
      jenisKelamin: "L",
    },
  });

  console.log("Guru berhasil dibuat:", guru);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
