import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export function validatorHandler(schema: Joi.ObjectSchema, property: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property as keyof typeof req];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) next(boom.badRequest(`${error.name}: ${error.message}`));
    next();
  };
}
