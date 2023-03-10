import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT,
  dbUrl: process.env.DATABASE_URL,
  secretJWT: process.env.SECRET_JWT,
  googleFolder: process.env.GOOGLE_API_FOLDER_ID,
  enviroment: process.env.NODE_ENV || 'development',
};

export default config;
