import { PlayerDTO } from '@shared/DTOs/player.dto';
import { User } from '@shared/entities/user.entity';
/**
 * * Interface : AuthService
 * 작성자 : @naviadev
 * 작성일 : 2024-07-16
 * 최종 편집일 : 2024-07-23
 * 최종 편집자 : @moonhr
 * Issue :
 * @interface AuthService
 * @description : AuthService에 적용되는 메서드
 */

interface IAuth {
  validateDTO(Data: PlayerDTO): boolean;
  validateUser(
    id: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null>;
  login(user: PlayerDTO): Promise<{ token: string; cookieOptions: any }>;
}
export default IAuth;
