import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { ServerOptions } from 'socket.io';

export class CustomIoAdapter extends IoAdapter {
  constructor(app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const optionsWithCors: ServerOptions = {
      ...options,
      cors: {
        origin: 'http://localhost:3000', // 클라이언트 주소
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      },
    };
    return super.createIOServer(port, optionsWithCors);
  }
}
