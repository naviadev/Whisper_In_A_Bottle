import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // 모듈을 전역으로 사용
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
