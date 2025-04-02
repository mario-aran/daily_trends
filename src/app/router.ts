import { Router } from 'express';
import { feedsRoute } from './routes/feeds.route';

export const router = Router();

// Combine routes and declare their paths
router.use('/', feedsRoute);
