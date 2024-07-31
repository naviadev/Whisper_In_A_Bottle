import { Injectable } from '@nestjs/common';
import { LetterGateway } from './letter.gateway';
import { LetterDto } from './dto/letter.dto';

@Injectable()
export class LetterService {
  constructor(private readonly letterGateWay: LetterGateway) {}

  //* 유저가 접속해 있는지 확인
  ckectUserConnected(userId: string) {
    return this.letterGateWay.userIdKeyMap.has(userId);
  }

  //* 편지 보내기
  sendLetter(userId: string, letter: LetterDto) {
    return this.letterGateWay.sendMessageToClient(userId, letter);
  }

  //* 편지 보내는 setimeOutId 저장하기
  saveNodeJsTimeoutId(userId: string, timeoutId: NodeJS.Timeout) {
    this.letterGateWay.userSetTimeoutKeyMap.set(userId, timeoutId);
  }
}
