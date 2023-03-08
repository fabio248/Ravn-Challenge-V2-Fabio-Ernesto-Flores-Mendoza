import { NextFunction, Request, Response } from 'express';
import { ImagesService } from '../services/images.service';
import config from '../config/config';

const imageService = new ImagesService();
export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files;
    const response = await imageService.upload(files, config.googleFolder);

    res.json({
      statusCode: '200',
      message: Object.keys(files).toString(),
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
export const uploadImageByProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files;
    console.log({ files });
    const { productId } = req.params;
    //Upload images google Drive
    const uploadedImages = await imageService.uploadByProduct(
      files,
      parseInt(productId)
    );
    //Put product id
    uploadedImages.forEach((image) => (image.productId = parseInt(productId)));
    const response = await imageService.create(uploadedImages);
    res.json({
      statusCode: '200',
      message: Object.keys(files).toString(),
      data: { imageCreated: response },
    });
  } catch (error) {
    next(error);
  }
};

export const createFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { folderName } = req.body;
    const response = await imageService.folder(folderName);
    res.json({
      statusCode: '200',
      message: 'folder created',
      data: response,
    });
  } catch (error) {}
};
