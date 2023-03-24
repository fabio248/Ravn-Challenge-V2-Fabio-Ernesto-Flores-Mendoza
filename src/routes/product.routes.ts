import { Router } from 'express';
import { validatorHandler } from '../middlewares/validator.handler';
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from '../controllers/product.controller';
import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} from '../schemas/product.schema';
import fileUpload from 'express-fileupload';
import {
  fileExtLimiter,
  fileSizeLimiter,
  filesPayloadExists,
} from '../middlewares/file.handler';
import { checkRoles } from '../middlewares/auth.handler';
import passport from 'passport';

const productRouter = Router();

productRouter.get('/', listProducts);
productRouter.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  getProduct
);
productRouter.post(
  '/',
  fileUpload({ createParentPath: true }), // Middleware for handling file upload
  filesPayloadExists, // Custom middleware to check if files exist in request payload
  fileExtLimiter(['.png', '.jpg', '.jpeg']), // Custom middleware to check allowed file extensions
  fileSizeLimiter, // Custom middleware to check file size limit
  validatorHandler(createProductSchema, 'body'),
  passport.authenticate('jwt', { session: false }), //Check if autenticated
  checkRoles('MANAGER'), //Check if manager user
  createProduct
);
productRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('MANAGER'),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  updateProduct
);
productRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('MANAGER'),
  validatorHandler(getProductSchema, 'params'),
  deleteProduct
);

export { productRouter };
