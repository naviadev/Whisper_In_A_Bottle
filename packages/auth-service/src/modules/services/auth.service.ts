import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PlayerDTO } from '@shared/DTOs/player.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationService } from './validation.service';
import { User } from '@shared/entities/user.entity';
import IAuth from '../../../ts/interfaces/auth/auth.interface';
import { UserState } from '@shared/entities/user_state.entity';

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
    private readonly userStateRepository: Repository<UserState>,
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

    return this.userStateRepository.update(id, userState);
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
  /**
   * * 리프레시 토큰 생성 메서드
   * @param user 사용자 객체
   * @returns 생성된 리프레시 토큰
   */
  async generateRefreshToken(user: User): Promise<string> {
    const payload = { username: user.id, sub: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET_KEY,
      expiresIn: '7d',
    });
    await this.userStateRepository.update(user.id, { refreshToken });
    return refreshToken;
  }
  /**
   * * 리프레시 토큰 검증 및 새로운 엑세스 토큰 발급
   * @param refreshToken 리프레시 토큰
   * @returns 새로운 JWT 엑세스 토큰
   */
  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET_KEY,
      });

      const userState = await this.userStateRepository.findOne({
        where: { refreshToken },
      });
      if (!userState) {
        throw new UnauthorizedException('토큰 재생성 실패');
      }

      const newAccessToken = this.jwtService.sign({
        username: payload.username,
        sub: payload.sub,
      });
      return newAccessToken;
    } catch (error) {
      throw new UnauthorizedException('토큰 재생성 실패');
    }
  }
  async invalidateRefreshToken(refreshToken: string) {
    await this.userStateRepository.update(
      { refreshToken },
      { refreshToken: null },
    );
  }
  private async validateRefreshTokenInDB(refreshToken: string): Promise<void> {
    const userState = await this.userStateRepository.findOne({
      where: { refreshToken },
    });
    if (!userState) {
      throw new UnauthorizedException('토큰 재생성 실패');
    }
  }
}
