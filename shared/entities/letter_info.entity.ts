import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "letter_info" })
export class LetterInfo extends BaseEntity {
  @PrimaryColumn()
  letter_id: number;

  @Column()
  user_id: string;

  @Column("date")
  time: Date;

  @Column()
  is_send: boolean;
}
