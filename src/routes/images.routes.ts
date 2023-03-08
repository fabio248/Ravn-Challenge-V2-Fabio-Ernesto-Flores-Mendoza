import { Router } from 'express';
import fileUpload from 'express-fileupload';
import {
  fileExtLimiter,
  fileSizeLimiter,
  filesPayloadExists,
} from '../middlewares/file.handler';
import {
  createFolder,
  uploadImageByProduct,
} from '../controllers/images.controller';
import { validatorHandler } from '../middlewares/validator.handler';
import {
  createImageSchema,
  getImageByProductSchema,
} from '../schemas/images.schema';

const imagesRouter = Router();

imagesRouter.post(
  '/upload/:productId',
  fileUpload({ createParentPath: true }), // Middleware for handling file upload
  filesPayloadExists, // Custom middleware to check if files exist in request payload
  fileExtLimiter(['.png', '.jpg', '.jpeg']), // Custom middleware to check allowed file extensions
  fileSizeLimiter, // Custom middleware to check file size limit
  validatorHandler(getImageByProductSchema, 'params'), //Check productId comes in query params
  uploadImageByProduct
);

imagesRouter.post('/folder', createFolder);

export { imagesRouter };
