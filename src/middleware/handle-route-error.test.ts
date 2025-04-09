import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';
import { handleRouteError } from './handle-route-error';

describe('handleRouteError', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('should return specific status and message', () => {
    const error = new HttpError(HTTP_STATUS.NOT_FOUND, 'Test error');

    handleRouteError(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: HTTP_STATUS.NOT_FOUND,
        message: 'Test error',
      }),
    );
  });

  it('should return default status and message', () => {
    const error = new Error();

    handleRouteError(error as HttpError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: HTTP_STATUS.SERVER_ERROR,
        message: 'Internal Server Error',
      }),
    );
  });
});
