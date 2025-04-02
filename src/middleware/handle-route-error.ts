import { ErrorWithStatus } from '@/types/error-with-status';
import { NextFunction, Request, Response } from 'express';

export const handleRouteError = (
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  const errorStatus = err.status ?? 500;

  res.status(errorStatus).json({
    status: errorStatus,
    message: err.message || 'Internal Server Error',
  });
};
