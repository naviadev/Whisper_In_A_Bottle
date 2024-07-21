import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { PlayerDTO } from '@shared/DTO/sharedDTO';
import { RegisterService } from './register.service';

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
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  @HttpCode(200)
  async registerUser(@Body() registerData: PlayerDTO) {
    if (this.registerService.validateDTO(registerData)) {
      const result = await this.registerService.insertToDatabase(registerData);

      if (result) {
        return {
          success: true,
          message: '가입 완료',
        };
      } else {
        throw new HttpException(
          {
            success: false,
            message: '이미 존재하는 아이디',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      throw new HttpException(
        {
          success: false,
          message: '유효성 검사 실패',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
