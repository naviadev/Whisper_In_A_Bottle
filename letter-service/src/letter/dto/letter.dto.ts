export interface SenderLetterDto {
  content: string;
}

export interface ReceiveLetterDto extends SenderLetterDto {
  id: string;
}
