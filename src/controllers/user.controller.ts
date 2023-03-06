import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/users.service';

const userService = new UserService();

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.findAll();
    res.json({ status: '200', message: 'users founds', data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userService.findOne(parseInt(id));
    res.json({ status: '200', message: 'user found', data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const user = await userService.update(parseInt(id), changes);
    res.json({ status: '200', message: 'user updated', data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userService.delete(parseInt(id));
    res.json({ status: '200', message: 'user deleted', data: user });
  } catch (error) {
    next(error);
  }
};
