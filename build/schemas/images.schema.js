import Joi from 'joi';
var id = Joi.number().integer();
var name = Joi.string().min(3);
var url = Joi.string().uri();
var productId = Joi.number().integer();
var createImageSchema = Joi.object({
    name: name.required(),
    url: url.required(),
});
var getImageByProductSchema = Joi.object({
    productId: productId.required(),
});
export { createImageSchema, getImageByProductSchema };
//# sourceMappingURL=images.schema.js.map