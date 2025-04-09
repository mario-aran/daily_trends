import { HTTP_STATUS } from '@/constants/http-status';
import express from 'express';
import request from 'supertest';
import { handleNotFound } from './handle-not-found';
import { handleRouteError } from './handle-route-error';

// Constants
const TEST_ROUTE = '/test';

// Express setup
const app = express();

app.get(TEST_ROUTE, (_, res) => {
  res.send('');
});

app.use(handleNotFound);
app.use(handleRouteError);

describe('handleNotFound', () => {
  // Test cases
  it('should return success when route exists', async () => {
    const response = await request(app).get(TEST_ROUTE);

    expect(response.status).toBe(HTTP_STATUS.OK);
  });

  it('should return not found when route does not exists', async () => {
    const response = await request(app).get('/non-existent-route');

    expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.body.message).toBe('API route not found');
  });
});
