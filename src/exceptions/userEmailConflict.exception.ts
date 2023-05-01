import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import HttpException from '@/exceptions/base.exception';

class UserEmailConflictException extends HttpException {
  constructor() {
    super(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT);
  }
}

export default UserEmailConflictException;
