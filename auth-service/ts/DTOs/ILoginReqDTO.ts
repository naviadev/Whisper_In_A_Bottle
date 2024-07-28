import { TPlayerID, TPassword } from 'ts/types/types';

export interface ILoginReqDTO {
  playerId: TPlayerID;
  password: TPassword;
}
