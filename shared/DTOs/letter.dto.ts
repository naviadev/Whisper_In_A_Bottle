import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export interface SenderLetterDTO {
  content: string;
}

export interface ReceiveLetterDTO extends SenderLetterDTO {
  id: string;
}
export interface LetterInterface {
  body: string;
  time: number;
  id: string;
  ip: string;
}

export class LetterDTO {
  @ApiProperty({ description: "편지 본문" })
  @IsString()
  body: string;

  @ApiProperty({ description: "편지를 보낸 시간" })
  @IsNumber()
  time: number;

  @ApiProperty({ description: "송신자의 ID" })
  @IsString()
  id: string;

  @ApiProperty({ description: "송신자의 IP" })
  @IsString()
  ip: string;
}
