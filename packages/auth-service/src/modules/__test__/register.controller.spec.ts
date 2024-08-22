import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from '../controllers/register.controller';
import { RegisterService } from '../services/register.service';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request = require('supertest');
import PlayerDTO from '@shared/DTOs/player.dto';

describe('RegisterController', () => {
  let app: INestApplication;
  let registerService: RegisterService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        {
          provide: RegisterService,
          useValue: {
            validateDTO: jest.fn(),
            insertToDatabase: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    registerService = moduleRef.get<RegisterService>(RegisterService);
  });

  afterEach(async () => {
    await app.close();
    jest.clearAllMocks();
  });

  it('should return 400 if DTO is invalid', async () => {
    const invalidDTO: PlayerDTO = { id: '', password: '' };

    jest.spyOn(registerService, 'validateDTO').mockReturnValue(false);

    const response = await request(app.getHttpServer())
      .post('/register')
      .send(invalidDTO);

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    expect(response.body).toEqual({
      success: false,
      message: '유효성 검사 실패',
    });
  });

  it('should return 500 if user already exists', async () => {
    const validDTO: PlayerDTO = { id: 'existingUser', password: 'password' };

    jest.spyOn(registerService, 'validateDTO').mockReturnValue(true);
    jest.spyOn(registerService, 'insertToDatabase').mockResolvedValue(false);

    const response = await request(app.getHttpServer())
      .post('/register')
      .send(validDTO);

    expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({
      success: false,
      message: '이미 존재하는 아이디',
    });
  });

  it('should return 200 and success message if registration is successful', async () => {
    const validDTO: PlayerDTO = { id: 'newUser', password: 'password' };

    jest.spyOn(registerService, 'validateDTO').mockReturnValue(true);
    jest.spyOn(registerService, 'insertToDatabase').mockResolvedValue(true);

    const response = await request(app.getHttpServer())
      .post('/register')
      .send(validDTO);

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual({
      success: true,
      message: '가입 완료',
    });
  });
});
