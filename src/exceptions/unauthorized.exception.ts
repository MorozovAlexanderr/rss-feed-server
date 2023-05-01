import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import HttpException from '@/exceptions/base.exception';

export class UnauthorizedException extends HttpException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
  }
}

export default UnauthorizedException;
