import { Router } from 'express';
import { userRouter } from '@/modules/user/user.router';
import NotFoundException from '@/exceptions/notFound.exception';
import { authRouter } from '@/modules/auth/auth.router';

class AppRouter {
  public router: Router;
  private prefix = '/api';

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.use(this.prefix, authRouter.router);
    this.router.use(this.prefix, userRouter.router);

    // handle 404 error for any unknown api request
    this.router.use((req, res, next) => {
      next(new NotFoundException());
    });
  }
}

export const appRouter = new AppRouter();
