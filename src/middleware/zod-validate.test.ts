import { HTTP_STATUS } from '@/constants/http-status';
import express from 'express';
import request from 'supertest';
import { z } from 'zod';
import { zodValidate } from './zod-validate';

// Constants
const TEST_ROUTE = '/test';
const DEFAULT_ERROR = 'Invalid data';

// Initial values
const testZodBody = z.object({ body: z.object({ name: z.string() }) });

const testZodQuery = z.object({
  query: z.object({ search: z.string().min(3) }),
});

const testZodParams = z.object({ params: z.object({ id: z.string().min(8) }) });

// Express setup
const app = express();
app.use(express.json());

app.post(TEST_ROUTE, zodValidate(testZodBody), (_, res) => {
  res.send('');
});
app.get(TEST_ROUTE, zodValidate(testZodQuery), (_, res) => {
  res.send('');
});
app.get(`${TEST_ROUTE}/:id`, zodValidate(testZodParams), (_, res) => {
  res.send('');
});

describe('zodValidate', () => {
  // Test cases
  it('should pass validation and call next middleware', async () => {
    const response = await request(app)
      .post(TEST_ROUTE)
      .send({ name: 'Mario' });

    expect(response.status).toBe(HTTP_STATUS.OK);
  });

  it('should return a validation error if body is invalid', async () => {
    const response = await request(app).post(TEST_ROUTE).send({ name: 1 });

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
    const response = await request(app).get(`${TEST_ROUTE}?search=T`);

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
    const response = await request(app).get(`${TEST_ROUTE}/1234`);

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
