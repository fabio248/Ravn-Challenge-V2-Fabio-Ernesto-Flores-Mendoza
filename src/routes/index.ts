import { Router, Request, Response, Application } from 'express';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';

function routerAPI(app: Application) {
  const router = Router();

  app.use('/api', router);
  router.use('/auth', authRouter);
  router.use('/users', userRouter);
}

export { routerAPI };
