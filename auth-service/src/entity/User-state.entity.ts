import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm';
// import { User } from './User.entity';

@Entity({ name: 'user_state' })
export class UserState extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column('bigint')
  receive_time: number;

  @Column('bigint')
  last_login_time: number;

  @Column()
  last_login_ip: string;

  // @OneToOne(() => User, (user) => user.userState)
  // user: User;
}
