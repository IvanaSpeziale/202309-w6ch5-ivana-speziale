import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error.js';
import { Error } from 'mongoose';
import createDebug from 'debug';

const debug = createDebug('w7E:error:middleware');

debug('Starting');
export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug('Middleware Errors');

  if (error instanceof HttpError) {
    res.status((error as HttpError).status);
    res.statusMessage = (error as HttpError).statusMessage;
  } else if (error instanceof RangeError) {
    res.status(416);
    res.statusMessage = 'Request Range Not Satisfiable';
  } else if (error instanceof Error.ValidationError) {
    res.status(400);
    res.statusMessage = 'Bad request';
  } else {
    res.status(500);
    res.statusMessage = 'Internal Server Error';
  }

  res.json({});
  debug((error as HttpError).message);
};
