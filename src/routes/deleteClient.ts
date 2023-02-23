import express from "express";
import { Client } from "../entites/Client";

const route = express.Router();

route.delete("/delete/client/:id", async (req, res) => {
  await Client.delete(parseFloat(req.params.id));

  res.json({ message: "Client delete succsses." });
});

module.exports = route;
