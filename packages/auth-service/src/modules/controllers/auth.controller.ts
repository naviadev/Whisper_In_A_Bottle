import { Controller, Post, Body, Res, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PlayerDTO } from '@shared/DTOs/player.dto';
import { Request, Response } from 'express';
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
    try {
      const user = await this.authService.validateUser(data.id, data.password);

      if (!user) {
        // 사용자가 존재하지 않으면 에러 반환
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ success: false, message: 'Invalid credentials' });
        return;
      }

      await this.authService.login(data);

      this.authService.updateUserState(data.id, ip);

      const { token, cookieOptions } = await this.authService.login(data);

      res.cookie('token', token, cookieOptions);
      res.status(HttpStatus.OK).json({ success: true, token });
    } catch (error) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: 'Invalid credentials' });
    }
  }

  @Post('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token']; // 클라이언트로부터 리프레시 토큰을 쿠키에서 가져옴

    if (!refreshToken) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Refresh token not provided' });
    }

    try {
      const newAccessToken =
        await this.authService.refreshAccessToken(refreshToken);
      res.status(HttpStatus.OK).json({ accessToken: newAccessToken });
    } catch (error) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid refresh token' });
    }
  }
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    // const refreshToken = req.cookies.refresh_token;
    // if (refreshToken) {
    //   await this.authService.invalidateRefreshToken(refreshToken);
    // }
    // res.clearCookie('refresh_token');
    // res.status(200).json({ message: 'Logged out successfully' });
    const token = req.cookies['token'];
    if (token) {
      await this.authService.invalidateRefreshToken(token);
    }
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  }
}
