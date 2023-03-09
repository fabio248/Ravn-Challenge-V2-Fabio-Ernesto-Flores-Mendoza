import { Router } from 'express';
import { validatorHandler } from '../middlewares/validator.handler';
import { addProductSchema, createCartSchema } from '../schemas/cart.schema';
import { addProdutInCart, createCart } from '../controllers/cart.controller';
import passport from 'passport';
import { checkRoles } from '../middlewares/auth.handler';

const cartRouter = Router();

cartRouter.post(
  '/',

  validatorHandler(createCartSchema, 'body'),
  createCart
);

cartRouter.post(
  '/addProduct',
  validatorHandler(addProductSchema, 'body'),
  addProdutInCart
);
export { cartRouter };
