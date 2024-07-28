import { TPlayerID, TLetterId, TTime } from 'ts/types/types';

export default interface IPlayerStateDTO {
  playerId: TPlayerID;
  pendingLetterId: TLetterId | null;
  timeStamp: TTime;
  sendTime: TTime;
  scheduledTime: TTime;
}
