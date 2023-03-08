import Joi from 'joi';
var id = Joi.number().integer();
var name = Joi.string().min(3);
var description = Joi.string().min(15);
var price = Joi.number();
var isEnable = Joi.boolean();
var categoryId = Joi.number();
var folderId = Joi.string();
var urlFolder = Joi.string();
var createProductSchema = Joi.object({
    name: name.required(),
    description: description.required(),
    price: price.required(),
    categoryId: categoryId.required(),
    isEnable: isEnable,
    folderId: folderId,
    urlFolder: urlFolder,
});
var updateProductSchema = Joi.object({
    id: id,
    name: name,
    description: description,
    price: price,
    isEnable: isEnable,
    categoryId: categoryId,
    folderId: folderId,
    urlFolder: urlFolder,
});
var getProductSchema = Joi.object({
    id: id.required(),
});
var getProductByCategorySchema = Joi.object({
    categoryId: categoryId.required(),
});
export { createProductSchema, updateProductSchema, getProductSchema, getProductByCategorySchema, };
//# sourceMappingURL=product.schema.js.map