import { PlayerDTO } from '@shared/DTO/sharedDTO';
/**
 * * Interface : AuthService
 * 작성자 : @naviadev
 * 작성일 : 2024-07-16
 * 최종 편집일 : 2024-07-16
 * 최종 편집자 : @naviadev
 * Issue : WIB-14
 * @interface AuthService
 * @description : Login, Register Service에 공통적으로 적용되는 메서드
 */

interface AuthService {
  validateDTO(Data: PlayerDTO): boolean;
  insertToDatabase(Data: PlayerDTO): Promise<boolean>;
}

export default AuthService;
