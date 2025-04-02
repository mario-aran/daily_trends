import { Request, Response, Router } from 'express';

export const feedsRoute = Router();

// Route definitions
feedsRoute.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello API' });
});
