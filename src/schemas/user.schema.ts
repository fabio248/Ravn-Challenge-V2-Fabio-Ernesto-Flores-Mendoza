import Joi from 'joi';

const id = Joi.number().integer();
const name = Joi.string().min(3);
const lastName = Joi.string().min(3);
const email = Joi.string().email();
const password = Joi.string().alphanum().min(8);
const role = Joi.string();

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  role: role,
});

const updateUserSchema = Joi.object({
  name,
  lastName,
  email,
  password,
  role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

export { createUserSchema, updateUserSchema, getUserSchema };
