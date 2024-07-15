import RegisterInfo from '@shared/DTO/registerInfo';
import User from '@shared/DTO/userInterface';
/**
 * CHECKLIST : 후순위
 * [ ] 데코레이터 패턴으로 변경
 */
interface Auth {
  validateDTO(Data: User | RegisterInfo): boolean;
  insertToDatabase(Data: User | RegisterInfo): boolean;
}

export default Auth;
