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
    res.json({ statusCode: '200', message: 'users founds', users });
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
    res.json({ statusCode: '200', message: 'user found', user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    console.log(req.body);
    const user = await userService.create(data);
    res.status(201).json({ statusCode: '201', message: 'user created', user });
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
    res.json({ statusCode: '200', message: 'user updated', user });
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
    res.json({ statusCode: '200', message: 'user deleted', user });
  } catch (error) {
    next(error);
  }
};
