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
} from './letter-dummyData';
import { ReceiveLetterDTO } from '../../../../../shared/dtos/letter.dto';

describe('LetterGateway', () => {
  let app: INestApplication;
  let gateway: LetterGateway;
  let clientSocket: Socket;
  let otherSocket: Socket;
  let letterStateRepository: Repository<LetterState>;
  let userStateRepository: Repository<UserState>;
  let letterRepository: Repository<Letter>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [LetterState, UserState, Letter],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([LetterState, UserState, Letter]),
      ],
      providers: [LetterGateway, LetterLogicService, LetterDbService],
    }).compile();

    app = moduleFixture.createNestApplication();
    gateway = moduleFixture.get<LetterGateway>(LetterGateway);

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
    clientSocket = io('http://localhost:3000');
    await new Promise<void>((res) => {
      clientSocket.on('connect', () => {
        res();
      });
    });

    otherSocket = io('http://localhost:3000');
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
      const otherSocket_2 = io('http://localhost:3000');
      await new Promise<void>((res) => {
        otherSocket_2.on('connect', () => {
          otherSocket_2.on(LETTER_MSG.INIT_MSG_RECEVIED, () => {
            res();
          });
          otherSocket_2.emit(LETTER_MSG.INIT_MSG, 'test');
        });
      });

      await new Promise<void>((res) => {
        otherSocket.on(LETTER_MSG.INIT_MSG_RECEVIED, () => {
          res();
        });
        otherSocket.emit(LETTER_MSG.INIT_MSG, 'test');
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

      gateway.sendMessageToClient('test', {
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

        otherSocket.on(LETTER_MSG.INIT_MSG_RECEVIED, () => {
          gateway.readySendMassageToClient(letterState);
        });
        otherSocket.emit(LETTER_MSG.INIT_MSG, user_2.id);
      });
    });

    describe('saveTimeoutId Method Test', () => {
      let setTimeoutId: NodeJS.Timeout;

      it('setTimeoutId 저장', () => {
        setTimeoutId = setTimeout(() => {}, 50000);

        gateway.saveTimeoutId('test', setTimeoutId);
        expect(gateway.userSetTimeoutKeyMap.get('test')).toBe(setTimeoutId);
      });
    });
  });

  describe('Subscribe Integration Test', () => {
    describe('Subscribe initial_data Test', () => {
      it('해당 유저가 편지가 존재하지 않을 때', (done) => {
        const id = 'testUser';

        clientSocket.on(LETTER_MSG.INIT_MSG_RECEVIED, (data) => {
          expect(data).toBe('success');
          expect(gateway.idKeyMap.has(id)).toBe(true);
          done();
        });

        clientSocket.emit(LETTER_MSG.INIT_MSG, id);
      });

      it('해당 유저가 편지가 존재할 때', (done) => {
        const id = '2';

        clientSocket.on(LETTER_MSG.SEND_MSG, (message: ReceiveLetterDTO) => {
          expect(message.content).toBe('Test');
          expect(message.id).toBe('1');
          done();
        });

        clientSocket.emit(LETTER_MSG.INIT_MSG, id);
      });
    });

    describe('Subscribe espresso Test', () => {
      it('유저가 편지 보낸 후 다른 유저가 편지 받을 때', (done) => {
        const id = '1';
        const id_2 = '3';

        clientSocket.on(LETTER_MSG.INIT_MSG_RECEVIED, () => {
          clientSocket.emit(LETTER_MSG.RECEIVE_MSG, { content: 'test' });
        });

        otherSocket.on(LETTER_MSG.INIT_MSG_RECEVIED, () => {
          clientSocket.emit(LETTER_MSG.INIT_MSG, id);
        });

        clientSocket.on(
          LETTER_MSG.RECEIVE_MSG_RECEVIED,
          (data: LetterState) => {
            expect(data.letter_id).toBe(2);
            expect(data.receiver_id).toBe('3');
            expect(data.sender_id).toBe('1');
          },
        );

        otherSocket.on(LETTER_MSG.SEND_MSG, (data: ReceiveLetterDTO) => {
          expect(data.id).toBe('1');
          expect(data.content).toBe('test');
          done();
        });

        otherSocket.emit(LETTER_MSG.INIT_MSG, id_2);
      });
    });
  });
});
