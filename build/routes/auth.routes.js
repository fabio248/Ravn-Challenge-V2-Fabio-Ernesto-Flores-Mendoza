import { Router } from "express";
import passport from "passport";
import { login } from "../controllers/auth.controller";
var authRouter = Router();
authRouter.post("/login", passport.authenticate("local", { session: false }), login);
export { authRouter };
//# sourceMappingURL=auth.routes.js.map