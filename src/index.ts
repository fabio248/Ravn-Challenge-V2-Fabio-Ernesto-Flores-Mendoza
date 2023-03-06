import express, { Application, Request, Response } from "express";
import config from "./config/config";
import { routerAPI } from "./routes";
import { boomErrorHandler, ormErrorHandler } from "./middlewares/error.handler";

const app: Application = express();
app.use(express.json());
routerAPI(app);

app.use(boomErrorHandler);
app.use(ormErrorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
