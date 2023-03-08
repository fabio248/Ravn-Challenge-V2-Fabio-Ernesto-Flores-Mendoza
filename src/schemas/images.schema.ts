import Joi from 'joi';

const id = Joi.number().integer();
const name = Joi.string().min(3);
const url = Joi.string().uri();
const productId = Joi.number().integer();

const createImageSchema = Joi.object({
  name: name.required(),
  url: url.required(),
});

const getImageByProductSchema = Joi.object({
  productId: productId.required(),
});

export { createImageSchema, getImageByProductSchema };
