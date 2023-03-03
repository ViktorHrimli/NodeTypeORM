import { Request, Response, NextFunction } from "express";
import { ApiErrors } from "../utils/ApiErrors";

export const errorsHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiErrors) {
    res.status(err.status).json({ message: err.message, errors: err.errors });
  }
};
