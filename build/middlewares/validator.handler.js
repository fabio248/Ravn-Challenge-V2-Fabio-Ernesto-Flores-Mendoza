import boom from "@hapi/boom";
export function validatorHandler(schema, property) {
    return function (req, res, next) {
        var data = req[property];
        var error = schema.validate(data, { abortEarly: false }).error;
        if (error)
            next(boom.badRequest("".concat(error.name, ": ").concat(error.message)));
        next();
    };
}
//# sourceMappingURL=validator.handler.js.map