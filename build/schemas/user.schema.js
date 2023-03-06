import Joi from "joi";
var id = Joi.number().integer();
var name = Joi.string().min(3);
var lastName = Joi.string().min(3);
var email = Joi.string().email();
var password = Joi.string().alphanum().min(8);
var role = Joi.string();
var createUserSchema = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    email: email.required(),
    password: password.required(),
    role: role,
});
var updateUserSchema = Joi.object({
    name: name,
    lastName: lastName,
    email: email,
    password: password,
    role: role,
});
var getUserSchema = Joi.object({
    id: id.required(),
});
export { createUserSchema, updateUserSchema, getUserSchema };
//# sourceMappingURL=user.schema.js.map