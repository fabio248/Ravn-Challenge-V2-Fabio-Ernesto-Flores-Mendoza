import { Router, Application } from 'express';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';
import passport from 'passport';
import { checkRoles } from '../middlewares/auth.handler';
import { imagesRouter } from './images.routes';
import { productRouter } from './product.routes';
import { categoryRouter } from './category.routes';
import { cartRouter } from './cart.routes';

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
  router.use('/images', imagesRouter);
  router.use('/products', productRouter);
  router.use('/categories', categoryRouter);
  router.use(
    '/cart',
    passport.authenticate('jwt', { session: false }),
    checkRoles('CLIENT'),
    cartRouter
  );
}

export { routerAPI };
