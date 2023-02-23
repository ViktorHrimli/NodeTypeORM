import { Entity, Column, ManyToMany, JoinTable } from "typeorm";

import { Person } from "../utils/Person";
import { Client } from "./Client";

@Entity("banker")
export class Banker extends Person {
  @Column({ length: 10, unique: true })
  employe_number: string;

  @Column({ type: "numeric" })
  balance: number;

  @ManyToMany(() => Client)
  @JoinTable({
    name: "bankers_clients",
    joinColumn: {
      name: "banker",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "client",
      referencedColumnName: "id",
    },
  })
  clients: Client[];
}
