import express, { Application } from 'express';
import {
  boomErrorHandler,
  ormErrorHandler,
} from '../middlewares/error.handler';
import { routerAPI } from '../routes';
function createServer() {
  const app: Application = express();
  //Middleware to handle json
  app.use(express.json());
  //All routes
  routerAPI(app);
  //Middlewares to handle differences errors
  app.use(boomErrorHandler);
  app.use(ormErrorHandler);

  return app;
}

export { createServer };
