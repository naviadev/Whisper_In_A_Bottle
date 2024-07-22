import { Test, TestingModule } from '@nestjs/testing';
import { letterGateway } from '../letter/letter.gateway'; // 경로를 실제 경로로 수정하세요
import { Server } from 'socket.io';

describe('letterGateway', () => {
  let gateway: letterGateway;
  let server: Server;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [letterGateway],
    }).compile();

    gateway = module.get<letterGateway>(letterGateway);

    server = {
      emit: jest.fn(),
    } as unknown as Server;

    gateway.server = server;
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('handleMessage', () => {
    it('should log and emit the letter', () => {
      const letter = 'Hello World';
      jest.spyOn(console, 'log').mockImplementation(() => {});
      const emitSpy = jest.spyOn(server, 'emit');

      gateway.handleMessage(letter);

      expect(console.log).toHaveBeenCalledWith('Received message:', letter);
      expect(emitSpy).toHaveBeenCalledWith('send-letter', letter);
    });
  });
});
