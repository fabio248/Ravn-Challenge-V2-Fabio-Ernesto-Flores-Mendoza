import Joi from 'joi';

const id = Joi.number().integer();
const quantity = Joi.number().integer().positive();
const productId = Joi.number().integer();
const cartId = Joi.number().integer();
const userId = Joi.number().integer();

const createCartSchema = Joi.object({
  userId,
});

const addProductSchema = Joi.object({
  quantity: quantity.required(),
  productId: productId.required(),
});

export { createCartSchema, addProductSchema };
