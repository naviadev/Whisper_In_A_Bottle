// auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import User from 'src/entity/User.entity';
import { AuthService } from './services/auth.service';
import { RegisterService } from './services/register.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { RegisterController } from './controllers/register.controller';

/**
 * * Decorator : Module
 * 작성자 : @naviadev / 2024-07-16
 * 편집자 : @naviadev / 2024-07-17
 * Issue : WIB-14
 * @decorator Module
 * @description : Auth 및 Register 그룹화.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // Passport 모듈을 'jwt' 기본 전략으로 설정
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'), // 환경 변수에서 비밀 키 가져오기
        signOptions: { expiresIn: '60m' }, // 토큰 유효기간
      }),
    }),
    ConfigModule,
  ],
  providers: [AuthService, RegisterService, JwtStrategy],
  controllers: [AuthController, RegisterController],
})
export class AuthModule {}
