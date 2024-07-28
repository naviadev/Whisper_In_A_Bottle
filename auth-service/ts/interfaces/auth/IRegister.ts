import IPlayerDTO from 'ts/DTOs/IPlayerDTO';

/**
 * * Interface : Auth
 * 작성자 : @naviadev / 2024-07-16
 * 편집자 : @moonhr / 2024-07-23
 * Issue : WIB-14
 * @interface Auth
 * @description : Register Service에 상속하여 유효성 검사 및 데이터베이스에 추가
 */
export interface IRegister {
  validateDTO(Data: IPlayerDTO): boolean;
  insertToDatabase(Data: IPlayerDTO): Promise<boolean>;
}
