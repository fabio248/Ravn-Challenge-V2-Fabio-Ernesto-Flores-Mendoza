import dotenv from 'dotenv';
dotenv.config();
var config = {
    port: process.env.PORT,
    dbUrl: process.env.DATABASE_URL,
    secretJWT: process.env.SECRET_JWT,
    googleFolder: process.env.GOOGLE_API_FOLDER_ID,
};
export default config;
//# sourceMappingURL=config.js.map