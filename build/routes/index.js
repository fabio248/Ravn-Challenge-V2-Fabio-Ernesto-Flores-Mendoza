import { Router } from 'express';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';
import passport from 'passport';
import { checkRoles } from '../middlewares/auth.handler';
import { imagesRouter } from './images.routes';
import { productRouter } from './product.routes';
import { categoryRouter } from './category.routes';
function routerAPI(app) {
    var router = Router();
    app.use('/api', router);
    router.use('/auth', authRouter);
    router.use('/users', passport.authenticate('jwt', { session: false }), checkRoles('MANAGER'), userRouter);
    router.use('/images', imagesRouter);
    router.use('/products', productRouter);
    router.use('/categories', categoryRouter);
}
export { routerAPI };
//# sourceMappingURL=index.js.map