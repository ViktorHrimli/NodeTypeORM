import express, { Express, Request, Response } from "express";
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app: Express = express();

const clientRoute = require("./routes/clientRoutes");
const bankerRoute = require("./routes/bankerRoute");
const transactionRoute = require("./routes/transaction");
const bankerClientRoute = require("./routes/bankerClientsRoute");
const deleteClients = require("./routes/deleteClient");
const authRoute = require("./routes/authRoute");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoute);
app.use("/api", clientRoute);
app.use("/api", bankerRoute);
app.use("/api", transactionRoute);
app.use("/api", bankerClientRoute);
app.use("/api", deleteClients);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not found", status: "Faild" });
});

app.use((req: Request, res: Response) => {
  res.status(500).json({ message: "Server ERROR", status: "Faild" });
});

module.exports = app;
