// auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '@shared/entities/user.entity';
import { AuthService } from './services/auth.service';
import { RegisterService } from './services/register.service';
import { AuthController } from './controllers/auth.controller';
import { RegisterController } from './controllers/register.controller';
import { ValidationService } from './services/validation.service';
import { configOptions } from '../config/env.config';
import { UserState } from '../../../../shared/entities/user-state.entity';

/**
 * * Decorator : Module
 * 작성자 : @naviadev / 2024-07-16
 * 편집자 : @moonhr / 2024-07-24
 * Issue : WIB-6
 * @decorator Module
 * @description : Auth 및 Register 그룹화.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserState]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // Passport 모듈을 'jwt' 기본 전략으로 설정
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot(configOptions)],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'), // 환경 변수에서 비밀 키 가져오기
        signOptions: { expiresIn: '60m' }, // 토큰 유효기간
      }),
    }),
    ConfigModule.forRoot(configOptions),
  ],
  controllers: [AuthController, RegisterController],
  providers: [AuthService, RegisterService, ValidationService],
})
export class AuthModule {}
