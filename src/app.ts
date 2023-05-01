import express, { Application, json } from 'express';
import passport from 'passport';
import { appRouter } from '@/router';
import errorHandlerMiddleware from '@/middlewares/errorHandler.middleware';
import { Database } from '@/config/database';
import feedParserJob from '@/services/cron';

class App {
  private readonly app: Application;
  private readonly port = process.env.PORT;

  constructor() {
    this.app = express();

    this.connectToDatabase();
    this.initConfig();
    this.initRoutes();
    this.initJobs();
    this.initErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () =>
      console.log(`Running on port ${this.port}`)
    );
  }

  private initRoutes() {
    this.app.use('/', appRouter.router);
  }

  private initConfig() {
    this.app.use(json());
    this.app.use(passport.initialize());
  }

  private initJobs() {
    feedParserJob.start();
  }

  private initErrorHandling() {
    this.app.use(errorHandlerMiddleware);
  }

  private connectToDatabase() {
    const database = new Database();
    database.connect();
  }
}

export default App;
