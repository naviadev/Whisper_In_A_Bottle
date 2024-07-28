import IPlayerDTO from 'ts/DTOs/IPlayerDTO';
import User from 'ts/entity/User.entity';
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

export default interface IAuth {
  validateDTO(Data: IPlayerDTO): boolean;
  validateUser(
    id: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null>;
  login(user: IPlayerDTO): Promise<{ access_token: string }>;
  validateToken(token: string): Promise<boolean>;
}
