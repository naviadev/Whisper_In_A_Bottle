import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  password: string;
}
export default User;
