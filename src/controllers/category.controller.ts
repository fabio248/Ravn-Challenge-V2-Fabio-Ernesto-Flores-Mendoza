import { NextFunction, Request, Response } from 'express';
import { CategoryService } from '../services/categories.service';

const categoryService = new CategoryService();
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const category = await categoryService.create(data);
    res
      .status(201)
      .json({ statusCode: 201, message: 'created category', data: category });
  } catch (error) {
    next(error);
  }
};
