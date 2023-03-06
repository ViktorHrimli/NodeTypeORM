import express from "express";
import { body } from "express-validator";
const route = express.Router();
import { Token, User } from "../controllers";

const cntrUser = new User();
const cntrToken = new Token();

route.post(
  "/signin",
  body("email").isEmail(),
  body("password").isLength({ max: 32, min: 3 }),
  cntrUser.signin
);
route.post("/signup", cntrUser.signup);
route.post("/logout", cntrUser.signout);
route.get("/activate/:link", cntrUser.isActive);
route.get("/refresh", cntrToken.refresh);
route.get("/users", cntrUser.getAll);

module.exports = route;
