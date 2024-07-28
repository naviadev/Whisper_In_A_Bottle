// validation.service.ts
import { Injectable } from '@nestjs/common';
import IPlayerDTO from 'ts/DTOs/IPlayerDTO';

@Injectable()
export class ValidationService {
  validateDTO(Data: IPlayerDTO): boolean {
    const dataType = this.isPlayerDTO(Data);

    if (dataType) {
      const isId = typeof Data.id === 'string';
      const isPassword = typeof Data.password === 'string';
      return isId && isPassword;
    } else {
      return false;
    }
  }

  private isPlayerDTO(Data: IPlayerDTO) {
    return 'id' in Data && 'password' in Data;
  }
}
