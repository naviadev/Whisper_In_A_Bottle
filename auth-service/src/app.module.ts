import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { letterModule } from './modules/letter/letter.module';
import { AuthModule } from './modules/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, letterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
