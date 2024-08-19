import { ValidationService } from '../services/validation.service';
import IPlayerDTO from 'ts/DTOs/IPlayerDTO';

describe('ValidationService', () => {
  let validationService: ValidationService;

  beforeEach(() => {
    validationService = new ValidationService();
  });

  it('should be defined', () => {
    expect(validationService).toBeDefined();
  });

  describe('validateDTO', () => {
    it('should return true for valid DTO', () => {
      const playerDTO: IPlayerDTO = { id: 'test', password: 'password' };
      const result = validationService.validateDTO(playerDTO);
      expect(result).toBe(true);
    });

    it('should return false for DTO missing id', () => {
      const playerDTO = { password: 'password' } as IPlayerDTO;
      const result = validationService.validateDTO(playerDTO);
      expect(result).toBe(false);
    });

    it('should return false for DTO missing password', () => {
      const playerDTO = { id: 'test' } as IPlayerDTO;
      const result = validationService.validateDTO(playerDTO);
      expect(result).toBe(false);
    });

    it('should return false for DTO with non-string id', () => {
      const playerDTO = {
        id: 123,
        password: 'password',
      } as unknown as IPlayerDTO;
      const result = validationService.validateDTO(playerDTO);
      expect(result).toBe(false);
    });

    it('should return false for DTO with non-string password', () => {
      const playerDTO = { id: 'test', password: 123 } as unknown as IPlayerDTO;
      const result = validationService.validateDTO(playerDTO);
      expect(result).toBe(false);
    });
  });

  describe('isPlayerDTO', () => {
    it('should return true for object with id and password', () => {
      const playerDTO: IPlayerDTO = { id: 'test', password: 'password' };
      const result = (validationService as any).isPlayerDTO(playerDTO);
      expect(result).toBe(true);
    });

    it('should return false for object missing id', () => {
      const playerDTO = { password: 'password' } as IPlayerDTO;
      const result = (validationService as any).isPlayerDTO(playerDTO);
      expect(result).toBe(false);
    });

    it('should return false for object missing password', () => {
      const playerDTO = { id: 'test' } as IPlayerDTO;
      const result = (validationService as any).isPlayerDTO(playerDTO);
      expect(result).toBe(false);
    });
  });
});
