import type { Boom } from "@hapi/boom";
import type { Request, Response, NextFunction } from "express";

export type ErrorHandler = (
  error: Boom | unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;
