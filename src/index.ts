import express, { Express, Request, Response } from "express";
const cors = require("cors");

require("dotenv").config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found", status: "Faild" });
});

app.use((req: Request, res: Response) => {
  res.status(500).json({ message: "Server ERROR", status: "Faild" });
});

module.exports = app;
