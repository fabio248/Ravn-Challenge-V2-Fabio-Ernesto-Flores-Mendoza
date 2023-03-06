export function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        var output = err.output;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}
export function ormErrorHandler(err, req, res, next) {
    res.json(err);
}
export function errorHandler(err, req, res, next) {
    res.status(err.statusCode || 500).json({ message: err });
    next();
}
//# sourceMappingURL=error.handler.js.map