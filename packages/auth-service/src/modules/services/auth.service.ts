import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import PlayerDTO from '@shared/DTOs/player.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationService } from './validation.service';
import { User } from '@shared/entities/user.entity';
import IAuth from '../../../ts/interfaces/auth/IAuth';
import { UserState } from '../../../../../shared/entities/user-state.entity';

@Injectable()
/**
 * * Class : AuthService
 * 작성자 : @moonhr / 2024-07-23
 * 편집자 : @moonhr / 2024-07-24
 * Issue : WIB-6
 * @implements AuthInterface
 * @description 사용자 관련 로직 처리하는 서비스 클래스
 */
export class AuthService implements IAuth {
  constructor(
    private readonly jwtService: JwtService,
    private readonly validationService: ValidationService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserState)
    private readonly userStateRepositroy: Repository<UserState>,
  ) {}

  /**
   * * 유효성검사 메서드
   * @param user PlayDTO타입
   * @returns 유효하면 true, 아니면 false
   */
  validateDTO(user: PlayerDTO): boolean {
    return this.validationService.validateDTO(user);
  }

  /**
   * * 사용자 검증 메서드
   * @param id
   * @param pass
   * @returns 사용자 정보(비밀번호 제외) 또는 null
   */
  async validateUser(
    id: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  updateUserState(id: string, ip: string) {
    const userState: Partial<UserState> = {
      last_login_ip: ip,
      last_login_time: new Date().getTime(),
    };

    return this.userStateRepositroy.update(id, userState);
  }

  /**
   * * 로그인 메서드
   * @param user PlayDTO타입
   * @returns JWT access_token
   */
  async login(user: PlayerDTO): Promise<{ token: string; cookieOptions: any }> {
    const payload = { username: user.id, sub: user.id };
    try {
      const token = this.jwtService.sign(payload);
      const cookieOptions = {
        // httpOnly: true,
        // secure: process.env.NODE_ENV === 'production' || false,
        maxAge: 3600000,
      };
      console.log('토큰 출력 직전');
      return { token, cookieOptions };
    } catch (error) {
      console.error(error);
    }
  }
}
