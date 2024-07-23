import { PlayerDTO } from '@shared/DTO/sharedDTO';
import User from 'src/entity/User.entity';
/**
 * * Interface : AuthService
 * 작성자 : @naviadev
 * 작성일 : 2024-07-16
 * 최종 편집일 : 2024-07-23
 * 최종 편집자 : @moonhr
 * Issue : WIB-14
 * @interface AuthService
 * @description : AuthService에 적용되는 메서드
 */

export interface AuthInterface {
  validateDTO(Data: PlayerDTO): boolean;
  validateUser(
    id: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null>;
  login(user: PlayerDTO): Promise<{ access_token: string }>;
  validateToken(token: string): Promise<boolean>;
}
