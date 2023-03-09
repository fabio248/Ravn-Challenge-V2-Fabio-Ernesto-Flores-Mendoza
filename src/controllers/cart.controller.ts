import { NextFunction, Request, Response } from 'express';
import { CartService } from '../services/cart.service';

const cartService = new CartService();

export const createCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const cart = await cartService.create(user);
    res
      .status(201)
      .json({ statusCode: 201, message: 'created cart', data: cart });
  } catch (error) {
    next(error);
  }
};
export const addProdutInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const user = req.user;
    const productInCart = await cartService.addProduct(data, user);
    res.status(201).json({
      statusCode: 201,
      message: 'product added cart',
      data: productInCart,
    });
  } catch (error) {
    next(error);
  }
};
