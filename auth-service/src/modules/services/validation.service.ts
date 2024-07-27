// validation.service.ts
import { Injectable } from '@nestjs/common';
import { PlayerDTO } from '@shared/DTO/sharedDTO';

@Injectable()
export class ValidationService {
  validateDTO(Data: PlayerDTO): boolean {
    const dataType = this.isPlayerDTO(Data);

    if (dataType) {
      const isId = typeof Data.id === 'string';
      const isPassword = typeof Data.password === 'string';
      return isId && isPassword;
    } else {
      return false;
    }
  }

  private isPlayerDTO(Data: PlayerDTO) {
    return 'id' in Data && 'password' in Data;
  }
}
