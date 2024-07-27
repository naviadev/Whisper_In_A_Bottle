import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '../.env'),
});

const PORT = process.env.DB_PORT || '5432';

const sslOptions =
  process.env.DB_SSL === 'true'
    ? {
        rejectUnauthorized: false,
        ca: fs
          .readFileSync(
            path.resolve(process.cwd(), '../ap-northeast-2-bundle.pem'),
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
  entities: [process.cwd() + '/src/**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC === 'true',
  ssl: sslOptions,
};
