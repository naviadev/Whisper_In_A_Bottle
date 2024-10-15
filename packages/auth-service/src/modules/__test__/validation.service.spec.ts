import { ValidationService } from '../services/validation.service';
import { PlayerDTO } from '@shared/DTOs/player.dto';

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
      const playerDTO: PlayerDTO = { id: 'test', password: 'password' };
      const result = validationService.validateDTO(playerDTO);
      expect(result).toBe(true);
    });

    it('should return false for DTO missing id', () => {
      const playerDTO = { password: 'password' } as PlayerDTO;
      const result = validationService.validateDTO(playerDTO);
      expect(result).toBe(false);
    });

    it('should return false for DTO missing password', () => {
      const playerDTO = { id: 'test' } as PlayerDTO;
      const result = validationService.validateDTO(playerDTO);
      expect(result).toBe(false);
    });

    it('should return false for DTO with non-string id', () => {
      const playerDTO = {
        id: 123,
        password: 'password',
      } as unknown as PlayerDTO;
      const result = validationService.validateDTO(playerDTO);
      expect(result).toBe(false);
    });

    it('should return false for DTO with non-string password', () => {
      const playerDTO = { id: 'test', password: 123 } as unknown as PlayerDTO;
      const result = validationService.validateDTO(playerDTO);
      expect(result).toBe(false);
    });
  });

  describe('isPlayerDTO', () => {
    it('should return true for object with id and password', () => {
      const playerDTO: PlayerDTO = { id: 'test', password: 'password' };
      const result = (validationService as any).isPlayerDTO(playerDTO);
      expect(result).toBe(true);
    });

    it('should return false for object missing id', () => {
      const playerDTO = { password: 'password' } as PlayerDTO;
      const result = (validationService as any).isPlayerDTO(playerDTO);
      expect(result).toBe(false);
    });

    it('should return false for object missing password', () => {
      const playerDTO = { id: 'test' } as PlayerDTO;
      const result = (validationService as any).isPlayerDTO(playerDTO);
      expect(result).toBe(false);
    });
  });
});
