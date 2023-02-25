import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

import { Base } from "../utils/BaseClass";

@Entity("tokens")
export class Token extends Base {
  @Column()
  refreshToken: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: number;
}
