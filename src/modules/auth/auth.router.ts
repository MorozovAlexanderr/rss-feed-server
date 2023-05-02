import { Router } from 'express';
import AuthController from '@/modules/auth/auth.controller';
import {
  userSignInValidation,
  userSignUpValidation,
} from '@/modules/auth/auth.validation';
import validate from '@/middlewares/validation.middleware';

class AuthRouter {
  public router: Router;
  private controller: AuthController;
  private path = '/auth';

  constructor() {
    this.router = Router();
    this.controller = new AuthController();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      `${this.path}/register`,
      validate(userSignUpValidation),
      this.controller.signUp
    );
    this.router.post(
      `${this.path}/login`,
      validate(userSignInValidation),
      this.controller.signIn
    );
  }
}

export const authRouter = new AuthRouter();
