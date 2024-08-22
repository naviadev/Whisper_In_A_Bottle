import { IsString } from "class-validator";


export interface PlayerDTO {
  id: string;
  password: string;
}

export class PlayerDTO implements PlayerDTO {
  @IsString()
  id: string

  @IsString()
  password: string;
}