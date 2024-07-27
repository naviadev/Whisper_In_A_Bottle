import { JwtStrategy } from '../strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { jwtInterface } from '../interfaces/jwtInterface';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-secret-key'),
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user object for valid payload', async () => {
      const payload: jwtInterface = { username: 'testuser', sub: '12345' };
      const result = await jwtStrategy.validate(payload);
      expect(result).toEqual({ userId: 'testuser' });
    });

    it('should throw UnauthorizedException for invalid payload', async () => {
      const payload = { sub: '12345' } as jwtInterface;

      await expect(jwtStrategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException for missing payload', async () => {
      const payload = null;

      await expect(jwtStrategy.validate(payload)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
