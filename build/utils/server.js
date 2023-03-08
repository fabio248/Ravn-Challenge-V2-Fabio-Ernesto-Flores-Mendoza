import express from 'express';
import { boomErrorHandler, ormErrorHandler, } from '../middlewares/error.handler';
import { routerAPI } from '../routes';
function createServer() {
    var app = express();
    //Middleware to handle json
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    //All routes
    routerAPI(app);
    //Middlewares to handle differences errors
    app.use(boomErrorHandler);
    app.use(ormErrorHandler);
    return app;
}
export { createServer };
//# sourceMappingURL=server.js.map