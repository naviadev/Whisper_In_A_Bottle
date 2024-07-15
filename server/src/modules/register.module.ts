import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEntity } from './auth/registerEntity';
import { RegisterService } from './auth/register.service';
import { RegisterController } from './auth/register.controller';

/**
 * CHECKLIST
 * [ ] Module 정의 .
 * NOTE : 사전 작업
 * NOTE : 1. Register Service Controller Entity 구현
 */

@Module({
  imports: [TypeOrmModule.forFeature([RegisterEntity])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
