import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { dataUser } from '../utils/types/user.types';

//Middleware function to check user roles against the roles passed as arguments.
function checkRoles(...roles) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user: dataUser = req.user;
    if (roles.includes(user.role)) next();
    else next(boom.unauthorized());
  };
}
