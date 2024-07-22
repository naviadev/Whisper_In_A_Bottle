//jwt전략
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //JWT추출방법
      ignoreExpiration: false, //토큰만료 무시하지 않음
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'), // 환경 변수에서 비밀 키 가져오기
    });
  }

  /**
   * JWT의 payload 검증
   * @param payload
   * @returns User object
   */
  async validate(payload: any) {
    return { userId: payload.username };
  }
}
