import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm'; // TypeORM 데코레이터와 클래스들을 가져옵니다.

/**
 * * 데이터베이스 테이블 plyer (name) 에 매핑한다.
 */
@Entity({ name: 'user_state' })
export class UserState extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @Column('bigint')
  receiveTime: number;

  @Column('bigint')
  lastLoginTime: number;

  @Column()
  lastLoginIp: string;
}
