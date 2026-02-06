// scripts/createAdmin.js
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma.js';

async function main() {
  const username = 'kepsek'; // username default
  const password = 'kepsek123'; // password default
  const name = 'Miftah, S.Ag'; // nama admin

  // cek apakah admin sudah ada
  const existing = await prisma.admin.findUnique({
    where: { username },
  });

  if (existing) {
    console.log('Admin sudah ada!');
    return;
  }

  // hash password
  const hashed = await bcrypt.hash(password, 10);

  // buat admin baru
  await prisma.admin.create({
    data: {
      username,
      password: hashed,
      name,
    },
  });

  console.log('Admin berhasil dibuat!');
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
