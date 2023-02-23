import { Entity, Column, OneToMany, ManyToMany } from "typeorm";

import { Person } from "../utils/Person";
import { Banker } from "./Banker";
import { Transaction } from "./Transaction";

enum ClientStatus {
  STANDART = "standart",
  BISSNES = "BISSNES",
  VIP = "VIP",
}

@Entity("client")
export class Client extends Person {
  @Column({ default: true, name: "active" })
  is_active: boolean;

  @Column({ length: 10 })
  client_card: string;

  @Column({ type: "numeric" })
  balance: number;

  @Column({ type: "enum", enum: ClientStatus, default: ClientStatus.STANDART })
  status: string;

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @ManyToMany(() => Banker, { cascade: true })
  bankers: Banker[];
}
