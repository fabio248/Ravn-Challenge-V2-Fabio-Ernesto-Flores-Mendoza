import { Router } from "express";
import { userRouter } from "./user.routes";
import { authRouter } from "./auth.routes";
function routerAPI(app) {
    var router = Router();
    app.use("/api", router);
    router.use("/auth", authRouter);
    router.use("/users", userRouter);
}
export { routerAPI };
//# sourceMappingURL=index.js.map