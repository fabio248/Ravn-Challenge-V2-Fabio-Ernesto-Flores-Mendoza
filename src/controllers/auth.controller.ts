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
    const { token } = authService.signToken(user);
    res.status(200).json({
      statusCode: '200',
      message: 'sign in sucessfull',
      data: user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const user = await authService.createUser(data);
    res
      .status(201)
      .json({ statusCode: '201', message: 'user created', data: user });
  } catch (error) {
    next(error);
  }
};
