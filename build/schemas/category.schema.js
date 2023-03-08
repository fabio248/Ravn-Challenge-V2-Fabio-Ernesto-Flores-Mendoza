import Joi from 'joi';
var id = Joi.number().integer();
var name = Joi.string().min(3);
var description = Joi.string().min(15);
var createCategorySchema = Joi.object({
    name: name.required(),
    description: description.required(),
});
var updateCategorySchema = Joi.object({
    name: name,
    description: description,
});
var getCategorySchema = Joi.object({
    id: id.required(),
});
export { createCategorySchema, updateCategorySchema, getCategorySchema };
//# sourceMappingURL=category.schema.js.map