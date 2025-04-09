import { HTTP_STATUS } from '@/constants/http-status';
import express from 'express';
import request from 'supertest';
import { z } from 'zod';
import { zodValidate } from './zod-validate';

// Constants
const ROUTE_TESTS = '/tests';
const DEFAULT_ERROR = 'Invalid data';

// Initial values
const testZodSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({ name: z.string() }),
  query: z.object({ search: z.string().min(3) }),
});

describe('zodValidate Middleware', () => {
  const app = express();
  app.use(express.json());

  app.all(`${ROUTE_TESTS}*`, zodValidate(testZodSchema), (_, res) => {
    res.send('');
  });

  it('should pass validation and call next middleware', async () => {
    const response = await request(app)
      .post(ROUTE_TESTS)
      .send({ name: 'Mario' });

    expect(response.status).toBe(HTTP_STATUS.OK);
  });

  it('should return a validation error if body is invalid', async () => {
    const response = await request(app).post(ROUTE_TESTS).send({ name: 1 });

    expect(response.status).toBe(HTTP_STATUS.UNPROCESSABLE);
    expect(response.body.message).toBe(DEFAULT_ERROR);
    expect(response.body.details).toEqual([
      expect.objectContaining({
        path: 'body.name',
        message: expect.any(String),
      }),
    ]);
  });

  it('should return a validation error if query is invalid', async () => {
    const response = await request(app).get('/tests?search=T');

    expect(response.status).toBe(HTTP_STATUS.UNPROCESSABLE);
    expect(response.body.message).toBe(DEFAULT_ERROR);
    expect(response.body.details).toEqual([
      expect.objectContaining({
        path: 'query.search',
        message: expect.any(String),
      }),
    ]);
  });

  it('should return a validation error if params is invalid', async () => {
    const response = await request(app).get('/tests:id');

    expect(response.status).toBe(HTTP_STATUS.UNPROCESSABLE);
    expect(response.body.message).toBe(DEFAULT_ERROR);
    expect(response.body.details).toEqual([
      expect.objectContaining({
        path: 'params.id',
        message: expect.any(String),
      }),
    ]);
  });
});
