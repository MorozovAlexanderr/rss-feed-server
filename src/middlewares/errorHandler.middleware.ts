import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import HttpException from '@/exceptions/base.exception';
import { logger } from '@/config/logger';

const errorHandlerMiddleware = (
  err: HttpException,
  req: Request,
  res: Response
) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

  logger.error(err);

  res.status(status).send({ status, message });
};

export default errorHandlerMiddleware;
