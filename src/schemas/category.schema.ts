import Joi from 'joi';

const id = Joi.number().integer();
const name = Joi.string().min(3);
const description = Joi.string().min(15);

const createCategorySchema = Joi.object({
  name: name.required(),
  description: description.required(),
});

const updateCategorySchema = Joi.object({
  name,
  description,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

export { createCategorySchema, updateCategorySchema, getCategorySchema };
