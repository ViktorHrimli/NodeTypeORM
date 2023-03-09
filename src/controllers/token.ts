const cookieParser = require("cookie-parser");

import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/users";

export class Token {
  async refresh(req: Request, res: Response, next: NextFunction) {
    const user = new UserService();
    const { refreshToken } = req.cookies;

    const token = await user.refreshToken(refreshToken);

    res.status(200).json(token);
  }
  accsses(req: Request, res: Response, next: NextFunction) {}
}
