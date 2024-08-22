import { Module } from '@nestjs/common';
import { LetterLogicService } from './letter_logic.service';
import { LetterGateway } from './letter.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetterState } from '../../../../shared/entities/letter_state.entity';
import { UserState } from '../../../../shared/entities/user_state.entity';
import { Letter } from '../../../../shared/entities/letter.entity';
import { typeOrmConfig } from '../../../../shared/config/env.config';
import { LetterDbService } from './letter_db.service';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([LetterState, UserState, Letter]),
  ],
  providers: [LetterGateway, LetterDbService, LetterLogicService],
})
export class LetterModule {}
