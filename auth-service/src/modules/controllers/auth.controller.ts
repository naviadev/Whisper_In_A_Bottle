import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import IPlayerDTO from 'ts/DTOs/IPlayerDTO';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Request } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * * 로그인 엔드포인트
   * 작성자 : @moonhr / 2024-07-23
   * 편집자 : @moonhr / 2024-07-24
   * Issue : WIB-6
   * @decorator Post
   * @description
   */
  @Post('login')
  async login(
    @Body() data: IPlayerDTO,
    @Res() res: Response,
  ): Promise<VideoDecoderConfig> {
    try {
      const user = await this.authService.validateUser(data.id, data.password);
      if (!user) {
        // 사용자가 존재하지 않으면 에러 반환
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ success: false, message: 'Invalid credentials' });
        return;
      }

      const { token, cookieOptions } = await this.authService.login(data);

      //TODO user state 업데이트

      res.cookie('token', token, cookieOptions);
      res.status(HttpStatus.OK).json({ success: true, token });
    } catch (error) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: 'Invalid credentials' });
    }
  }

  /**
   * 토큰 검증 엔드포인트 JwtAuthGuard를 거쳐 검증
   * @param request Request 객체
   * @returns 토큰이 유효하면 true, 그렇지 않으면 false
   */
  @Post('validate-token')
  @UseGuards(JwtAuthGuard)
  async validateToken(@Request() request): Promise<boolean> {
    const token = request.headers.authorization.split(' ')[1];
    return this.authService.validateToken(token);
  }
}
