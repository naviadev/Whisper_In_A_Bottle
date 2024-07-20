import { Controller, Post, Body } from '@nestjs/common';
import RegisterInterface from './registerInterface';
import User from '@shared/DTO/user';

/**
 * * Decorator : Controller
 * 작성자 : @naviadev / 2024-07-16
 * 편집자 : @naviadev / 2024-07-17
 * Issue : WIB-14
 * @class RegisterController
 * @description : '/register 요청을 처리하는 엔드포인트'
 */

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterInterface) {}
  @Post()
  async registerUser(@Body() registerData: User) {
    if (this.registerService.validateDTO(registerData)) {
      const result = await this.registerService.insertToDatabase(registerData);
      return result;
    } else {
      return false;
    }
  }
}
