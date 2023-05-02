import { Model, ObjectId } from 'mongoose';

export interface User {
  id: ObjectId;
  username: string;
  email: string;
  password: string;
}

export interface UserMethods {
  comparePassword: (password: string) => boolean;
}

export type TUserModel = Model<User, unknown, UserMethods>;