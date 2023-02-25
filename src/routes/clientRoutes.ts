import exress from "express";
import { createQueryBuilder } from "typeorm";

import { Client } from "../entites/Client";

const route = exress.Router();

route.get("/client", async (req, res) => {
  const client = await Client.find();
  // const client = await createQueryBuilder(Client, "client")
  //   .select("email")
  //   .from(Client, "client")
  //   .where("client.id = :client_id", { id: 2 })
  //   .getOne();

  res.json(client);
});

route.get("/client/:id", async (req, res) => {
  const client = await Client.findOneBy({ id: +req.params.id });

  res.json(client);
});

route.post("/client", async (req, res) => {
  const { firstName, email, balance, cardNumber } = req.body;
  const newClient = Client.create({
    first_name: firstName,
    email,
    balance,
    client_card: cardNumber,
  });

  await newClient.save();

  res.json(newClient);
});

module.exports = route;
