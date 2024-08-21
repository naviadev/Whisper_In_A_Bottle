import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  password: string;
}
