import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('letter_state')
export class LetterState extends BaseEntity {
  @PrimaryColumn()
  letter_id: number;

  @Column()
  receiver_id: string;

  @Column()
  sender_id: string;

  @Column('bigint')
  send_time: number;
}
