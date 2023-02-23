import exress from "express";

import { Banker } from "../entites/Banker";

const route = exress.Router();

route.get("/banker", async (req, res) => {
  const banker = await Banker.getRepository().find();

  res.json(banker);
});

route.get("/banker/:id", async (req, res) => {
  const banker = await Banker.getRepository().findOneBy({
    id: +req.params.id,
  });

  res.json(banker);
});

route.post("/banker", async (req, res) => {
  const { firstName, email, balance, emploeeNumber } = req.body;

  const newBanker = Banker.create({
    first_name: firstName,
    email,
    balance,
    employe_number: emploeeNumber,
  });

  await newBanker.save();

  res.json(newBanker);
});

module.exports = route;
