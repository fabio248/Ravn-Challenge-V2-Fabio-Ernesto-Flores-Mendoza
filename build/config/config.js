import dotenv from "dotenv";
dotenv.config();
var config = {
    port: process.env.PORT,
    dbUrl: process.env.DATABASE_URL,
    secretJWT: process.env.SECRET_JWT,
};
export default config;
//# sourceMappingURL=config.js.map