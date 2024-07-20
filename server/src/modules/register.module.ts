import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEntity } from './auth/registerEntity';
import { RegisterService } from './auth/register.service';
import { RegisterController } from './auth/register.controller';

/**
 * * Decorator : Module
 * 작성자 : @naviadev / 2024-07-16
 * 편집자 : @naviadev / 2024-07-17
 * Issue : WIB-14
 * @decorator Module
 * @description : Register 그룹화.
 */
@Module({
  imports: [TypeOrmModule.forFeature([RegisterEntity])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
