import { BaseEntity, Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';
import { User } from './User.entity';

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

  @OneToOne(() => User, (user) => user.userState)
  user: User;
}
