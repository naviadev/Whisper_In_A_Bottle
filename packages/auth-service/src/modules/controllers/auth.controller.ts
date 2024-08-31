import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PlayerDTO } from '@shared/DTOs/player.dto';
import { Response } from 'express';
import { IpAddress } from '../../decorator/IpAddress.decorator';

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
    @Body() data: PlayerDTO,
    @Res() res: Response,
    @IpAddress() ip: string,
  ): Promise<VideoDecoderConfig> {
    console.log('ㅇㅇ');
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

      this.authService.updateUserState(data.id, ip);

      res.cookie('token', token, cookieOptions);
      res.status(HttpStatus.OK).json({ success: true, token });
    } catch (error) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: 'Invalid credentials' });
    }
  }
}
