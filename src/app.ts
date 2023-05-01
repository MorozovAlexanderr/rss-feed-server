import express, { Application, json } from 'express';
import passport from 'passport';
import { appRouter } from '@/router';
import errorHandlerMiddleware from '@/middlewares/errorHandler.middleware';
import { Database } from '@/config/database';

class App {
  private readonly app: Application;
  private readonly port: number | string = process.env.PORT || 3000;

  constructor() {
    this.app = express();

    this.databaseSetup();
    this.config();
    this.routes();
    this.errorHandling();
  }

  public listen() {
    this.app.listen(this.port, () =>
      console.log(`Running on port ${this.port}`)
    );
  }

  private routes() {
    this.app.use('/', appRouter.router);
  }

  private config() {
    this.app.use(json());
    this.app.use(passport.initialize());
  }

  private errorHandling() {
    this.app.use(errorHandlerMiddleware);
  }

  private databaseSetup() {
    const database = new Database();
    database.connect();
  }
}

export default App;
