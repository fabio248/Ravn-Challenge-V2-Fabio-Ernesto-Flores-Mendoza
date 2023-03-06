import { Router } from 'express';
import { validatorHandler } from '../middlewares/validator.handler';
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from '../controllers/user.controller';
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../schemas/user.schema';

const userRouter = Router();

userRouter.get('/', listUsers);
userRouter.get('/:id', validatorHandler(getUserSchema, 'params'), getUser);
userRouter.post('/', validatorHandler(createUserSchema, 'body'), createUser);
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
