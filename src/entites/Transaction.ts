import { Base } from "../utils/BaseClass";
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Client } from "./Client";

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

@Entity("transaction")
export class Transaction extends Base {
  @Column({ type: "enum", enum: TransactionType })
  type: string;

  @Column({ type: "numeric" })
  amount: number;

  @ManyToOne(() => Client, (client) => client.transactions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "client_id" })
  client: Client;
}
