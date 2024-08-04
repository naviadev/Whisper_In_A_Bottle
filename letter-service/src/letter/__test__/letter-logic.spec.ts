import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { LetterState } from '../entities/letter-state.entity';
import { UserState } from '../entities/user-state.entity';
import { Letter } from '../entities/letter.entity';
import { LetterLogicService } from '../letter-logic.service';
import { LetterDbService } from '../letter-db.service';
import { Repository } from 'typeorm';
import {
  letter,
  letterState,
  user_1,
  user_2,
  user_3,
  user_4,
} from './letter-dummyData';

describe('Letter Login Test', () => {
  let letterStateRepository: Repository<LetterState>;
  let userStateRepository: Repository<UserState>;
  let letterRepository: Repository<Letter>;
  let letterLogicService: LetterLogicService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [LetterState, UserState, Letter],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([LetterState, UserState, Letter]),
      ],
      providers: [LetterLogicService, LetterDbService],
    }).compile();

    letterLogicService = module.get<LetterLogicService>(LetterLogicService);

    letterStateRepository = module.get<Repository<LetterState>>(
      getRepositoryToken(LetterState),
    );
    userStateRepository = module.get<Repository<UserState>>(
      getRepositoryToken(UserState),
    );
    letterRepository = module.get<Repository<Letter>>(
      getRepositoryToken(Letter),
    );

    letterStateRepository.save(letterState);
    userStateRepository.save(user_1);
    userStateRepository.save(user_2);
    userStateRepository.save(user_3);
    userStateRepository.save(user_4);
    letterRepository.save(letter);
  });

  it('saveAndAssignLetter Test', async () => {
    const result = await letterLogicService.saveAndAssignLetter('1', {
      content: '안녕하세요',
    });

    expect(result.letterId).toBe(2);
    expect(result.receiverId).toBe(user_3.userId);
    expect(result.senderId).toBe(user_1.userId);
  });

  describe('searchLetter Test', () => {
    it('존재하는 id 값을 찾았을 때', async () => {
      const result = await letterLogicService.searchLetter(1);
      expect(result.letterId).toBe(letter.letterId);
      expect(result.content).toBe(letter.content);
    });

    it('존재하지 않는 id값으로 찾았을 때', async () => {
      const result = await letterLogicService.searchLetter(9999);
      expect(result).toBeNull();
    });
  });

  describe('searchLetterState Test', () => {
    it('존재하는 유저 id로 LetterState를 찾을 때 ( LetterState 존재 )', async () => {
      const result = await letterLogicService.searchLetterState('2');
      expect(result).toEqual(letterState);
    });

    it('존재하는 유저 id로 LetterState를 찾을 때 ( LetterState 존재 X )', async () => {
      const result = await letterLogicService.searchLetterState('4');
      expect(result).toBeNull();
    });

    it('존재하지 않는 Id로 LetterState를 찾을 때', async () => {
      const result = await letterLogicService.searchLetterState('9999');
      expect(result).toBeNull();
    });
  });
});