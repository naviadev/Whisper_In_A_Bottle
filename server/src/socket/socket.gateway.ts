/**
 * TODO 웹 소켓 구현하기
 * [ ] cors해겷하기 
 * [ ] 연결 확인하기 
 * [ ] 비동기 코딩하기 
 */
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  // 클라이언트가 연결될 때 호출됩니다.
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('connected', { message: 'You are connected!' });
  }

  // 클라이언트가 연결을 끊을 때 호출됩니다.
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
}
