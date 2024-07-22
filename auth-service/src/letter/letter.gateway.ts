import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class letterGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send-letter')
  handleMessage(@MessageBody() letter: string): void {
    console.log('Received message:', letter);
    this.server.emit('send-letter', letter);
  }
}
