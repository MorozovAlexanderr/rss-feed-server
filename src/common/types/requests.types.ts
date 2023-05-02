import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { User } from '@/modules/user/user.types';

export interface BodyRequest<T> extends Omit<Request, 'body'> {
  body: T;
}

export interface ContextRequest<T> extends Omit<Request, 'context'> {
  context: T;
}

export interface ParamsRequest<T> extends Request {
  params: T & ParamsDictionary;
}
export interface QueryRequest<T> extends Request {
  query: T & ParamsDictionary;
}

export interface CombinedRequest<
  Context,
  Body,
  Params = Record<string, unknown>,
  Query = Record<string, unknown>
> extends Pick<ContextRequest<Context>, 'context'>,
    Pick<BodyRequest<Body>, 'body'>,
    Pick<ParamsRequest<Params>, 'params'>, Pick<QueryRequest<Query>, 'query'> {}

export interface UserRequest {
  user: User & Document;
}
