import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { LetterState } from '../../../../../shared/entities/letter_state.entity';
import { UserState } from '../../../../../shared/entities/user_state.entity';
import { Letter } from '../../../../../shared/entities/letter.entity';
import { LetterDbService } from '../letter_db.service';
import { Repository } from 'typeorm';
import {
  letter,
  letter_2,
  letterState,
  user_1,
  user_2,
  user_3,
  user_4,
} from './letter-dummyData';
import { LetterInfo } from '../../../../../shared/entities/letter_info.entity';

describe('letter-db.service 테스트', () => {
  let service: LetterDbService;
  let letterStateRepository: Repository<LetterState>;
  let userStateRepository: Repository<UserState>;
  let letterRepository: Repository<Letter>;
  let letterInfoRepository: Repository<LetterInfo>;

  //* TypeORM의 메서드를 사용하면, 일반적으로 데이터베이스의 종류에 관계없이 반환되는 결과는 동일
  //* 테스트는 실제 데이터베이스를 말고, 인메모리 데이터베이스를 이용하여 테스트한다.
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [LetterState, UserState, Letter, LetterInfo],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([LetterState, UserState, Letter, LetterInfo]),
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
    letterInfoRepository = module.get<Repository<LetterInfo>>(
      getRepositoryToken(LetterInfo),
    );

    service = module.get<LetterDbService>(LetterDbService);

    await userStateRepository.save(user_1);
    await userStateRepository.save(user_2);
    await userStateRepository.save(user_3);
    await userStateRepository.save(user_4);
    await letterStateRepository.save(letterState);
    await letterRepository.save(letter);
  });

  afterEach(async () => {
    await letterStateRepository.clear();
    await userStateRepository.clear();
    await letterRepository.clear();
    await letterInfoRepository.clear();
  });

  it('편지 안받는 사용자 찾기', async () => {
    expect(await service.getUserWithLongestReceiveTime(user_1.id)).toEqual(
      user_3,
    );
  });

  it('saveLetterMethod Test', async () => {
    expect(await service.saveLetter('hello')).toEqual({
      letter_id: 2,
      content: 'hello',
    });

    expect(await service.saveLetter('hello')).toEqual({
      letter_id: 3,
      content: 'hello',
    });
  });

  it('LetterState 저장 및 편지 삭제', async () => {
    const result = await service.deleteLetterState(1);
    expect(result.affected).toBe(1);
  });

  it('deleteLetterState Test: 해당 id가 존재하지 않을 때', async () => {
    const result = await service.deleteLetterState(9999);
    expect(result.affected).toBe(0);
  });

  describe('getLetter Test', () => {
    it('getLetter 등록된 편지 찾기', async () => {
      const result = await service.getLetter(1);
      expect(result.letter_id).toBe(letter.letter_id);
      expect(result.content).toBe(letter.content);
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

  describe('saveLetterInfo', () => {
    it('letterInfo 정상적인 결과 값 확인', async () => {
      const result = await service.saveLetterInfo(user_1.id, letter);
      expect(result.user_id).toBe(user_1.id);
      expect(result.letter_id).toBe(letter.letter_id);
      expect(result.is_send).toBe(false);
    });
  });

  describe('getOlderUnsentLetter', () => {
    it('가장 오래된 편지를 꺼내오나 확인', async () => {
      const letterInfo_1 = await service.saveLetterInfo(user_1.id, letter);
      await service.saveLetterInfo(user_1.id, letter_2);
      const result = await service.getOlderUnsentLetter();

      expect(result.letter_id).toEqual(letterInfo_1.letter_id);
      expect(result.is_send).toEqual(letterInfo_1.is_send);
      expect(result.user_id).toEqual(letterInfo_1.user_id);
    });
  });

  describe('letterUpdateIsSendIntoTrue', () => {
    it('존재하는 id 업데이트', async () => {
      await service.saveLetterInfo(user_1.id, letter);
      const result = await service.letterUpdateIsSendIntoTrue(letter.letter_id);

      expect(result.affected).toBe(1);
    });

    it('존재하지 않는 id 업데이트', async () => {
      const result = await service.letterUpdateIsSendIntoTrue(letter.letter_id);

      expect(result.affected).toBe(0);
    });
  });
});
