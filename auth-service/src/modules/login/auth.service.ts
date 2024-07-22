import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '@shared/DTO/user';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * * 사용자 검증
   * @param id
   * @param password
   * @returns object
   */
  async validateUser(id: string, password: string): Promise<User | null> {
    // 데이터베이스에서 사용자를 조회하여 비밀번호를 확인하는 로직
    if (id === 'example' && password === 'password') {
      return { id, password };
    }
    return null;
  }

  /**
   * * 로그인 처리
   * @param user
   * @returns 토큰 생성
   */
  async login(user: User) {
    const payload = { username: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * * 로그아웃 처리
   * * 추후 redis로 블랙리스트 추가로 이어질 예정으로 현재는 클라이언트 반응만 진행(?)
   * @returns 메세지 띄움
   */
  async logout() {
    return { message: 'Logged out successfully' };
  }

  /**
   * * 토큰 검증
   * @param token
   * @returns 토큰 유효성 검사
   */
  async validateToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      return null; // 토큰이 유효하지 않으면 null 반환
    }
  }
}
