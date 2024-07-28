import ILetterReqDTO from './ILetterReqDTO';

export default interface ILetterResDTO
  extends Omit<ILetterReqDTO, 'sendTime' | 'senderIp'> {}
