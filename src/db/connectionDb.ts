import { DataSource } from "typeorm";
import { Client } from "../entites/Client";
import { Banker } from "../entites/Banker";

module.exports = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "haobanjia",
  database: "typeorm",
  entities: [Client, Banker],
  synchronize: true,
  logger: "simple-console",
});
