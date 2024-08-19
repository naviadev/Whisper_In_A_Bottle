import { Tid, TLetterId, TTime } from 'ts/types/types';

export default interface IPlayerStateDTO {
  id: Tid;
  pendingLetterId: TLetterId | null;
  timeStamp: TTime;
  sendTime: TTime;
  scheduledTime: TTime;
}
