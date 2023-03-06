import { Router, Application } from 'express';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';
import passport from 'passport';
import { checkRoles } from '../middlewares/auth.handler';

function routerAPI(app: Application) {
  const router = Router();

  app.use('/api', router);
  router.use('/auth', authRouter);
  router.use(
    '/users',
    passport.authenticate('jwt', { session: false }),
    checkRoles('MANAGER'),
    userRouter
  );
}

export { routerAPI };
