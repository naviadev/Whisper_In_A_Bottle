import { Tid, TTime, TMessage } from "../types/types";

interface ILetterReqDTO {
  senderId: Tid;
  sendTime: TTime;
  message: TMessage;
}
export default ILetterReqDTO;
