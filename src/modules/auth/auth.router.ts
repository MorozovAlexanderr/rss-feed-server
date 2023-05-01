import { Router } from 'express';
import AuthController from '@/modules/auth/auth.controller';
import {
  userSignInValidation,
  userSignUpValidation,
} from '@/modules/auth/auth.validation';
import validate from '@/middlewares/validation.middleware';

class AuthRouter {
  public router: Router;
  private authController: AuthController;
  private path = '/auth';

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      `${this.path}/register`,
      validate(userSignUpValidation),
      this.authController.signUp
    );
    this.router.post(
      `${this.path}/login`,
      validate(userSignInValidation),
      this.authController.signIn
    );
  }
}

export const authRouter = new AuthRouter();
