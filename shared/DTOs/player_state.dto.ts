export default interface PlayerStateDTO {
  id: string;
  pendingLetterId: string | null;
  timeStamp: number;
  sendTime: number;
  scheduledTime: number;
}
