import { Request, Response, NextFunction } from "express";
import bycrypt from "bcrypt";

import { UserService } from "../service";

const service = new UserService();

export class User {
  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const hashPassword = bycrypt.hashSync(password, 7);

      const user = await service.signin(email, hashPassword);

      res.status(200).json(user);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {}

  async signout(req: Request, res: Response, next: NextFunction) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allUsers = await service.getAll();

      res.status(200).send(allUsers);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async isActive(req: Request, res: Response, next: NextFunction) {}
}