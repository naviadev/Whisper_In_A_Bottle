import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('protected')
/**
 * * Class : ProtectedController
 * 작성자 : @moonhr / 2024-07-24
 * 편집자 : @moonhr / 2024-07-24
 * Issue : WIB-6
 * @description 보호된 리소스를 제공하는 컨트롤러. 모든 요청은 JwtAuthGuard를 거쳐야한다.
 */
export class ProtectedController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProtectedResource() {
    return { data: '보호된 리소스' };
  }
}
