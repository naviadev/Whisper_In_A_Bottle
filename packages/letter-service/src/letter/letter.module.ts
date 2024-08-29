import { Module } from '@nestjs/common';
import { LetterLogicService } from './letter_logic.service';
import { LetterGateway } from './letter.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetterState } from '../../../../shared/entities/letter_state.entity';
import { UserState } from '../../../../shared/entities/user_state.entity';
import { Letter } from '../../../../shared/entities/letter.entity';
import { LetterDbService } from './letter_db.service';
import { JwtModule } from '@nestjs/jwt';
import { typeOrmConfig } from '@shared/config/typeorm.config';
import { configOptions } from '@shared/config/env.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LetterInfo } from '@shared/entities/letter_info.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([LetterState, UserState, Letter, LetterInfo]),
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot(configOptions)],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'), // 환경 변수에서 비밀 키 가져오기
        signOptions: { expiresIn: '60m' }, // 토큰 유효기간
      }),
    }),
  ],
  providers: [LetterGateway, LetterDbService, LetterLogicService],
})
export class LetterModule {}
