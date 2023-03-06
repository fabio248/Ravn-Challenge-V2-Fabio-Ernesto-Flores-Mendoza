import { Response, Request, NextFunction } from "express";
import { Boom } from "@hapi/boom";
import { Prisma } from "@prisma/client";

type errorORM = typeof Prisma.PrismaClientKnownRequestError;

export function boomErrorHandler(
  err: Boom<any>,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

export function ormErrorHandler(
  err: errorORM,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.json(err);
}

export function errorHandler(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.statusCode || 500).json({ message: err });
  next();
}
