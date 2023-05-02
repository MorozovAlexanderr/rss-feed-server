declare global {
  namespace Express {
    interface Request {
      context: any;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      JWT_SECRET: string;
      JWT_EXPIRATION: string;
      DB_MONGO_USER: string;
      DB_MONGO_PASSWORD: string;
      DB_MONGO_PATH: string;
      RSS_RESOURCE_URL: string;
    }
  }
}

export {};
