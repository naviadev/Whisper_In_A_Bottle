import { Test, TestingModule } from '@nestjs/testing';
import { LetterController } from '../letter.controller';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import request from 'supertest';
import { LetterDbService } from '../letter-db.service';
import { LetterService } from '../letter.service';
import { LetterGateway } from '../letter.gateway';
import { UserState } from '../entities/user-state.entity';
import { LetterState } from '../entities/letter-state.entity';
import { Letter } from '../entities/letter.entity';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import io, { Socket } from 'socket.io-client';

describe('LetterController', () => {
  let controller: LetterController;
  let app: INestApplication;
  let letterStateRepository: Repository<LetterState>;
  let userStateRepository: Repository<UserState>;
  let clientSocket: Socket;

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
      controllers: [LetterController],
      providers: [LetterDbService, LetterService, LetterGateway],
    }).compile();

    controller = module.get<LetterController>(LetterController);
    letterStateRepository = module.get<Repository<LetterState>>(
      getRepositoryToken(LetterState),
    );
    userStateRepository = module.get<Repository<UserState>>(
      getRepositoryToken(UserState),
    );

    //* 더미 유저 넣기
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

    const user_5 = new UserState();
    user_5.userId = '5';
    user_5.receiveTime = 200;
    user_5.lastLoginIp = '192.0.0.5';
    user_5.lastLoginTime = 500;

    await userStateRepository.save(user_1);
    await userStateRepository.save(user_2);
    await userStateRepository.save(user_3);
    await userStateRepository.save(user_4);
    await userStateRepository.save(user_5);

    const letterState = new LetterState();
    letterState.letterId = 9999;
    letterState.senderId = user_1.userId;
    letterState.receiverId = user_2.userId;
    letterState.sendTime = 99999;

    await letterStateRepository.save(letterState);

    //* Server On
    app = module.createNestApplication();
    await app.init();
    await app.listen(3002);

    //* Socket IO 연결
    clientSocket = io('http://localhost:3002');

    //* 가장 receivedTime이 긴 유저를 연결한다.
    await new Promise<void>((resolve) => {
      clientSocket.on('connect', () => {
        clientSocket.emit('initial_data', user_3.userId);
      });

      clientSocket.on('data_received', () => {
        resolve();
      });
    });

    jest.useFakeTimers();
  });

  afterAll(async () => {
    jest.useRealTimers();
    await app.close();
    await clientSocket.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('sendLetterToUser Method Test', (done) => {
    const letter = {
      id: '1',
      body: 'hello',
      ip: '192.0.0.1',
      time: '3333',
    };

    //* 해당 소켓이 편지를 받아야한다
    //* receivedTime이 가장 길기 때문
    clientSocket.on('new_message', (data) => {
      try {
        expect(data).toEqual(letter);
        done();
      } catch (error) {
        done(error);
      }
    });

    //* 편지 보내기.
    request(app.getHttpServer())
      .post('/letter')
      .send(letter)
      .set('Content-Type', 'application/json')
      .then((res) => {
        //* setTimeout 시간을 흐르게 한다.
        jest.advanceTimersByTime(1000);
        expect(res.statusCode).toBe(201);
      });
  }, 10000);
});
