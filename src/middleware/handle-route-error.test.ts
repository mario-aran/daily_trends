import { HttpError } from '@/utils/http-error';
import { NextFunction, Request, Response } from 'express';
import { handleRouteError } from './handle-route-error';

// Constants
const STATUS_BAD_REQUEST = 400;
const STATUS_SERVER_ERROR = 500;

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
    const error = new HttpError(STATUS_BAD_REQUEST, 'Test error');

    handleRouteError(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(STATUS_BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: STATUS_BAD_REQUEST,
        message: 'Test error',
      }),
    );
  });

  it('should return default status and message', () => {
    const error = new Error();

    handleRouteError(error as HttpError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: STATUS_SERVER_ERROR,
        message: 'Internal Server Error',
      }),
    );
  });
});
