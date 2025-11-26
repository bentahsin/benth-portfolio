import { defineConfig } from '@prisma/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  experimental: {
    adapter: true,
  },

  datasource: {
    url: process.env.DATABASE_URL!,
  },

  adapter: async () => {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    return new PrismaPg(pool);
  },
});