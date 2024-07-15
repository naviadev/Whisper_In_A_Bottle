import { Controller, Post, Body } from '@nestjs/common';
import AuthService from './authInterface';
import RegisterInfo from '@shared/DTO/registerInfo';

/**
 * CHECKLIST
 * [ ] Service 불러오기
 * [ ] 단위 Test
 */

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: AuthService) {}

  @Post()
  async registerUser(@Body() registerData: RegisterInfo) {
    if (this.registerService.validateDTO(registerData)) {
      const result = await this.registerService.insertToDatabase(registerData);
      return result;
    } else {
      return false;
    }
  }
}
