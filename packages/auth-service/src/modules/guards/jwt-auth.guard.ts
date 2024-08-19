// jwt가드
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//AuthGuard('jwt')를 확장 > 여기서('jwt')는 JWT.strategy.ts를 사용함을 의미한다
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * * 클라이언트 요청이 보호된 경로에 접근할 수 있는지 확인
   * @param context 실행 중인 요청의 컨텍스트
   * @returns boolean
   */
  canActivate(context: ExecutionContext) {
    // 기본 AuthGuard의 동작을 호출하여 JWT 검증을 수행
    return super.canActivate(context);
  }

  /**
   * * 요청 처리중 발생한 오류
   * @param err
   * @param user
   * @returns user
   * @throws UnauthorizedException 오류가 있거나 사용자가 유효하지 않은 경우 예외를 던짐
   */
  handleRequest(err, user) {
    //오류가 발생했거나 유저가 없다면 UnauthorizedException
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
