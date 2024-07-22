import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegisterService } from '../register.service';
import User from '../../../entity/User.entity';
import { PlayerDTO } from '@shared/DTO/sharedDTO';

// Mocking Repository
const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

describe('RegisterService', () => {
  let service: RegisterService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        { provide: getRepositoryToken(User), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<RegisterService>(RegisterService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('validateDTO', () => {
    it('should return true for valid DTO', () => {
      const validDTO: PlayerDTO = {
        id: 'test@example.com',
        password: 'password123',
      };
      expect(service.validateDTO(validDTO)).toBe(true);
    });

    it('should return false for invalid DTO', () => {
      const invalidDTO: PlayerDTO = {
        id: 'test@example.com',
        password: '123',
      }; // Invalid password type
      expect(service.validateDTO(invalidDTO)).toBe(true);
    });
  });

  describe('insertToDatabase', () => {
    it('should successfully insert data into the database', async () => {
      const dto: PlayerDTO = {
        id: 'test@example.com',
        password: 'password123',
      };
      const entity = new User();
      entity.id = dto.id;
      entity.password = dto.password;

      repository.create = jest.fn().mockReturnValue(entity);
      repository.save = jest.fn().mockResolvedValue(entity);

      const result = await service.insertToDatabase(dto);
      expect(result).toBe(true);
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(entity);
    });

    it('should handle errors when inserting data', async () => {
      const dto: PlayerDTO = {
        id: 'test@example.com',
        password: 'password123',
      };
      repository.create = jest.fn().mockReturnValue(dto);
      repository.save = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));

      const result = await service.insertToDatabase(dto);
      expect(result).toBe(false);
    });
  });
});
