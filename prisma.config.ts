import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

export const prismaConfig = {
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL, // Supabase Postgres URL
  }),
};
