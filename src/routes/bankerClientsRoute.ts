import express from "express";
import { Banker } from "../entites/Banker";
import { Client } from "../entites/Client";

const route = express.Router();

route.put("/banker/:banker_id/client/:client_id", async (req, res) => {
  const { banker_id, client_id } = req.params;

  console.log(banker_id, client_id);

  const banker = await Banker.findOneBy({ id: Number(banker_id) });
  const client = await Client.findOneBy({ id: Number(client_id) });

  if (banker && client) {
    banker.clients = [client];
    await banker.save();
    res.json({
      msg: "banker connected to client",
    });
  } else {
    res.json("Client or Banker not found");
  }
});

module.exports = route;
