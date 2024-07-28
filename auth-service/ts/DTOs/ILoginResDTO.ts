import { TPlayerID, TMessage } from 'ts/types/types';

export default interface ILoginResDTO {
  success: boolean;
  playerId?: TPlayerID;
  message?: TMessage;
}
