import express from "express";
import config from "./config/config";
import { routerAPI } from "./routes";
import { boomErrorHandler, ormErrorHandler } from "./middlewares/error.handler";
var app = express();
app.use(express.json());
routerAPI(app);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.listen(config.port, function () {
    console.log("Server running on port ".concat(config.port));
});
//# sourceMappingURL=index.js.map