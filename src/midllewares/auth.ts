import { Request, Response, NextFunction } from "express";
import { ApiErrors } from "../utils/ApiErrors";

import { TokenServices } from "../service/token";

interface IUserReq extends Request {
  user: any;
}

module.exports = async function (
  req: IUserReq,
  res: Response,
  next: NextFunction
) {
  try {
    const tokenServices = new TokenServices();
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      return next(ApiErrors.UnautorizationError());
    }

    const tokenAccsses = authHeaders.split(" ")[1];

    if (!tokenAccsses) {
      return next(ApiErrors.UnautorizationError());
    }

    const dataToken = await tokenServices.validateAccssesToken(tokenAccsses);

    if (!dataToken) {
      return next(ApiErrors.UnautorizationError());
    }

    req.user = dataToken;

    next();
  } catch (error) {
    return next(ApiErrors.UnautorizationError());
  }
};
