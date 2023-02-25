import { DataSource } from "typeorm";

import { Banker, Client, Token, Transaction, User } from "../entites";

module.exports = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "haobanjia",
  database: "typeorm",
  entities: [Client, Banker, Transaction, Token, User],
  synchronize: true,
  logger: "simple-console",
});
