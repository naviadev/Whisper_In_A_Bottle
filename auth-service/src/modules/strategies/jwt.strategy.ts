import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import IJwt from '../../../ts/interfaces/auth/IJwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  /**
   * JWT의 payload 검증
   * @param payload
   * @returns User object
   */
  async validate(payload: IJwt) {
    if (!payload || !payload.username) {
      throw new UnauthorizedException();
    }
    return { id: payload.username };
  }
}
