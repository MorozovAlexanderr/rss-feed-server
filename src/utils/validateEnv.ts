import { cleanEnv, port, str } from 'envalid';

export const validateEnv = () => {
  cleanEnv(process.env, {
    PORT: port(),
    JWT_SECRET: str(),
    JWT_EXPIRATION: str(),
    DB_MONGO_USER: str(),
    DB_MONGO_PASSWORD: str(),
    DB_MONGO_PATH: str(),
  });
};
