import { feedsRoute } from '@/features/feeds/feeds.route';
import { Router } from 'express';

export const router = Router();

// Combine routes and declare paths
router.use('/', feedsRoute);
