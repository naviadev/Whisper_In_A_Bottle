import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'letter' })
export class Letter extends BaseEntity {
  @PrimaryGeneratedColumn()
  letterId: number;

  @Column({
    type: 'varchar',
    length: 500,
  })
  content: string;
}
