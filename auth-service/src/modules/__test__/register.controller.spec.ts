import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from '../controllers/register.controller';
import { RegisterService } from '../services/register.service';
import IPlayerDTO from 'ts/DTOs/IPlayerDTO';

// Mocking RegisterService
const mockRegisterService = () => ({
  validateDTO: jest.fn(),
  insertToDatabase: jest.fn(),
});

describe('RegisterController', () => {
  let controller: RegisterController;
  let registerService: RegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        { provide: RegisterService, useValue: mockRegisterService() },
      ],
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
    registerService = module.get<RegisterService>(RegisterService);
  });

  describe('registerUser', () => {
    it('should return true when DTO is valid and data is inserted successfully', async () => {
      const dto: IPlayerDTO = {
        playerID: 'test@example.com',
        password: 'password123',
      };
      (registerService.validateDTO as jest.Mock).mockReturnValue(true);
      (registerService.insertToDatabase as jest.Mock).mockResolvedValue(true);

      const result = await controller.registerUser(dto);

      expect(registerService.validateDTO).toHaveBeenCalledWith(dto);
      expect(registerService.insertToDatabase).toHaveBeenCalledWith(dto);
      expect(result).toBe(true);
    });

    it('should return false when DTO is valid but data insertion fails', async () => {
      const dto: IPlayerDTO = {
        playerID: 'test@example.com',
        password: 'password123',
      };
      (registerService.validateDTO as jest.Mock).mockReturnValue(true);
      (registerService.insertToDatabase as jest.Mock).mockResolvedValue(false);

      const result = await controller.registerUser(dto);

      expect(registerService.validateDTO).toHaveBeenCalledWith(dto);
      expect(registerService.insertToDatabase).toHaveBeenCalledWith(dto);
      expect(result).toBe(false);
    });

    it('should return false when DTO is invalid', async () => {
      const dto: IPlayerDTO = {
        playerID: 'test@example.com',
        password: 'password123',
      };
      (registerService.validateDTO as jest.Mock).mockReturnValue(false);

      const result = await controller.registerUser(dto);

      expect(registerService.validateDTO).toHaveBeenCalledWith(dto);
      expect(registerService.insertToDatabase).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
