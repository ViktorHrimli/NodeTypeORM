import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

import { Base } from "../utils/BaseClass";

@Entity("token")
export class Token extends Base {
  @Column()
  refreshToken: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
