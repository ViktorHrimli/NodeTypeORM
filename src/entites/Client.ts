import { Entity, Column } from "typeorm";

import { Person } from "../utils/Person";

enum ClientStatus {
  STANDART = "standart",
  BISSNES = "BISSNES",
  VIP = "VIP",
}

@Entity("client")
export class Client extends Person {
  @Column({ default: true, name: "active" })
  is_active: boolean;

  @Column({ unique: true, length: 10 })
  client_card: string;

  @Column({ type: "numeric" })
  balance: number;

  @Column({ type: "enum", enum: ClientStatus, default: ClientStatus.STANDART })
  status: string;
}
