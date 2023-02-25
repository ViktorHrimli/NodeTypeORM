import { Request, Response, NextFunction } from "express";

export class Token {
  refresh(req: Request, res: Response, next: NextFunction) {}
  accsses(req: Request, res: Response, next: NextFunction) {}
}
