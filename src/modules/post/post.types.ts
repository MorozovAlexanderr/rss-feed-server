import { Model, ObjectId, PaginateModel } from 'mongoose';

export interface Post {
  id: ObjectId;
  resourceId: string | null; // id of origin post
  title: string;
  creator: string;
  body: string;
  date: Date;
}

export type TPostModel = Model<Post> & PaginateModel<Post>;

export interface PostPaginationQuery {
  page: number;
  limit?: number;
  sortField?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
}

export interface PostCreationBody {
  title: string;
  body: string;
}

export type PostUpdateBody = Partial<PostCreationBody>;
