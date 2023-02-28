import { Token } from "../entites";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

import { Base } from "../utils/BaseClass";

@Entity("users")
export class Users extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isActivated: boolean;

  @Column({ nullable: true })
  activationLink: string;

  @OneToOne(() => Token, (token) => token.users_id, { cascade: true })
  token: Token;
}
