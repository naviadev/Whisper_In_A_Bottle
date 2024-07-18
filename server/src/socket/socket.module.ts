import { Module } from '@nestjs/common';
import { ChatGateway } from './socket.gateway';

@Module({
  providers: [ChatGateway],
})
export class SocketModule {}
