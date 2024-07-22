import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import AuthService from './authInterface';
import { PlayerDTO } from '@shared/DTO/sharedDTO';
import User from 'src/entity/User.entity';
/**
 * * Decorator : Injectable
 * 작성자 : @naviadev / 2024-07-16
 * 편집자 : @naviadev / 2024-07-17
 * Issue : WIB-14
 * @class RegisterService
 * @description : 데이터베이스에 RegisterInfo Entity Save, 간단한 Type 검사 진행.
 */
@Injectable()
export class RegisterService implements AuthService {
  constructor(
    @InjectRepository(User)
    private readonly registerRepository: Repository<User>,
  ) {}

  validateDTO(Data: PlayerDTO): boolean {
    const dataType = this.isRegisterInfo(Data);

    if (dataType) {
      const isId = typeof Data.id === 'string';
      const isPassword = typeof Data.password === 'string';
      return isId && isPassword;
    } else {
      return false;
    }
  }

  private isRegisterInfo(Data: PlayerDTO) {
    return 'id' in Data;
  }

  async insertToDatabase(Data: PlayerDTO): Promise<boolean> {
    console.log(Data);
    try {
      const existingUser = await this.registerRepository.findOneBy({
        id: Data.id,
      });

      if (existingUser) {
        return false;
      }
      const entity = this.registerRepository.create(Data);
      await this.registerRepository.save(entity);
      return true;
    } catch (error) {
      console.error('Error inserting to database:', error);
      return false;
    }
  }
}
