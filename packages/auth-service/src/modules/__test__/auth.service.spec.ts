// 테스트대상
// validateDTO, validateUser, updateUserState, login

import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from '../services/auth.service';
import { ValidationService } from '../services/validation.service';
import { User } from '@shared/entities/user.entity';
import { UserState } from '@shared/entities/user-state.entity';
import { Repository } from 'typeorm';
import PlayerDTO from '@shared/DTOs/player.dto';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let validationService: ValidationService;
  let userRepository: Repository<User>;
  let userStateRepositroy: Repository<UserState>;

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
        {
          provide: getRepositoryToken(UserState),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    validationService = module.get<ValidationService>(ValidationService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    userStateRepositroy = module.get<Repository<UserState>>(
      getRepositoryToken(UserState),
    );
  });

  //validateDTO테스트
  describe('validateDTO', () => {
    it('PlayerDTO가 유효하면 true반환', () => {
      const validDTO: PlayerDTO = { id: 'player1', password: 'secret' };
      jest.spyOn(validationService, 'validateDTO').mockReturnValue(true);
      expect(service.validateDTO(validDTO)).toBe(true);
    });
    it('PlayerDTO가 유효하지 않으면 false반환', () => {
      const invalidDTO: PlayerDTO = { id: 'player1', password: 1234 as any };
      jest.spyOn(validationService, 'validateDTO').mockReturnValue(false);
      expect(service.validateDTO(invalidDTO)).toBe(false);
    });
  });

  //validateUser테스트
  describe('validateUser', () => {
    it('유효한 사용자 ID와 일치하는 비밀번호가 입력되었을 때, 비밀번호를 제외한 사용자 정보를 반환', async () => {
      const user = { id: 'player1', password: 'secret' } as User;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await service.validateUser('player1', 'secret');
      expect(result).toEqual({ id: 'player1' });
    });
    it('유효한 사용자 ID가 입력되었지만 비밀번호가 일치하지 않을 때, null을 반환', async () => {
      const user = { id: 'player1', password: 'secret' } as User;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await service.validateUser('player1', 'wrongpassword');
      expect(result).toBeNull();
    });
    it('존재하지 않는 사용자 ID가 입력되었을 때, null을 반환', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      const result = await service.validateUser('unknown', 'password');
      expect(result).toBeNull();
    });
  });

  //updateUserState테스트
  describe('updateUserState', () => {
    it('주어진 사용자 ID로 사용자 상태가 업데이트 성공', async () => {
      const id = 'player1';
      const ip = '127.0.0.1';

      const updateSpy = jest
        .spyOn(userStateRepositroy, 'update')
        .mockResolvedValue({} as any);

      await service.updateUserState(id, ip);

      expect(updateSpy).toHaveBeenCalledWith(id, {
        last_login_ip: ip,
        last_login_time: expect.any(Number),
      });
    });
  });

  //login테스트
  describe('login', () => {
    it('유효한 PlayerDTO 객체로 로그인 시, JWT 토큰을 생성하고 이를 반환', async () => {
      const user: PlayerDTO = { id: 'player1', password: 'secret' };
      const token = 'jwt-token';
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await service.login(user);

      expect(result).toEqual({
        token,
        cookieOptions: {
          maxAge: 3600000,
        },
      });
    });

    it('토큰 생성중 오류 발생시 처리', async () => {
      const user: PlayerDTO = { id: 'player1', password: 'secret' };
      jest.spyOn(jwtService, 'sign').mockImplementation(() => {
        throw new Error('JWT generation error');
      });

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await service.login(user);

      expect(result).toBeUndefined();
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
