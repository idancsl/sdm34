import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

dotenv.config(); // pastikan membaca .env

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL!, // <- harus ada tanda `!` untuk TypeScript
  },
  migrations: {
    path: "prisma/migrations",
  },
});

