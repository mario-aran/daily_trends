import { NextFunction, Request, Response } from 'express';

// Types
type AsyncRouteHandler<T> = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<T>;

export const routeCatchAsync = <T>(asyncRouteHandler: AsyncRouteHandler<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncRouteHandler(req, res, next).catch(next);
  };
};
