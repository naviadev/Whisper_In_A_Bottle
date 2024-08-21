import { Module } from '@nestjs/common';
import { LetterLogicService } from './letter-logic.service';
import { LetterGateway } from './letter.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetterState } from '../../../../shared/entities/letter-state.entity';
import { UserState } from '../../../../shared/entities/user-state.entity';
import { Letter } from '../../../../shared/entities/letter.entity';
import { typeOrmConfig } from '../../../../shared/config/env.config';
import { LetterDbService } from './letter-db.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([LetterState, UserState, Letter]),
  ],
  providers: [LetterGateway, LetterDbService, LetterLogicService],
})
export class LetterModule {}
