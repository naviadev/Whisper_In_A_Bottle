import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'user_state' })
export class UserState extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column('bigint')
  receiveTime: number;

  @Column('bigint')
  lastLoginTime: number;

  @Column()
  lastLoginIp: string;
}
