import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { letterModule } from './letter/letter.module';
import User from './entity/User.entity';
import { RegisterModule } from './modules/register.module';

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
    letterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
