import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import '@/config/passport';
import UnauthorizedException from '@/exceptions/unauthorized.exception';

const authenticateJwt = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate('jwt', function (err: any, user: any) {
    if (err) return next(err);

    if (!user) {
      return next(new UnauthorizedException());
    }

    req.context = { ...req, user };

    return next();
  })(req, res, next);

export default authenticateJwt;
