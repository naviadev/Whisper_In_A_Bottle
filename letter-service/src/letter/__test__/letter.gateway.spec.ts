import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import io, { Socket } from 'socket.io-client';
import { LetterGateway } from '../letter.gateway';
import { LetterDto } from '../dto/letter.dto';

describe('LetterGateway', () => {
  let app: INestApplication;
  let gateway: LetterGateway;
  let clientSocket: Socket;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [LetterGateway],
    }).compile();

    app = moduleFixture.createNestApplication();
    gateway = moduleFixture.get<LetterGateway>(LetterGateway);
    await app.init();
    await app.listen(3000);

    clientSocket = io('http://localhost:3000');
    await new Promise<void>((resolve) => {
      clientSocket.on('connect', () => {
        resolve();
      });
    });
  });

  afterAll(async () => {
    await app.close();
    clientSocket.close();
  });

  it('should handle initial data', (done) => {
    const userId = 'testUser';
    clientSocket.emit('initial_data', userId);

    //* 데이터를 받을 시, 각 서버의 상태를 확인한다.
    clientSocket.on('data_received', (data) => {
      expect(data).toEqual({ status: 'success' });
      expect(
        gateway.userIdKeyMap.get(userId)!.has(clientSocket.id),
      ).toBeTruthy();
      expect(gateway.clientIdKeyMap.get(clientSocket.id)).toBe(userId);
      done();
    });
  });

  //* 특정 아이디로 메세지 보내서, 편지 왔는지 확인하기.
  it('should send message to client', (done) => {
    const userId = 'testUser';
    const letter: LetterDto = { id: '1', ip: '2222', body: '333', time: 3333 };
    clientSocket.emit('initial_data', userId);

    clientSocket.on('new_message', (receivedLetter) => {
      expect(receivedLetter).toEqual(letter);
      done();
    });

    gateway.sendMessageToClient(userId, letter);
  });
});
