import { ValidationChain, body, param, query } from 'express-validator';
import mongoose from 'mongoose';

export const postIdParamValidation: ValidationChain[] = [
  param('postId').custom((value) => mongoose.Types.ObjectId.isValid(value)),
];

export const getPostsValidation: ValidationChain[] = [
  query('page').isNumeric(),
  query('limit').isNumeric().optional(),
  query('sortField').isString().optional(),
  query('sortDir')
    .custom((value) => ['asc', 'desc'].includes(value))
    .optional(),
  query('search').isString().optional(),
];

export const createPostValidation: ValidationChain[] = [
  body('title').isString(),
  body('body').isString(),
];

export const updatePostValidation: ValidationChain[] = [
  ...postIdParamValidation,
  body('title').isString().optional(),
  body('body').isString().optional(),
];
