import { Test, TestingModule } from '@nestjs/testing';
import { LetterService } from '../letter.service';
import { LetterGateway } from '../letter.gateway';
import { INestApplication } from '@nestjs/common';
import io, { Socket } from 'socket.io-client';

describe('LetterService', () => {
  let service: LetterService;
  let app: INestApplication;
  let gateway: LetterGateway;
  let clientSocket: Socket;
  const userId = 'test';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LetterService, LetterGateway],
    }).compile();

    app = module.createNestApplication();
    app.init();
    app.listen(3001);

    clientSocket = io('http://localhost:3001');

    await new Promise<void>((resolve) => {
      clientSocket.on('connect', () => {
        clientSocket.emit('initial_data', userId);
      });

      clientSocket.on('data_received', () => {
        resolve();
      });
    });

    gateway = module.get<LetterGateway>(LetterGateway);
    service = module.get<LetterService>(LetterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
    await clientSocket.close();
  });

  it('ckectUserConnected Method Check', () => {
    expect(service.ckectUserConnected(userId)).toBeTruthy();
  });

  it('sendLetter Method Check', (done) => {
    const letter = {
      id: 'test2',
      body: 'hello',
      time: 2222,
      ip: '127.0.0.1',
    };

    clientSocket.on('new_message', (receivedData) => {
      expect(receivedData).toEqual(letter);
      done();
    });

    service.sendLetter(userId, letter);
  });

  it('saveNodeJsTimeoutId method check', async () => {
    const mockFunc = jest.fn();

    const setTimeoutId = setTimeout(() => {
      mockFunc();
    }, 3000);

    service.saveNodeJsTimeoutId(userId, setTimeoutId);
    expect(gateway.userSetTimeoutKeyMap.get(userId)).toBe(setTimeoutId);

    await clientSocket.close();

    await setTimeout(() => {
      expect(gateway.userSetTimeoutKeyMap.has(userId)).toBeFalsy();
      expect(mockFunc).not.toHaveBeenCalled();
    }, 3000);
  });
});
