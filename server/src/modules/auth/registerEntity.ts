import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * * Decorator : Entity
 * 작성자 : @naviadev / 2024-07-16
 * 편집자 : @naviadev / 2024-07-16
 * Issue : WIB-14
 * @class RegisterEntity
 * @description : 기본키 id,
 */
@Entity()
export class RegisterEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  password: string;
}
