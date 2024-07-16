import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerController } from '../player.controller';
import { Player } from '../player.entity';
import { PlayerRepository } from '../player.repository';
import { PlayerService } from '../player.service';
import { INestApplication } from '@nestjs/common';
import { User } from '@shared/DTO/userInterface';
import { typeOrmConfig } from '../../config/typeorm.test.config';
import { DataSource, QueryRunner } from 'typeorm';

describe('PlayerController', () => {
  let controller: PlayerController;
  let app: INestApplication;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TypeOrmModule.forFeature([Player]),
      ],
      controllers: [PlayerController],
      providers: [PlayerRepository, PlayerService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<PlayerController>(PlayerController);
    dataSource = module.get<DataSource>(DataSource);

    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
  });

  beforeEach(async () => {
    queryRunner = dataSource.createQueryRunner();
    await dataSource.query('TRUNCATE TABLE player RESTART IDENTITY CASCADE');
    await queryRunner.connect();
    await queryRunner.startTransaction();
  });

  afterEach(async () => {
    await queryRunner.rollbackTransaction();
  });

  afterAll(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    await queryRunner.release();
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CreatePlayer', () => {
    it('should create a new player', async () => {
      const player: User = {
        id: 'testuser',
        password: 'testpass',
      };

      const result = await controller.CreatePlayer(player);
      expect(result).toBeTruthy();
    });
  });
});
