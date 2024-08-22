import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { LetterState } from '../../../../../shared/entities/letter_state.entity';
import { UserState } from '../../../../../shared/entities/user_state.entity';
import { Letter } from '../../../../../shared/entities/letter.entity';
import { LetterDbService } from '../letter_db.service';
import { Repository } from 'typeorm';
import {
  letter,
  letterState,
  user_1,
  user_2,
  user_3,
  user_4,
} from './letter-dummyData';

describe('letter-db.service 테스트', () => {
  let service: LetterDbService;
  let letterStateRepository: Repository<LetterState>;
  let userStateRepository: Repository<UserState>;
  let letterRepository: Repository<Letter>;

  //* TypeORM의 메서드를 사용하면, 일반적으로 데이터베이스의 종류에 관계없이 반환되는 결과는 동일
  //* 테스트는 실제 데이터베이스를 말고, 인메모리 데이터베이스를 이용하여 테스트한다.
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [LetterState, UserState, Letter],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([LetterState, UserState, Letter]),
      ],
      providers: [LetterDbService],
    }).compile();

    letterStateRepository = module.get<Repository<LetterState>>(
      getRepositoryToken(LetterState),
    );
    userStateRepository = module.get<Repository<UserState>>(
      getRepositoryToken(UserState),
    );
    letterRepository = module.get<Repository<Letter>>(
      getRepositoryToken(Letter),
    );

    service = module.get<LetterDbService>(LetterDbService);

    await userStateRepository.save(user_1);
    await userStateRepository.save(user_2);
    await userStateRepository.save(user_3);
    await userStateRepository.save(user_4);
    await letterStateRepository.save(letterState);
    await letterRepository.save(letter);
  });

  afterAll(async () => {
    await letterStateRepository.clear();
    await userStateRepository.clear();
    await letterRepository.clear();
  });

  it('편지 안받는 사용자 찾기', async () => {
    expect(await service.getUserWithLongestReceiveTime('1')).toEqual(user_3);
  });

  it('saveLetterMethod Test', async () => {
    expect(await service.saveLetter('hello')).toEqual({
      letter_id: 2,
      content: 'hello',
    });
  });

  it('LetterState 저장 및 편지 삭제', async () => {
    await service.saveLetterState(1, 'test', 'test', 1111);
    const result = await service.deleteLetterState(1);
    expect(result.affected).toBe(1);
  });

  it('deleteLetterState Test: 해당 id가 존재하지 않을 때', async () => {
    const result = await service.deleteLetterState(1);
    expect(result.affected).toBe(0);
  });

  describe('getLetter Test', () => {
    it('getLetter 등록된 편지 찾기', async () => {
      const result = await service.getLetter(1);
      expect(result.letter_id).toBe(letter.letter_id);
      expect(result.content).toBe('Test');
    });

    it('getLetter 잘못된 id로 편지 찾기', async () => {
      const result = await service.getLetter(9999);
      expect(result).toBeNull();
    });
  });

  describe('getLetterid', () => {
    it('등록된 id에 등록된 편지 찾기 ( 편지 존재 o )', async () => {
      await letterStateRepository.save(letterState);
      const result = await service.getLetterUsingid(user_2.id);
      expect(result).toEqual(letterState);
    });

    it('등록된 id에 등록된 편지 찾기 ( 편지 존재 x )', async () => {
      const result = await service.getLetterUsingid(user_4.id);
      expect(result).toBeNull();
    });

    it('존재하지 않는 id 접근', async () => {
      const result = await service.getLetterUsingid('9999');
      expect(result).toBeNull();
    });
  });
});
