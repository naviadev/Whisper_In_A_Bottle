import { Injectable } from '@nestjs/common';
import { Player } from './player.entity';
import { PlayerRepository } from './player.repository';
import User from '@shared/DTO/user';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async CreatePlayer(user: User): Promise<boolean> {
    //* 이미 존재하는 아이디
    if (await this.playerRepository.FindPlayerById(user.id)) {
      return false;
    }
    const player = new Player();
    player.id = user.id;
    player.password = user.password;

    await this.playerRepository.CreateAccount(player);
    return true;
  }
}
