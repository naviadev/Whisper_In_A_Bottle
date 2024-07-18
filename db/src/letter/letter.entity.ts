import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'letter' })
export class Letter extends BaseEntity {
  @PrimaryColumn()
  letterId: string;

  @Column({
    type: 'varchar',
    length: 500,
  })
  content: string;
}
