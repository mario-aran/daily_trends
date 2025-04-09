import { zodValidate } from '@/middleware/zod-validate';
import { routeCatchAsync } from '@/utils/route-catch-async';
import { Router } from 'express';
import { feedsController } from './feeds.controller';
import {
  feedsZodCreateRequest,
  feedsZodReadAllRequest,
  feedsZodUpdateRequest,
} from './feeds.zod';

// Constants
const FEEDS_PATH = 'feeds';
const FEEDS_ID_PATH = 'feeds/:id';

const feedsRoute = Router();

// Root: Added separately because of this: "Al abrir la API, se deben mostrar las 5 noticias de..."
feedsRoute.get(
  '/',
  zodValidate(feedsZodReadAllRequest),
  routeCatchAsync(feedsController.readTopFive),
);

// Feeds
feedsRoute.get(`/${FEEDS_PATH}`, routeCatchAsync(feedsController.readAll));

feedsRoute.post(
  `/${FEEDS_PATH}`,
  zodValidate(feedsZodCreateRequest),
  routeCatchAsync(feedsController.create),
);

// Feed by id
feedsRoute.get(`/${FEEDS_ID_PATH}`, routeCatchAsync(feedsController.read));

feedsRoute.put(
  `/${FEEDS_ID_PATH}`,
  zodValidate(feedsZodUpdateRequest),
  routeCatchAsync(feedsController.update),
);

feedsRoute.delete(`/${FEEDS_ID_PATH}`, routeCatchAsync(feedsController.delete));

export { feedsRoute };
