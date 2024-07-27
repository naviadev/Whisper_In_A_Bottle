import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PlayerDTO } from '@shared/DTO/sharedDTO';
import { ExecutionContext } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateDTO: jest.fn(),
            validateUser: jest.fn(),
            login: jest.fn(),
            validateToken: jest.fn(),
          },
        },
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: jest
              .fn()
              .mockImplementation((context: ExecutionContext) => {
                const request = context.switchToHttp().getRequest();
                request.user = { id: 'test-user' };
                return true;
              }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should return an access token for valid credentials', async () => {
      const playerDTO: PlayerDTO = { id: 'test', password: 'password' };
      const token = { access_token: 'some-jwt-token' };
      jest.spyOn(authService, 'validateDTO').mockReturnValue(true);
      jest.spyOn(authService, 'validateUser').mockResolvedValue({ id: 'test' });
      jest.spyOn(authService, 'login').mockResolvedValue(token);

      const result = await authController.login(playerDTO);
      expect(result).toEqual(token);
    });

    it('should throw an error for invalid DTO', async () => {
      const playerDTO: PlayerDTO = { id: 'test', password: 'password' };
      jest.spyOn(authService, 'validateDTO').mockReturnValue(false);

      await expect(authController.login(playerDTO)).rejects.toThrow(
        '유효하지 않음.',
      );
    });

    it('should throw an error for invalid credentials', async () => {
      const playerDTO: PlayerDTO = { id: 'test', password: 'password' };
      jest.spyOn(authService, 'validateDTO').mockReturnValue(true);
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      await expect(authController.login(playerDTO)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('validateToken', () => {
    it('should return true for a valid token', async () => {
      const request = {
        headers: {
          authorization: 'Bearer some-jwt-token',
        },
      };
      jest.spyOn(authService, 'validateToken').mockResolvedValue(true);

      const result = await authController.validateToken(request as any);
      expect(result).toBe(true);
    });

    it('should return false for an invalid token', async () => {
      const request = {
        headers: {
          authorization: 'Bearer some-jwt-token',
        },
      };
      jest.spyOn(authService, 'validateToken').mockResolvedValue(false);

      const result = await authController.validateToken(request as any);
      expect(result).toBe(false);
    });
  });
});
