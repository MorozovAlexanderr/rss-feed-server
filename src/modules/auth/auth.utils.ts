import { genSalt, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { AccessToken } from '@/modules/auth/auth.types';

export const hashPassword = async (password: string) => {
  const salt = await genSalt(6);
  const genHash = await hash(password, salt);

  return genHash;
};

export const issueJwt = (id: ObjectId): AccessToken => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  return { accessToken };
};
