import { DataSource } from "typeorm";
import { Client } from "../entites/Client";
import { Banker } from "../entites/Banker";
import { Transaction } from "../entites/Transaction";

module.exports = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "haobanjia",
  database: "typeorm",
  entities: [Client, Banker, Transaction],
  synchronize: true,
  logger: "simple-console",
});
