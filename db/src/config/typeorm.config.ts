import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const sslOptions =
  process.env.DB_SSL === 'true'
    ? {
        rejectUnauthorized: false,
        ca: fs.readFileSync('ap-northeast-2-bundle.pem').toString(),
      }
    : false;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC === 'true',
  ssl: sslOptions,
};
