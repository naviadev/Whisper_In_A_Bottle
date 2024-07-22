import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entity/User.entity';
import { RegisterService } from './register/register.service';
import { RegisterController } from './register/register.controller';

/**
 * * Decorator : Module
 * 작성자 : @naviadev / 2024-07-16
 * 편집자 : @naviadev / 2024-07-17
 * Issue : WIB-14
 * @decorator Module
 * @description : Register 그룹화.
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
