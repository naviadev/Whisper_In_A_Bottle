import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInterface } from '../interfaces/registerInterface';
import { PlayerDTO } from '@shared/DTO/sharedDTO';
import { ValidationService } from './validation.service';
import User from '../../entity/User.entity';
/**
 * * Decorator : Injectable
 * 작성자 : @naviadev / 2024-07-16
 * 편집자 : @moonhr / 2024-07-24
 * Issue : WIB-6
 * @class RegisterServices
 * @description : 데이터베이스에 RegisterInfo Entity Save, 간단한 Type 검사 진행.
 */
@Injectable()
export class RegisterService implements RegisterInterface {
  constructor(
    @InjectRepository(User)
    private readonly registerRepository: Repository<User>,
    private readonly vaildationService: ValidationService,
  ) {}

  validateDTO(Data: PlayerDTO): boolean {
    return this.vaildationService.validateDTO(Data);
  }

  async insertToDatabase(Data: PlayerDTO): Promise<boolean> {
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
