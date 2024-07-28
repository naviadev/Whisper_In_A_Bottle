import { TPlayerID, TTime, TMessage, TIp } from 'ts/types/types';

export default interface ILetterReqDTO {
  senderId: TPlayerID;
  sendTime: TTime;
  message: TMessage;
  senderIp: TIp;
}
