import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { letterModule } from './modules/letter/letter.module';
import User from './entity/User.entity';
import { RegisterModule } from './modules/register.module';

import { AuthModule } from './modules/login/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sungbin',
      password: '',
      database: 'whisper',
      entities: [User],
    }),
    RegisterModule,
    letterModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
