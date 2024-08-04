import { TPlayerID, TTime, TMessage } from "../types/types";

export default interface ILetterReqDTO {
  senderId: TPlayerID;
  sendTime: TTime;
  message: TMessage;
}
