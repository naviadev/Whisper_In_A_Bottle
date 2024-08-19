// dto.ts
export interface PlayerDTO {
  id: string;
  password: string;
}

export interface PlayerStateDTO {
  id: string;
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
  id: string;
  ip: string;
}

export interface LoginRequestDTO {
  id: string;
  pw: string;
}

export interface LoginResponseDTO {
  success: boolean;
  id?: string;
  message?: string;
}

export interface LetterRequestDTO {
  id: string;
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
