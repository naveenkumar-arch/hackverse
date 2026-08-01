import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  DATABASE_URL: z.string().default('postgresql://postgres:password@localhost:5432/ko_db?schema=public'),
  JWT_SECRET: z.string().default('ko_super_secret_access_jwt_key_2026'),
  JWT_REFRESH_SECRET: z.string().default('ko_super_secret_refresh_jwt_key_2026'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  CLIENT_URL: z.string().default('http://localhost:5173'),
  RESEND_API_KEY: z.string().optional().default('re_123456789'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment configuration:', _env.error.format());
  throw new Error('Invalid environment configuration');
}

export const env = _env.data;
