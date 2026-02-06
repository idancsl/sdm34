// lib/prisma.js
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client'; // atau '../generated/prisma/client' jika kamu generate client di folder custom

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({
  adapter,
  log: ['query', 'error'],
});
