import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('letter_state')
export class LetterState extends BaseEntity {
  @PrimaryColumn()
  letterId: number;

  @Column()
  receiverId: string;

  @Column()
  senderId: string;

  @Column('bigint')
  sendTime: number;
}
