import express from "express";
import { Client } from "../entites/Client";
import { Transaction, TransactionType } from "../entites/Transaction";
const route = express.Router();

route.post("/transaction/:client_id", async (req, res) => {
  const id = parseFloat(req.params.client_id);
  const { type, amount }: { type: string; amount: number } = req.body;

  const client = await Client.findOneBy({ id });

  if (!client) {
    res.json({ message: "Client not found!" });
  }

  const transaction = await Transaction.create<any>({
    amount,
    type,
    client,
  });

  transaction.save();

  const balance_number = Number(client?.balance);

  if (type === TransactionType.DEPOSIT) {
    client!.balance = balance_number + amount;
  } else if (type === TransactionType.WITHDRAW) {
    client!.balance -= balance_number - amount;
  }

  client?.save();

  res.json(client);
});

route.get("/transaction", async (req, res) => {
  const transaction = await Transaction.find();

  res.json(transaction);
});

module.exports = route;
