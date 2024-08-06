import { Entity, Column, PrimaryColumn } from 'typeorm';
// import { UserState } from './User-state.entity';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;

  // @OneToOne(() => UserState, (userState) => userState.user)
  // @JoinColumn({ name: 'id' })
  // user_state: UserState;
}
