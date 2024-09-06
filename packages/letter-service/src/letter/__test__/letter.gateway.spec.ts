import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import io, { Socket } from 'socket.io-client';
import { LETTER_MSG, LetterGateway } from '../letter.gateway';
import { LetterLogicService } from '../letter_logic.service';
import { LetterDbService } from '../letter_db.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { LetterState } from '../../../../../shared/entities/letter_state.entity';
import { UserState } from '../../../../../shared/entities/user_state.entity';
import { Letter } from '../../../../../shared/entities/letter.entity';
import { Repository } from 'typeorm';
import {
  letter,
  letterState,
  user_1,
  user_2,
  user_3,
  user_4,
  userToken_1,
  userToken_2,
  userToken_3,
} from './letter-dummyData';
import { ReceiveLetterDTO } from '../../../../../shared/dtos/letter.dto';
import { JwtService } from '@nestjs/jwt';
import { LetterInfo } from '../../../../../shared/entities/letter_info.entity';
import { LetterSave } from '@shared/entities/letter_save.entitiy';

describe('LetterGateway', () => {
  let app: INestApplication;
  let gateway: LetterGateway;
  let clientSocket: Socket;
  let otherSocket: Socket;
  let letterStateRepository: Repository<LetterState>;
  let userStateRepository: Repository<UserState>;
  let letterRepository: Repository<Letter>;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
      providers: [
        LetterGateway,
        LetterLogicService,
        LetterDbService,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    gateway = moduleFixture.get<LetterGateway>(LetterGateway);

    jwtService = moduleFixture.get<JwtService>(JwtService);

    letterStateRepository = moduleFixture.get<Repository<LetterState>>(
      getRepositoryToken(LetterState),
    );
    userStateRepository = moduleFixture.get<Repository<UserState>>(
      getRepositoryToken(UserState),
    );
    letterRepository = moduleFixture.get<Repository<Letter>>(
      getRepositoryToken(Letter),
    );

    await userStateRepository.save(user_1);
    await userStateRepository.save(user_2);
    await userStateRepository.save(user_3);
    await userStateRepository.save(user_4);
    await letterRepository.save(letter);
    await letterStateRepository.save(letterState);

    await app.init();
    await app.listen(3000);
  });

  beforeEach(async () => {
    (jwtService.verifyAsync as jest.Mock).mockResolvedValue(userToken_1);
    clientSocket = io('http://localhost:3000', {
      auth: {
        token: 'your-test-token',
      },
    });
    await new Promise<void>((res) => {
      clientSocket.on('connect', () => {
        res();
      });
    });

    (jwtService.verifyAsync as jest.Mock).mockResolvedValue(userToken_2);
    otherSocket = io('http://localhost:3000', {
      auth: {
        token: 'your-test-token',
      },
    });
    await new Promise<void>((res) => {
      otherSocket.on('connect', () => {
        res();
      });
    });
  });

  afterEach(async () => {
    clientSocket.disconnect();
    clientSocket.close();
    otherSocket.disconnect();
    otherSocket.close();
  });

  afterAll(async () => {
    await letterRepository.clear();
    await userStateRepository.clear();
    await letterRepository.clear();
    await app.close();
    jest.useRealTimers();
  });

  describe('Method Test', () => {
    //* 같은 유저 아이디로 접속한 모든 클라이언트에게 메세지를 가는지
    it('sendMessageToClient Method Test', async () => {
      (jwtService.verifyAsync as jest.Mock).mockResolvedValue(userToken_2);
      const otherSocket_2 = io('http://localhost:3000', {
        auth: {
          token: 'your-test-token', // 모킹된 토큰을 설정
        },
      });

      //* 접속완료 테스트
      await new Promise<void>((res) => {
        otherSocket_2.on('connect', () => {
          otherSocket_2.on(LETTER_MSG.INIT_MSG_RECEVIED, () => {
            res();
          });
          otherSocket_2.emit(LETTER_MSG.INIT_MSG);
        });
      });

      // //* 접속완료 테스트
      await new Promise<void>((res) => {
        otherSocket.on(LETTER_MSG.INIT_MSG_RECEVIED, () => {
          res();
        });
        otherSocket.emit(LETTER_MSG.INIT_MSG);
      });

      const promise_1 = new Promise<void>((res) => {
        otherSocket.on(LETTER_MSG.SEND_MSG, (data: ReceiveLetterDTO) => {
          expect(data.id).toBe('sender');
          expect(data.content).toBe('TEST');
          res();
        });
      });

      const promise_2 = new Promise<void>((res) => {
        otherSocket_2.on(LETTER_MSG.SEND_MSG, (data: ReceiveLetterDTO) => {
          expect(data.id).toBe('sender');
          expect(data.content).toBe('TEST');
          res();
        });
      });

      gateway.sendMessageToClient('user2', {
        id: 'sender',
        content: 'TEST',
      });
      await Promise.all([promise_1, promise_2]);
      otherSocket_2.disconnect();
      otherSocket_2.close();
    });

    it('readySendMassageToClient Method Test', async () => {
      await new Promise<void>((res) => {
        otherSocket.on(LETTER_MSG.SEND_MSG, () => {
          res();
        });

        //* 접속이롼료되면 readySenndMessageToClient를 통해 이 클라이언트에게 메시지를 보낸다
        otherSocket.on(LETTER_MSG.INIT_MSG_RECEVIED, () => {
          gateway.readySendMassageToClient(letterState);
        });
        otherSocket.emit(LETTER_MSG.INIT_MSG);
      });
    });

    describe('saveTimeoutId Method Test', () => {
      let setTimeoutId: NodeJS.Timeout;

      it('setTimeoutId 저장', () => {
        setTimeoutId = setTimeout(() => {}, 50000);

        gateway.saveTimeoutId('test', setTimeoutId);
        expect(gateway.userSetTimeoutKeyMap.get('test')).toBe(setTimeoutId);
        clearTimeout(setTimeoutId);
      });
    });
  });

  describe('Subscribe Integration Test', () => {
    describe('Subscribe initial_data Test', () => {
      it('해당 유저가 편지가 존재하지 않을 때', (done) => {
        clientSocket.on(LETTER_MSG.INIT_MSG_RECEVIED, (data) => {
          expect(data).toBe('success');
          expect(gateway.idKeyMap.has(userToken_1.username)).toBe(true);
          done();
        });

        clientSocket.emit(LETTER_MSG.INIT_MSG);
      });

      it('해당 유저가 편지가 존재할 때', (done) => {
        otherSocket.on(LETTER_MSG.SEND_MSG, (message: ReceiveLetterDTO) => {
          expect(message.content).toBe('Test');
          expect(message.id).toBe('1');
          done();
        });

        otherSocket.emit(LETTER_MSG.INIT_MSG);
      });
    });

    describe('Subscribe espresso Test', () => {
      it('유저가 편지 보낸 후 다른 유저가 편지 받을 때', (done) => {
        (jwtService.verifyAsync as jest.Mock).mockResolvedValue(userToken_3);
        const otherSocket_2 = io('http://localhost:3000', {
          auth: {
            token: 'your-test-token', // 모킹된 토큰을 설정
          },
        });

        clientSocket.on(LETTER_MSG.INIT_MSG_RECEVIED, () => {
          clientSocket.emit(LETTER_MSG.RECEIVE_MSG, { content: 'test' });
        });

        otherSocket_2.on(LETTER_MSG.INIT_MSG_RECEVIED, () => {
          clientSocket.emit(LETTER_MSG.INIT_MSG);
        });

        clientSocket.on(
          LETTER_MSG.RECEIVE_MSG_RECEVIED,
          (data: LetterState) => {
            expect(data.letter_id).toBe(2);
            expect(data.receiver_id).toBe(userToken_3.username);
            expect(data.sender_id).toBe(userToken_1.username);
          },
        );

        otherSocket_2.on(LETTER_MSG.SEND_MSG, (data: ReceiveLetterDTO) => {
          expect(data.id).toBe(userToken_1.username);
          expect(data.content).toBe('test');
          otherSocket_2.close();
          done();
        });

        otherSocket_2.on('connect', () => {
          otherSocket_2.emit(LETTER_MSG.INIT_MSG);
        });
      });
    });
  });
});
