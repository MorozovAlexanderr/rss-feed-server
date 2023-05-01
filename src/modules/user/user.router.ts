import { Router } from 'express';
import UserController from '@/modules/user/user.controller';
import authenticateJwt from '@/middlewares/auth.middleware';

class UserRouter {
  public router: Router;
  private userController: UserController;
  private path = '/users';

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.path}/me`, authenticateJwt, this.userController.me);
  }
}

export const userRouter = new UserRouter();
