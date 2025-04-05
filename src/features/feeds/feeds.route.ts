import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';
import { feedsController } from './feeds.controller';

// Constants
const FEEDS_PATH = 'feeds';
const FEEDS_ID_PATH = 'feeds/:id';

const feedsRoute = Router();

// Root: Added separately because of this: "Al abrir la API, se deben mostrar las 5 noticias de..."
feedsRoute.get('/', routeCatchAsync(feedsController.readTop));

// Feeds
feedsRoute.get(`/${FEEDS_PATH}`, routeCatchAsync(feedsController.readAll));
feedsRoute.post(`/${FEEDS_PATH}`, routeCatchAsync(feedsController.create));

// Feed by id
feedsRoute.get(`/${FEEDS_ID_PATH}`, routeCatchAsync(feedsController.read));
feedsRoute.put(`/${FEEDS_ID_PATH}`, routeCatchAsync(feedsController.update));
feedsRoute.delete(`/${FEEDS_ID_PATH}`, routeCatchAsync(feedsController.delete));

export { feedsRoute };
