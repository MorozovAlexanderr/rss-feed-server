import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BodyRequest } from '@/shared/types/requests.types';
import { SignInPayload, SignUpPayload } from '@/modules/auth/auth.types';
import { UserModel } from '@/shared/models/user.model';
import UserEmailConflictException from '@/exceptions/userEmailConflict.exception';
import { issueJwt } from '@/modules/auth/auth.utils';
import NotFoundException from '@/exceptions/notFound.exception';
import UnauthorizedException from '@/exceptions/unauthorized.exception';

class AuthController {
  public signIn = async (
    { body: { email, password } }: BodyRequest<SignInPayload>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return next(new NotFoundException('User not found'));
      }
      if (!user.comparePassword(password)) {
        return next(new UnauthorizedException());
      }

      const { accessToken } = issueJwt(user.id);

      res.json({ user: user.toJSON(), accessToken });
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (
    { body: { username, email, password } }: BodyRequest<SignUpPayload>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const isUserExists = await UserModel.exists({ email });

      if (isUserExists) {
        return next(new UserEmailConflictException());
      }

      const newUser = await UserModel.create({ username, email, password });

      const { accessToken } = issueJwt(newUser.id);

      return res.status(StatusCodes.CREATED).json({ user: newUser.toJSON(), accessToken });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
