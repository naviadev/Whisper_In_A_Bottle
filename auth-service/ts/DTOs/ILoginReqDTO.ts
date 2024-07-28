import { TPlayerID, TPassword } from 'ts/types/types';

export default interface ILoginReqDTO {
  playerId: TPlayerID;
  password: TPassword;
}
