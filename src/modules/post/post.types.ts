import { Model, ObjectId } from 'mongoose';

export interface Post {
  id: ObjectId;
  resourceId: string | null; // id of origin post
  title: string;
  creator: string;
  body: string;
  date: Date;
}

export type TPostModel = Model<Post>;
