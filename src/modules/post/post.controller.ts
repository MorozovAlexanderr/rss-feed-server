import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  CombinedRequest,
  ParamsRequest,
  QueryRequest,
  UserRequest,
} from '@/shared/types/requests.types';
import { PostModel } from '@/modules/post/post.model';
import NotFoundException from '@/exceptions/notFound.exception';
import {
  PostCreationBody,
  PostPaginationQuery,
  PostUpdateBody,
} from '@/modules/post/post.types';

class PostController {
  public getAll = async (
    {
      query: {
        page = 1,
        limit = 10,
        sortField = 'date',
        sortDir = 'desc',
        search,
      },
    }: QueryRequest<PostPaginationQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const paginationOptions = {
        page: page,
        limit: limit,
        sort: { [sortField]: sortDir },
      };

      const searchQuery = search
        ? {
            $or: [
              { title: { $regex: search, $options: 'i' } },
              { body: { $regex: search, $options: 'i' } },
            ],
          }
        : {};

      const posts = await PostModel.paginate(searchQuery, paginationOptions);

      res.json(posts);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (
    { params: { postId } }: ParamsRequest<{ postId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const post = await PostModel.findById(postId);

      if (!post) {
        return next(new NotFoundException());
      }

      res.json(post);
    } catch (error) {
      next(error);
    }
  };

  public create = async (
    {
      context: { user },
      body: { title, body: content },
    }: CombinedRequest<UserRequest, PostCreationBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newPost = await PostModel.create({
        creator: user.username,
        title,
        body: content,
      });
      res.status(StatusCodes.CREATED).json(newPost);
    } catch (error) {
      next(error);
    }
  };

  public updateById = async (
    {
      params: { postId },
      body: { title, body: content },
    }: CombinedRequest<{ postId: string }, PostUpdateBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { title, body: content },
        { new: true }
      );

      if (!updatedPost) {
        return next(new NotFoundException());
      }

      res.json(updatedPost);
    } catch (error) {
      next(error);
    }
  };

  public deleteById = async (
    { params: { postId } }: ParamsRequest<{ postId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const deletedPost = await PostModel.findByIdAndRemove(postId);

      if (!deletedPost) {
        return next(new NotFoundException());
      }

      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
