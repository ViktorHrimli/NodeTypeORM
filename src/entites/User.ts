import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { Base } from "../utils/BaseClass";

@Entity("users")
export class User extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActivated: boolean;

  @Column({ nullable: true })
  activationLink: string;
}
