import { Test, TestingModule } from '@nestjs/testing';
import { ProtectedController } from '../controllers/protected.controller';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('ProtectedController', () => {
  let protectedController: ProtectedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtectedController],
      providers: [
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

    protectedController = module.get<ProtectedController>(ProtectedController);
  });

  it('should be defined', () => {
    expect(protectedController).toBeDefined();
  });

  describe('getProtectedResource', () => {
    it('should return protected resource', () => {
      const result = protectedController.getProtectedResource();
      expect(result).toEqual({ data: '보호된 리소스' });
    });
  });
});
