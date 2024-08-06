import { Tid, TTime, TMessage, TIp } from 'ts/types/types';

export default interface ILetterReqDTO {
  senderId: Tid;
  sendTime: TTime;
  message: TMessage;
  senderIp: TIp;
}
