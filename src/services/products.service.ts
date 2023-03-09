import { db } from '../utils/db/db.server';
import boom from '@hapi/boom';
import { dataProduct } from '../utils/types/product.types';
import { Prisma } from '@prisma/client';

interface FindAllOptions {
  offset?: number;
  limit?: number;
  categoryId?: number;
}

class ProductService {
  constructor() {}

  //Finds all users.
  async findAll(options?: FindAllOptions) {
    const query: Prisma.ProductFindManyArgs = {
      where: options.categoryId
        ? { categoryId: options.categoryId }
        : undefined,
      include: { images: true },
      skip: options.offset,
      take: options.limit,
    };
    const products = await db.product.findMany(query);
    if (products.length === 0) {
      throw boom.notFound('products not found');
    }
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
        stock: parseInt(dataProduct.stock),
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
