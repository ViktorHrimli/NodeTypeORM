import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bycrypt from "bcrypt";

import { UserService } from "../service";
import { ApiErrors } from "../utils/ApiErrors";

const service = new UserService();

export class User {
  async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(
          ApiErrors.BadRequest(
            "Validation errors check fields!",
            errors.array()
          )
        );
      }

      const hashPassword = bycrypt.hashSync(password, 7);

      const user = await service.signin(email, hashPassword);

      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await service.signup(email, password);

      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async signout(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.cookies;
    const token = await service.signout(refreshToken);
    res.clearCookie("refreshToken");

    res.status(200).json(token);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const allUsers = await service.getAll();

      res.status(200).send(allUsers);
    } catch (error) {
      next(error);
    }
  }
  async isActive(req: Request, res: Response, next: NextFunction) {
    try {
      await service.isActive(req.params.link);

      res.status(200).json({ message: "OK" });
    } catch (error) {
      next(error);
    }
  }
}
