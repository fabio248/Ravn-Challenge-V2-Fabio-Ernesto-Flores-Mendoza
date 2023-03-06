import { Router } from 'express';
import passport from 'passport';
import { login } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login
);

export { authRouter };
