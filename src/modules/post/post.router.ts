import { Router } from 'express';
import {
  createPostValidation,
  getPostsValidation,
  updatePostValidation,
  postIdParamValidation,
} from '@/modules/post/post.validation';
import validate from '@/middlewares/validation.middleware';
import authenticateJwt from '@/middlewares/auth.middleware';
import PostController from '@/modules/post/post.controller';

class PostRouter {
  public router: Router;
  private controller: PostController;
  private path = '/posts';

  constructor() {
    this.router = Router();
    this.controller = new PostController();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      this.path,
      authenticateJwt,
      validate(getPostsValidation),
      this.controller.getAll
    );
    this.router.get(
      `${this.path}/:postId`,
      authenticateJwt,
      validate(postIdParamValidation),
      this.controller.getById
    );
    this.router.post(
      this.path,
      authenticateJwt,
      validate(createPostValidation),
      this.controller.create
    );
    this.router.patch(
      `${this.path}/:postId`,
      authenticateJwt,
      validate(updatePostValidation),
      this.controller.updateById
    );
    this.router.delete(
      `${this.path}/:postId`,
      authenticateJwt,
      validate(postIdParamValidation),
      this.controller.deleteById
    );
  }
}

export const postRouter = new PostRouter();
