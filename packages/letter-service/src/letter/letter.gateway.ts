import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  ReceiveLetterDTO,
  SenderLetterDTO,
} from '../../../../shared/dtos/letter.dto';
import { LetterLogicService } from './letter_logic.service';
import { LetterState } from '../../../../shared/entities/letter_state.entity';

export enum LETTER_MSG {
  INIT_MSG = 'initial_data',
  INIT_MSG_RECEVIED = 'initial_data.received',
  RECEIVE_MSG = 'espresso',
  RECEIVE_MSG_RECEVIED = 'espresspo_received',
  SEND_MSG = 'latte',
}

@WebSocketGateway()
export class LetterGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly letterLogicService: LetterLogicService) {}
  @WebSocketServer() server: Server;

  //! clientid는 고유한 값을 생성하기 때문에, 중복되는 일이 없다.
  //* 여러 브라우저에서 동시에 킬 수도 있기 때문에 Set으로 하였음.
  idKeyMap: Map<string, Set<string>> = new Map();
  clientIdKeyMap: Map<string, string> = new Map();

  //* id, setTimeout에 키 저장
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

    const id = this.clientIdKeyMap.get(client.id);
    if (id) {
      const clientIds = this.idKeyMap.get(id);
      if (clientIds) {
        clientIds.delete(client.id);
        if (clientIds.size === 0) {
          this.idKeyMap.delete(id);
          if (this.userSetTimeoutKeyMap.has(id)) {
            const timeoutId = this.userSetTimeoutKeyMap.get(id);
            clearTimeout(timeoutId);
            this.userSetTimeoutKeyMap.delete(id);
          }
        }
      }
    }

    this.clientIdKeyMap.delete(client.id);
  }

  //* 처음에 접속했을 떄, 사용자 정보 저장
  @SubscribeMessage(LETTER_MSG.INIT_MSG)
  async handleInitialData(client: Socket, id: string) {
    if (this.idKeyMap.has(id) === false) {
      this.idKeyMap.set(id, new Set());
    }

    const clientIds = this.idKeyMap.get(id);
    clientIds.add(client.id);
    this.clientIdKeyMap.set(client.id, id);

    client.emit('initial_data_received', 'success');

    //* 받아야하는 편지 찾는 과정
    this.letterLogicService.searchLetterState(id).then((res) => {
      if (res) this.readySendMassageToClient(res);
    });

    client.emit(LETTER_MSG.INIT_MSG_RECEVIED, 'success');
  }

  @SubscribeMessage(LETTER_MSG.RECEIVE_MSG)
  async receiveLetter(client: Socket, letter: SenderLetterDTO) {
    if (this.clientIdKeyMap.has(client.id) === false) {
      return;
    }

    const id = this.clientIdKeyMap.get(client.id);

    const letterState = await this.letterLogicService.saveAndAssignLetter(
      id,
      letter,
    );
    if (letterState) this.readySendMassageToClient(letterState);
    client.emit(LETTER_MSG.RECEIVE_MSG_RECEVIED, letterState);
  }

  async readySendMassageToClient(letterState: LetterState) {
    if (this.idKeyMap.has(letterState.receiver_id) === false) return;

    const letter = await this.letterLogicService.searchLetter(
      letterState.letter_id,
    );

    const receivedLetter: ReceiveLetterDTO = {
      id: letterState.sender_id,
      content: letter.content,
    };

    //* 시간 계산
    let calcTime = letterState.send_time - new Date().getTime();
    calcTime = calcTime > 0 ? calcTime : 0;

    const timeoutId = setTimeout(() => {
      this.sendMessageToClient(letterState.receiver_id, receivedLetter);
      this.userSetTimeoutKeyMap.delete(letterState.receiver_id);
    }, calcTime);

    this.saveTimeoutId(letterState.receiver_id, timeoutId);
  }

  //* 메세지 보내는 Method
  sendMessageToClient(id: string, letter: ReceiveLetterDTO) {
    const clientIds = this.idKeyMap.get(id);

    if (!clientIds) {
      // TODO: 보낼 때, 연결이 끊어진 것임으로 데이터베이스에 편지를 임시 저장하는 로직 추가
      return false;
    }

    let isSuccess = false;
    //* 모든 접속한 페이지에 편지 보내기
    clientIds.forEach((clientId) => {
      const client = this.server.sockets.sockets.get(clientId);
      if (client) {
        client.emit(LETTER_MSG.SEND_MSG, letter);
        isSuccess = true;
      }
    });

    return isSuccess;
  }

  saveTimeoutId(id: string, timeoutId: NodeJS.Timeout) {
    if (this.userSetTimeoutKeyMap.has(id)) {
      //TODO: 이미 편지가 있는데 왜??
    } else {
      this.userSetTimeoutKeyMap.set(id, timeoutId);
    }
  }
}
