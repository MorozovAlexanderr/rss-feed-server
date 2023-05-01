import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import HttpException from '@/exceptions/base.exception';

class NotFoundException extends HttpException {
  constructor(msg?: string) {
    super(StatusCodes.NOT_FOUND, msg || ReasonPhrases.NOT_FOUND);
  }
}

export default NotFoundException;
