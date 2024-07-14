import { Injectable } from '@nestjs/common';
import { Player } from './player.entity';
import { PlayerRepository } from './player.repository';
import { Player as PlayerDTO } from '@shared/DTO/player';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async CreateAccountPlayer(playerDTO: PlayerDTO): Promise<boolean> {
    //* 이미 존재하는 아이디
    if (await this.playerRepository.FindPlayerById(playerDTO.id)) {
      return false;
    }
    const player = new Player();
    player.id = playerDTO.id;
    player.password = playerDTO.password;
    player.sendTime = playerDTO.sendTime;

    await this.playerRepository.CreateAccount(player);
    return true;
  }
}
