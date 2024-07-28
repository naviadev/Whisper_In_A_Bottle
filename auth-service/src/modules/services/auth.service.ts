import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import IPlayerDTO from 'ts/DTOs/IPlayerDTO';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationService } from './validation.service';
import User from '../../../ts/entity/User.entity';
import { IAuth } from 'ts/interfaces/auth/IAuth';

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
  ) {}

  /**
   * * 유효성검사 메서드
   * @param user PlayDTO타입
   * @returns 유효하면 true, 아니면 false
   */
  validateDTO(user: IPlayerDTO): boolean {
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

  /**
   * * 로그인 메서드
   * @param user PlayDTO타입
   * @returns JWT access_token
   */
  async login(user: IPlayerDTO): Promise<{ access_token: string }> {
    const payload = { username: user.playerID, sub: user.playerID };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * * 토큰 검증 메서드
   * @param token
   * @returns 토큰이 유효하면 true, 아니면 false
   */
  async validateToken(token: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token);
      return !!decoded;
    } catch (error) {
      return false;
    }
  }
}
