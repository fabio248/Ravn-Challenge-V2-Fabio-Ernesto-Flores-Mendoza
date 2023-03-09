import Joi from 'joi';

const id = Joi.number().integer();
const name = Joi.string().min(3);
const description = Joi.string().min(15);
const price = Joi.number();
const isEnable = Joi.boolean();
const categoryId = Joi.number();
const folderId = Joi.string();
const urlFolder = Joi.string();
const stock = Joi.number();

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  categoryId: categoryId.required(),
  stock: stock.required(),
  isEnable,
  folderId,
  urlFolder,
});

const updateProductSchema = Joi.object({
  id,
  name,
  description,
  price,
  isEnable,
  categoryId,
  folderId,
  urlFolder,
});

const getProductSchema = Joi.object({
  id: id.required(),
});
const getProductByCategorySchema = Joi.object({
  categoryId: categoryId.required(),
});

export {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  getProductByCategorySchema,
};
