import boom from '@hapi/boom';
//Middleware function to check user roles against the roles passed as arguments.
export function checkRoles() {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return function (req, res, next) {
        var user = req.user;
        if (roles.includes(user.role.toString()))
            next();
        else
            next(boom.unauthorized());
    };
}
//# sourceMappingURL=auth.handler.js.map