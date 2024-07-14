import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  //* 플레이어 저장
  async CreateAccount(player: Player): Promise<Player> {
    return this.playerRepository.save(player);
  }

  //* 모든 플레이어를 가지고 온다.
  async FindAllPlayers(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  //* 특정 유저를 조회
  async FindPlayerById(id: string): Promise<Player | null> {
    return this.playerRepository.findOne({ where: { id } });
  }
}
