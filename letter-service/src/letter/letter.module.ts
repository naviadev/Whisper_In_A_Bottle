import { Module } from '@nestjs/common';
import { LetterController } from './letter.controller';
import { LetterService } from './letter.service';
import { LetterGateway } from './letter.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetterState } from './entities/letter-state.entity';
import { UserState } from './entities/user-state.entity';
import { Letter } from './entities/letter.entity';
import { typeOrmConfig } from './config/env.config';
import { LetterDbService } from './letter-db.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([LetterState, UserState, Letter]),
  ],
  controllers: [LetterController],
  providers: [LetterGateway, LetterService, LetterDbService],
})
export class LetterModule {}
