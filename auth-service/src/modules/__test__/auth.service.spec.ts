import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ValidationService } from '../services/validation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../../../ts/entity/User.entity';
import IPlayerDTO from 'ts/DTOs/IPlayerDTO';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let validationService: ValidationService;
  let userRepository: Repository<User>;
  //초기화
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        ValidationService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    validationService = module.get<ValidationService>(ValidationService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateDTO', () => {
    it('should return true for valid DTO', () => {
      const playerDTO: IPlayerDTO = { playerID: 'test', password: 'password' };
      jest.spyOn(validationService, 'validateDTO').mockReturnValue(true);
      expect(authService.validateDTO(playerDTO)).toBe(true);
    });

    it('should return false for invalid DTO', () => {
      const playerDTO: IPlayerDTO = { playerID: 'test', password: 'password' };
      jest.spyOn(validationService, 'validateDTO').mockReturnValue(false);
      expect(authService.validateDTO(playerDTO)).toBe(false);
    });
  });

  describe('validateUser', () => {
    it('should return user data without password for valid credentials', async () => {
      const user = { id: 'test', password: 'password' };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user as User);

      const result = await authService.validateUser('test', 'password');
      expect(result).toEqual({ id: 'test' });
    });

    it('should return null for invalid credentials', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      const result = await authService.validateUser('test', 'password');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a valid JWT token', async () => {
      const playerDTO: IPlayerDTO = { playerID: 'test', password: 'password' };
      const token = 'some-jwt-token';
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await authService.login(playerDTO);
      expect(result).toEqual({ access_token: token });
    });
  });

  describe('validateToken', () => {
    it('should return true for a valid token', async () => {
      const token = 'some-jwt-token';
      jest.spyOn(jwtService, 'verify').mockReturnValue({});

      const result = await authService.validateToken(token);
      expect(result).toBe(true);
    });

    it('should return false for an invalid token', async () => {
      const token = 'some-jwt-token';
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      const result = await authService.validateToken(token);
      expect(result).toBe(false);
    });
  });
});
