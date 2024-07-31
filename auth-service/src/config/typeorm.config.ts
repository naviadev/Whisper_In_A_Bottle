import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '../.env'),
});

// 필수 환경 변수 확인
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const PORT = process.env.DB_PORT || '5432';

const sslOptions =
  process.env.DB_SSL === 'true'
    ? {
        rejectUnauthorized: false,
        ca: fs
          .readFileSync(
            path.resolve(process.cwd(), '../.ap-northeast-2-bundle.pem'),
          )
          .toString(),
      }
    : false;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  // entities : [join(__dirname, '**', '*.entity.{ts,js}')]
  synchronize: process.env.TYPEORM_SYNC === 'true',
  ssl: sslOptions,
  logging: process.env.DB_LOGGING === 'true',
  logger: 'advanced-console',
};
