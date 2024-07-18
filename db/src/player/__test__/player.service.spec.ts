import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from '../player.service';
import { Player } from '../player.entity';
import { User } from '@shared/DTO/userInterface';
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
    const playerDTO: User = {
      id: 'Hwang',
      password: '2222',
    };

    const player = { userId: 'Hwang', password: '1111' } as Player;

    //* 이미플레이어가 존재할 때,
    it('Aleady Exist Player', async () => {
      jest.spyOn(playerRepoMock, 'save').mockResolvedValue(player);
      jest.spyOn(playerRepoMock, 'findOne').mockResolvedValue(player);

      expect(await service.CreatePlayer(playerDTO)).toBeFalsy();
    });

    //* 플레이어 회원가입
    it('CreateAccount', async () => {
      jest.spyOn(playerRepoMock, 'save').mockResolvedValue(player);
      jest.spyOn(playerRepoMock, 'findOne').mockResolvedValue(null);

      expect(await service.CreatePlayer(playerDTO)).toBe(true);
    });
  });
});
