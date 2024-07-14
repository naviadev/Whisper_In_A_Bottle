import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerRepository } from '../player.repository';
import { Player } from '../player.entity';
import { Repository } from 'typeorm';

describe('PlayerRepository Test', () => {
  let playerRepository: PlayerRepository;
  let playerRepoMock: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerRepository,
        {
          //* 리포지토리 토큰 생성
          //* getRepositoryToken 함수는 특정 엔티티 클래스에 대한 리포지토리 토큰을 생성합니다.
          //* 이 토큰은 DI 컨테이너에서 해당 리포지토리를 식별하고 주입하는 데 사용됩니다.
          provide: getRepositoryToken(Player),
          //* 원래 환경에서는 TypeORM이 제공하는 레포지토리를 제공받지만,
          //* 테스트를 위해서, 가짜 레포지토리를 받는다.
          //! 실제 데이터베이스와 상호작용 할 수 없기 떄문에 useClass를 이용하여 가짜를 생성
          useClass: Repository,
        },
      ],
    }).compile();

    playerRepository = module.get<PlayerRepository>(PlayerRepository);
    playerRepoMock = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  describe('CreatePlayer', () => {
    it('Create Player', async () => {
      const mockPlayer = { id: 'hwang', password: 'eee', sendTime: 1111 };

      jest
        .spyOn(playerRepoMock, 'save')
        .mockResolvedValue(mockPlayer as Player);

      const result = await playerRepository.CreateAccount(mockPlayer as Player);
      expect(result).toEqual(mockPlayer);
      expect(playerRepoMock.save).toHaveBeenCalled();
    });
  });

  describe('FindAllPlayers', () => {
    it('Return All Player', async () => {
      const mockPlayers = [
        { id: 'moon', password: 'moon123', sendTime: 11111 },
        { id: 'bae', password: 'bae123', sendTime: 22222 },
      ];

      jest
        .spyOn(playerRepoMock, 'find')
        .mockResolvedValue(mockPlayers as Player[]);

      const result = await playerRepository.FindAllPlayers();
      expect(result).toEqual(mockPlayers);
      expect(playerRepoMock.find).toHaveBeenCalled();
    });
  });

  describe('FindPlayerById', () => {
    it('Retrun Exist Id', async () => {
      jest.spyOn(playerRepoMock, 'findOne').mockResolvedValue(null);

      const result = await playerRepository.FindPlayerById('Lee');

      expect(result).toBeNull();
      expect(playerRepoMock.findOne).toHaveBeenCalledWith({
        where: { id: 'Lee' },
      });
    });

    it('Return not found', async () => {
      jest.spyOn(playerRepoMock, 'findOne').mockResolvedValue(null);

      const result = await playerRepository.FindPlayerById('999');

      expect(result).toBeNull();
      expect(playerRepoMock.findOne).toHaveBeenCalledWith({
        where: { id: '999' },
      });
    });
  });
});
