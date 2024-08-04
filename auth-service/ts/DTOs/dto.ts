// dto.ts
export interface PlayerDTO {
  id: string;
  password: string;
}

export interface PlayerStateDTO {
  playerId: string;
  letterId: string | null;
  timeStamp: number;
  sendTime: number;
  scheduledTime: number;
}

export interface ILetterReqDTO {
  senderId: string;
  sendTime: number;
  message: string;
  senderIp: string;
}

export interface ILetterResDTO
  extends Omit<ILetterReqDTO, 'sendTime' | 'senderIp'> {}

export interface IpDTO {
  playerId: string;
  ip: string;
}

export interface LoginRequestDTO {
  id: string;
  pw: string;
}

export interface LoginResponseDTO {
  success: boolean;
  playerId?: string;
  message?: string;
}

export interface LetterRequestDTO {
  playerId: string;
}

export interface LetterResponseDTO {
  letter: LetterRequestDTO | null;
  message?: string;
}

export interface SendLetterRequestDTO {
  senderId: string;
  message: string;
}

export interface SendLetterResponseDTO {
  success: boolean;
  message?: string;
}
