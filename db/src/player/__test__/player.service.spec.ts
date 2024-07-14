import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from '../player.service';
import { Player } from '../player.entity';
import { Player as PlayerDTO } from '@shared/DTO/player';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerRepository } from '../player.repository';

describe('PlayerService', () => {
  let service: PlayerService;
  let playerRepoMock: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        PlayerRepository,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    playerRepoMock = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Player', () => {
    const playerDTO: PlayerDTO = {
      id: 'Hwang',
      password: '2222',
      receiveTime: 333,
      sendTime: 333,
      isAssign: true,
      stash: [],
    };

    const player = { id: 'Hwang', password: '1111', sendTime: 333 } as Player;

    //* 이미플레이어가 존재할 때,
    it('Aleady Exist Player', async () => {
      jest.spyOn(playerRepoMock, 'save').mockResolvedValue(player);
      jest.spyOn(playerRepoMock, 'findOne').mockResolvedValue(player);

      expect(await service.CreateAccountPlayer(playerDTO)).toBeFalsy();
    });

    //* 플레이어 회원가입
    it('CreateAccount', async () => {
      jest.spyOn(playerRepoMock, 'save').mockResolvedValue(player);
      jest.spyOn(playerRepoMock, 'findOne').mockResolvedValue(null);

      expect(await service.CreateAccountPlayer(playerDTO)).toBe(true);
    });
  });
});
