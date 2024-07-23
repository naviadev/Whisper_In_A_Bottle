import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PlayerDTO } from '@shared/DTO/sharedDTO';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth') //auth 경로로 들어오는 모든 요청을 처리
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') //login 경로로 들어오는 post 요청을 처리
  async login(@Body() user: PlayerDTO) {
    const { id, password } = user;
    const validatedUser = await this.authService.validateUser(id, password);
    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(validatedUser);
  }

  @UseGuards(JwtAuthGuard) // 로그아웃도 인증이 필요한 경우
  @Post('logout') //logout 경로로 들어오는 post 요청을 처리
  async logout() {
    return this.authService.logout();
  }

  //회원가입 경로 처리 추가예정
}
