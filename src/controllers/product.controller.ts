import { NextFunction, Request, Response } from 'express';
import { ProductService } from '../services/products.service';
import { dataProduct } from '../utils/types/product.types';
import { ImagesService } from '../services/images.service';

const productService = new ProductService();
const imageService = new ImagesService();

export const listProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { offset, limit, categoryId } = req.query;
    const products = await productService.findAll(offset, limit, categoryId);

    res.json({ status: '200', message: 'products found', data: products });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await productService.findOne(parseInt(id));
    res.json({ statusCode: '200', message: 'product found', data: product });
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productInfo = req.body;
    const files = Object.values(req.files).flat();
    //Create folder to save product's images
    const { id, name, webViewLink } = await imageService.folder(
      `${Date.now()}-${productInfo.name}`
    );
    //Upload images to product's folder
    const responseImages = await imageService.upload(files, id);
    //Create entity in database
    const newProduct = await productService.create(
      {
        ...productInfo,
        folderId: id,
        urlFolder: webViewLink,
      },
      responseImages
    );
    res.status(201).json({
      statusCode: 201,
      message: 'created new product',
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const changes: dataProduct = req.body;
    const updatedProduct = await productService.update(parseInt(id), changes);
    res.json({
      statusCode: '200',
      message: 'product updated',
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.delete(parseInt(id));
    res.json({
      statusCode: '200',
      message: 'product deleted',
      data: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};
