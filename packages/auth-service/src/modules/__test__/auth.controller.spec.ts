import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { HttpStatus } from '@nestjs/common';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { PlayerDTO } from '@shared/DTOs/player.dto';

//사전설정
describe('AuthController', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
            updateUserState: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    await app.close();
  });

  it('사용자 검증과 jwt 토큰 반환, 응답에 토큰 포함되었는지 확인', async () => {
    const validDTO: PlayerDTO = { id: 'player1', password: 'secret' };
    const mockToken = 'mock-jwt-token';
    const mockCookieOptions = { maxAge: 3600000 };

    jest
      .spyOn(authService, 'validateUser')
      .mockResolvedValue({ id: 'player1' });
    jest.spyOn(authService, 'login').mockResolvedValue({
      token: mockToken,
      cookieOptions: mockCookieOptions,
    });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(validDTO)
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      success: true,
      token: mockToken,
    });

    expect(response.headers['set-cookie']).toBeDefined();
    expect(authService.updateUserState).toHaveBeenCalledWith(
      validDTO.id,
      expect.any(String),
    );
  });

  it('유효성 실패시, null과 401반환', async () => {
    const invalidDTO: PlayerDTO = { id: 'player1', password: 'wrongpassword' };

    jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(invalidDTO)
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body).toEqual({
      success: false,
      message: 'Invalid credentials',
    });
  });

  it('에러처리', async () => {
    const validDTO: PlayerDTO = { id: 'player1', password: 'secret' };

    jest.spyOn(authService, 'validateUser').mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(validDTO)
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body).toEqual({
      success: false,
      message: 'Invalid credentials',
    });
  });
});
