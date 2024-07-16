import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from '../player.controller';
import { Repository } from 'typeorm';
import { PlayerRepository } from '../player.repository';
import { User } from '@shared/DTO/userInterface';
import { Player } from '../player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerService } from '../player.service';

describe('PlayerController', () => {
  let controller: PlayerController;
  let playerRepoMock: Repository<Player>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        PlayerRepository,
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
      ],
    }).compile();

    playerRepoMock = module.get<Repository<Player>>(getRepositoryToken(Player));
    controller = module.get<PlayerController>(PlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('회원가입 테스트', () => {
    it('이미 존재하는 Id가 있을 때', async () => {
      const user: User = {
        id: 'test',
        password: 'test',
      };

      jest.spyOn(playerRepoMock, 'findOne').mockResolvedValue(user as Player);
      jest.spyOn(playerRepoMock, 'save').mockResolvedValue(user as Player);

      expect(await controller.CreatePlayer(user)).toBeFalsy();
    });

    it('옳바른 아이디 생성 완료', async () => {
      const user: User = {
        id: 'test',
        password: 'test',
      };

      jest.spyOn(playerRepoMock, 'findOne').mockResolvedValue(null);
      jest.spyOn(playerRepoMock, 'save').mockResolvedValue(user as Player);

      expect(await controller.CreatePlayer(user)).toBeTruthy();
    });
  });
});
