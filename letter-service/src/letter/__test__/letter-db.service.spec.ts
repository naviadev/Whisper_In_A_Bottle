import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { LetterState } from '../entities/letter-state.entity';
import { UserState } from '../entities/user-state.entity';
import { Letter } from '../entities/letter.entity';
import { LetterDbService } from '../letter-db.service';
import { Repository } from 'typeorm';

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
  });

  afterAll(async () => {
    await letterStateRepository.clear();
    await userStateRepository.clear();
    await letterRepository.clear();
  });

  it('편지 안받는 사용자 찾기', async () => {
    const user_1 = new UserState();
    user_1.userId = '1';
    user_1.receiveTime = 100;
    user_1.lastLoginIp = '192.0.0.1';
    user_1.lastLoginTime = 2000;

    const user_2 = new UserState();
    user_2.userId = '2';
    user_2.receiveTime = 200;
    user_2.lastLoginIp = '192.0.0.2';
    user_2.lastLoginTime = 3000;

    const user_3 = new UserState();
    user_3.userId = '3';
    user_3.receiveTime = 1000;
    user_3.lastLoginIp = '192.0.0.3';
    user_3.lastLoginTime = 400;

    const user_4 = new UserState();
    user_4.userId = '4';
    user_4.receiveTime = 500;
    user_4.lastLoginIp = '192.0.0.4';
    user_4.lastLoginTime = 500;

    await userStateRepository.save(user_1);
    await userStateRepository.save(user_2);
    await userStateRepository.save(user_3);
    await userStateRepository.save(user_4);

    const letterState = new LetterState();
    letterState.letterId = 1;
    letterState.receiverId = '2';
    letterState.sendTime = 5000;
    letterState.senderId = '1';

    await letterStateRepository.save(letterState);

    expect(await service.getUserWithLongestReceiveTime('1')).toEqual(user_3);
  });

  it('saveLetterMethod Test', async () => {
    expect(await service.saveLetter('hello')).toEqual({
      letterId: 1,
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
});
