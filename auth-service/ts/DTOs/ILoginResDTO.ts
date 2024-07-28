import { TPlayerID, TMessage } from 'ts/types/types';

export interface ILoginResDTO {
  success: boolean;
  playerId?: TPlayerID;
  message?: TMessage;
}
