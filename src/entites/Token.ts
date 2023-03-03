import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { Users } from "./Users";

import { Base } from "../utils/BaseClass";

@Entity("token")
export class Token extends Base {
  @Column()
  refreshToken: string;

  @OneToOne(() => Users)
  @JoinColumn()
  owner: Users;
}
