declare global {
  namespace Express {
    interface Request {
      context: any;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      JWT_EXPIRATION: string;
    }
  }
}

export {};
