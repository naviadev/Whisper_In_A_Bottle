import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PlayerDTO } from '@shared/DTO/sharedDTO';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Request } from '@nestjs/common';

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
  async login(@Body() data: PlayerDTO): Promise<{ access_token: string }> {
    const isValid = await this.authService.validateDTO(data);
    if (!isValid) {
      throw new Error('유효하지 않음.');
    }

    // 사용자 검증 및 로그인 처리
    const user = await this.authService.validateUser(data.id, data.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    return this.authService.login(data);
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
