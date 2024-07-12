import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@shared/DTO/userInterface';

@Controller('auth') //auth 경로로 들어오는 모든 요청을 처리
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') //login 경로로 들어오는 post 요청을 처리
  async login(@Body() user: User) {
    const { id, password } = user;
    const validatedUser = await this.authService.validateUser(id, password);
    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(validatedUser);
  }

  @Post('logout') //logout 경로로 들어오는 post 요청을 처리
  async logout() {
    return this.authService.logout();
  }

  //회원가입 경로 처리 추가예정
}
