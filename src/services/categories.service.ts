import boom from '@hapi/boom';
import { db } from '../utils/db/db.server';
import { dataCategory } from '../utils/types/category.types';

class CategoryService {
  constructor() {}

  //Finds all users.
  async findAll() {
    const categories = db.category.findMany();
    return categories;
  }
  //Finds a user by id.
  async findOne(id: number) {
    const foundCategory = await db.category.findUnique({
      where: {
        id,
      },
    });
    if (!foundCategory) throw boom.notFound('category not found');
    return foundCategory;
  }

  async create(dataCategory: dataCategory) {
    const { name, description } = dataCategory;
    const newCategory = await db.category.create({
      data: { name, description },
    });
    return newCategory;
  }
  async update(id: number, changes: dataCategory) {
    const updatedCategory = await db.product.update({
      where: { id },
      data: changes,
    });
    if (!updatedCategory) throw boom.notFound('category not found');
    return updatedCategory;
  }

  async delete(id: number) {
    await this.findOne(id);
    const deletedCategory = await db.category.delete({
      where: { id },
    });

    return deletedCategory;
  }
}

export { CategoryService };
