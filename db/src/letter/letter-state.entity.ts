import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class LetterState extends BaseEntity {
  @PrimaryColumn()
  letterId: number;

  @Column()
  receiverId: string;

  @Column()
  senderId: string;

  @Column('bigint')
  sendTime: Date;
}
