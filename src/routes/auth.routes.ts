import { Router } from 'express';
import passport from 'passport';
import { login, registerUser } from '../controllers/auth.controller';
import { validatorHandler } from '../middlewares/validator.handler';
import { createUserSchema } from '../schemas/user.schema';

const authRouter = Router();

authRouter.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  login
);

authRouter.post(
  '/signup',
  validatorHandler(createUserSchema, 'body'),
  registerUser
);

export { authRouter };
