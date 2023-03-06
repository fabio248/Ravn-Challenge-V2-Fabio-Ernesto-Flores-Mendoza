import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    res.json(authService.signToken(user));
  } catch (error) {
    next(error);
  }
};
