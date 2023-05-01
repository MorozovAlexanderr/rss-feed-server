import { Request } from 'express';
import { User } from '@/modules/user/user.types';

export interface BodyRequest<T> extends Omit<Request, 'body'> {
  body: T;
}

export interface ContextRequest<T> extends Omit<Request, 'context'> {
  context: T;
}

export interface UserRequest {
  user: User & Document;
}
