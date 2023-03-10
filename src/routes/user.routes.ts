import { Router } from 'express';
import { validatorHandler } from '../middlewares/validator.handler';
import {
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from '../controllers/user.controller';
import { getUserSchema, updateUserSchema } from '../schemas/user.schema';

const userRouter = Router();

userRouter.get('/', listUsers);
userRouter.get('/:id', validatorHandler(getUserSchema, 'params'), getUser);

userRouter.put(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);
userRouter.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  deleteUser
);
export { userRouter };
