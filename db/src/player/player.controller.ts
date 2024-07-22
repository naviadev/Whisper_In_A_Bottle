import { Body, Controller, Post } from '@nestjs/common';
import { PlayerService } from './player.service';
import User from '@shared/DTO/user';
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  //* 회원가입은 Post를 통해, DTO를 넘겨받는다
  @Post()
  async CreatePlayer(@Body() user: User) {
    const result = this.playerService.CreatePlayer(user);
    return result;
  }
}
