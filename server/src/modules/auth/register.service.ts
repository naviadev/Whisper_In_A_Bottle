import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterEntity } from '../auth/registerEntity';

import AuthService from './authInterface';
import RegisterInfo from '@shared/DTO/registerInfo';
import User from '@shared/DTO/userInterface';

/**
 * CHECKLIST : 1순위
 * [x] TypeORM 설정하기
 * [x] PostgreSQL 설정하기
 * [x] Service 로직 생성하기
 * [ ] Service Test 작업 파일 생성하기
 */

@Injectable()
export class RegisterService implements AuthService {
  constructor(
    @InjectRepository(RegisterEntity)
    private readonly registerRepository: Repository<RegisterEntity>,
  ) {}

  validateDTO(Data: User | RegisterInfo): boolean {
    const dataType = this.isRegisterInfo(Data);

    if (dataType) {
      const isId = typeof Data.id === 'string';
      const isPassword = typeof Data.password === 'string';
      const isEmail = typeof Data.email === 'string';
      return isId && isPassword && isEmail;
    } else {
      return false;
    }
  }

  private isRegisterInfo(Data: User | RegisterInfo): Data is RegisterInfo {
    return 'email' in Data;
  }

  async insertToDatabase(Data: User | RegisterInfo): Promise<boolean> {
    console.log(Data);
    try {
      const entity = this.registerRepository.create(Data);
      await this.registerRepository.save(entity);
      return true;
    } catch (error) {
      console.error('Error inserting to database:', error);
      return false;
    }
  }
}
