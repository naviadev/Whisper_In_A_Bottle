import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LetterDto } from './dto/letter.dto';

@WebSocketGateway()
export class LetterGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  //! clientid는 고유한 값을 생성하기 때문에, 중복되는 일이 없다.
  //* 여러 브라우저에서 동시에 킬 수도 있기 때문에 Set으로 하였음.
  userIdKeyMap: Map<string, Set<string>> = new Map();
  clientIdKeyMap: Map<string, string> = new Map();

  //* userId, setTimeout에 키 저장
  userSetTimeoutKeyMap: Map<string, NodeJS.Timeout> = new Map();

  afterInit() {
    console.log('Init');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  //* disconnect 했을 때. Map에서 정보를 지운다.
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    const userId = this.clientIdKeyMap.get(client.id);
    if (userId) {
      const clientIds = this.userIdKeyMap.get(userId);
      if (clientIds) {
        clientIds.delete(client.id);
        if (clientIds.size === 0) {
          this.userIdKeyMap.delete(userId);
          if (this.userSetTimeoutKeyMap.has(userId)) {
            const timeoutId = this.userSetTimeoutKeyMap.get(userId);
            clearTimeout(timeoutId);
            this.userSetTimeoutKeyMap.delete(userId);
          }
        }
      }
    }

    this.clientIdKeyMap.delete(client.id);
  }

  //* 처음에 접속했을 떄, 사용자 정보 저장
  @SubscribeMessage('initial_data')
  handleInitialData(client: Socket, userId: string): void {
    if (!this.userIdKeyMap.has(userId)) {
      this.userIdKeyMap.set(userId, new Set());
    }

    const clientIds = this.userIdKeyMap.get(userId);
    clientIds.add(client.id);
    this.clientIdKeyMap.set(client.id, userId);

    client.emit('data_received', { status: 'success' });
  }

  //* 메세지 보내는 Method
  sendMessageToClient(userId: string, letter: LetterDto) {
    const clientIds = this.userIdKeyMap.get(userId);

    if (!clientIds) {
      // TODO: 보낼 때, 연결이 끊어진 것임으로 데이터베이스에 편지를 임시 저장하는 로직 추가
      return false;
    }

    let isSuccess = false;
    //* 모든 접속한 페이지에 편지 보내기
    clientIds.forEach((clientId) => {
      const client = this.server.sockets.sockets.get(clientId);
      if (client) {
        client.emit('new_message', letter);
        isSuccess = true;
      }
    });

    return isSuccess;
  }
}
