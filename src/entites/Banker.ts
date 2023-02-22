import { Entity, Column } from "typeorm";

import { Person } from "../utils/Person";

@Entity("banker")
export class Banker extends Person {
  @Column({ default: true, name: "active" })
  is_active: boolean;

  @Column({ unique: true, length: 10 })
  client_card: string;

  @Column({ length: 10, unique: true })
  employe_number: string;

  @Column({ type: "numeric" })
  balance: number;
}
