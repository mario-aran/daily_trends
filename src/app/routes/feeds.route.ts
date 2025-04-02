import { feedsController } from '@/features/feeds/feeds.controller';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';

export const feedsRoute = Router();

// Route definitions
feedsRoute.get('/', routeCatchAsync(feedsController.getTopFeeds));
