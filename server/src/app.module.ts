import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule, // ConfigModule을 import하여 환경 변수 로드
    AuthModule, // AuthModule을 import하여 JWT 인증 설정
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
