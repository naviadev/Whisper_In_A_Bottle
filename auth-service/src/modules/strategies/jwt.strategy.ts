import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { jwtInterface } from '../interfaces/jwtInterface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //JWT추출방법
      ignoreExpiration: false, //토큰만료 무시하지 않음
      secretOrKey: configService.get<string>('JWT.SECRET.KEY'),
    });
  }

  /**
   * JWT의 payload 검증
   * @param payload
   * @returns User object
   */
  async validate(payload: jwtInterface) {
    if (!payload || !payload.username) {
      throw new UnauthorizedException();
    }
    return { userId: payload.username };
  }
}
