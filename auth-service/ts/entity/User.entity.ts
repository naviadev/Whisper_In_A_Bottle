import { Entity, Column, PrimaryColumn } from 'typeorm';
import TABLE from 'ts/enums/TABLE_NAME.enum';
@Entity(TABLE.__USER)
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;
}
export default User;
