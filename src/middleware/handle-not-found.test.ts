import { app } from '@/server/app';
import request from 'supertest';

// Constants
const STATUS_NOT_FOUND = 404;

describe('handleNotFound', () => {
  it('should return a 404 error for unknown routes', async () => {
    const response = await request(app).get('/api/unknown-route');

    expect(response.status).toBe(STATUS_NOT_FOUND);
    expect(response.body).toEqual({
      status: STATUS_NOT_FOUND,
      message: 'API route not found',
      stack: expect.any(String),
    });
  });
});
