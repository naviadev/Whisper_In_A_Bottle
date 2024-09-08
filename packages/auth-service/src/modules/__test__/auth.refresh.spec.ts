import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { PlayerDTO } from '@shared/DTOs/player.dto';
import { Response, Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

// Mocking Response and Request for testing
const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (cookies: any): Partial<Request> =>
  ({
    cookies,
  }) as Partial<Request>;

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
    updateUserState: jest.fn(),
    refreshAccessToken: jest.fn(),
    invalidateRefreshToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should login and return token', async () => {
      const data: PlayerDTO = { id: 'test', password: 'password' };
      const res = mockResponse();
      const ip = '127.0.0.1';

      mockAuthService.validateUser.mockResolvedValue({ id: 'test' });
      mockAuthService.login.mockResolvedValue({
        token: 'test_token',
        cookieOptions: {},
      });

      await controller.login(data, res, ip);

      expect(service.validateUser).toHaveBeenCalledWith('test', 'password');
      expect(service.login).toHaveBeenCalledWith(data);
      expect(service.updateUserState).toHaveBeenCalledWith('test', ip);
      expect(res.cookie).toHaveBeenCalledWith('token', 'test_token', {});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        token: 'test_token',
      });
    });

    it('should return 401 if invalid credentials', async () => {
      const data: PlayerDTO = { id: 'test', password: 'password' };
      const res = mockResponse();
      const ip = '127.0.0.1';

      mockAuthService.validateUser.mockResolvedValue(null);

      await controller.login(data, res, ip);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid credentials',
      });
    });
  });

  describe('refreshToken', () => {
    it('should refresh token if valid', async () => {
      const req = mockRequest({ refresh_token: 'refresh_token' });
      const res = mockResponse();

      mockAuthService.refreshAccessToken.mockResolvedValue('new_access_token');

      await controller.refreshToken(req as Request, res);

      expect(service.refreshAccessToken).toHaveBeenCalledWith('refresh_token');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        accessToken: 'new_access_token',
      });
    });

    it('should return 401 if refresh token is not provided', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await controller.refreshToken(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Refresh token not provided',
      });
    });

    it('should return 401 if refresh token is invalid', async () => {
      const req = mockRequest({ refresh_token: 'invalid_token' });
      const res = mockResponse();

      mockAuthService.refreshAccessToken.mockRejectedValue(
        new UnauthorizedException(),
      );

      await controller.refreshToken(req as Request, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid refresh token',
      });
    });
  });

  describe('logout', () => {
    it('should clear refresh token and log out', async () => {
      const req = mockRequest({ refresh_token: 'some_refresh_token' });
      const res = mockResponse();

      await controller.logout(req as Request, res);

      expect(service.invalidateRefreshToken).toHaveBeenCalledWith(
        'some_refresh_token',
      );

      expect(res.clearCookie).toHaveBeenCalledWith('refresh_token');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Logged out successfully',
      });
    });

    it('should log out without refresh token', async () => {
      const req = mockRequest({ cookies: {} });
      const res = mockResponse();
      await controller.logout(req as Request, res);
      expect(res.status).toHaveBeenCalledWith(200); // 정상 로그아웃
      expect(res.json).toHaveBeenCalledWith({
        message: 'Logged out successfully',
      });
    });
  });
});
