import { db } from '../utils/db/db.server';
import boom from '@hapi/boom';
import { dataProduct } from '../utils/types/product.types';
import { dataImage } from '../utils/types/images.types';

class ProductService {
  constructor() {}

  //Finds all users.
  async findAll(offset, limit, categoryId) {
    let products;
    let options = {};
    let intCategoryId = parseInt(categoryId);
    if (offset || limit) {
      const startIndex = parseInt(offset) || 0;
      const endIndex = parseInt(limit) || 10;
      categoryId
        ? (options = {
            skip: startIndex,
            take: endIndex,
            where: { categoryId: intCategoryId },
            include: { images: true },
          })
        : (options = {
            skip: startIndex,
            take: endIndex,
            include: { images: true },
          });
      products = await db.product.findMany(options);
    } else {
      categoryId
        ? (options = {
            where: { categoryId: intCategoryId },
            include: { images: true },
          })
        : (options = {
            include: { images: true },
          });
      products = await db.product.findMany(options);
    }
    if (products.length <= 0) throw boom.notFound('products not found');
    return products;
  }

  //Finds a user by id.
  async findOne(id: number) {
    const foundProduct = await db.product.findUnique({
      where: {
        id,
      },
      include: { images: true },
    });
    if (!foundProduct) throw boom.notFound('product not found');
    return foundProduct;
  }

  async create(dataProduct, imagesData) {
    const newProduct = await db.product.create({
      data: {
        ...dataProduct,
        categoryId: parseInt(dataProduct.categoryId),
        images: {
          create: imagesData,
        },
      },
      include: { images: true },
    });

    return newProduct;
  }
  async update(id: number, changes: dataProduct) {
    const updatedProduct = await db.product.update({
      where: { id },
      data: changes,
    });
    if (!updatedProduct) throw boom.notFound('product not found');
    return updatedProduct;
  }

  async delete(id: number) {
    //Verify if the product exists
    await this.findOne(id);
    const deletedProduct = await db.product.delete({
      where: { id },
    });

    return deletedProduct;
  }
}

export { ProductService };
