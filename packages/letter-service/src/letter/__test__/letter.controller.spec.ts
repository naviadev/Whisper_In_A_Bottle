import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { LetterState } from '@shared/entities/letter_state.entity';
import { UserState } from '@shared/entities/user_state.entity';
import { Letter } from '@shared/entities/letter.entity';
import { LetterInfo } from '@shared/entities/letter_info.entity';
import { LetterSave } from '@shared/entities/letter_save.entitiy';
import { LetterDbService } from '../letter_db.service';
import { LetterController } from '../letter.controller';
import { Repository, DeleteResult } from 'typeorm';
import { saveLetterDto } from './letter-dummyData';
import { LETTER_CONFIG } from '../config/letter.enum';

describe('Letter Controller Test', () => {
  let app: INestApplication;
  let controller: LetterController;
  let letterSave: Repository<LetterSave>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [LetterState, UserState, Letter, LetterInfo, LetterSave],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([
          LetterState,
          UserState,
          Letter,
          LetterInfo,
          LetterSave,
        ]),
      ],
      controllers: [LetterController],
      providers: [LetterDbService],
    }).compile();

    controller = module.get<LetterController>(LetterController);
    letterSave = module.get<Repository<LetterSave>>(
      getRepositoryToken(LetterSave),
    );
    app = module.createNestApplication();
    await app.init();
  });

  describe('POST TEST', () => {
    it('저장된 데이터가 10개 이하일 때', async () => {
      const result = await controller.saveLetter(saveLetterDto);
      const count = (await letterSave.find()).length;
      expect(result).toBeUndefined();
      expect(count).toBe(1);
    });

    it('저장된 데이터가 저장된 양을 초과했을 때', async () => {
      for (let i = 0; i < LETTER_CONFIG.MAX_SAVE_COUNT; i++) {
        await letterSave.save({
          user_id: saveLetterDto.userId,
          letter_id: saveLetterDto.letterId,
        });
      }

      const result = await controller.saveLetter(saveLetterDto);
      const count = (await letterSave.find()).length;
      expect((result as DeleteResult).affected).toBe(1);
      expect(count).toBe(10);
    });
  });
});
