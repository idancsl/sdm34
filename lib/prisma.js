import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    adapter,
    log: ['query', 'error'],
  });
} else {
  // Hot reload fix di dev
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      adapter,
      log: ['query', 'error'],
    });
  }
  prisma = global.prisma;
}

export { prisma };
