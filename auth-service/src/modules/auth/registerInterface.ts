import { PlayerDTO } from '@shared/DTO/sharedDTO';

/**
 * * Interface : Auth
 * 작성자 : @naviadev / 2024-07-16
 * 편집자 : @naviadev / 2024-07-18
 * Issue : WIB-14
 * @interface Auth
 * @description : Login, Register Service에 상속하여 유효성 검사
 */
interface RegisterInterface {
  validateDTO(Data: PlayerDTO): boolean;
  insertToDatabase(Data: PlayerDTO): Promise<boolean>;
}

export default RegisterInterface;
