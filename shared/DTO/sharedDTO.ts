// dto.ts
export interface PlayerDTO {
  id: string;
  pw: string;
}

export interface PlayerStateDTO {
  playerId: string;
  letterId: string | null;
  timeStamp: number;
  sendTime: number;
  scheduledTime: number;
}

export interface LetterDTO {
  letterId: string;
  senderId: string;
  message: string;
  status: string;
}

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
  letter: LetterDTO | null;
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
