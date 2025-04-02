import { Request, Response } from 'express';
import { feedsService } from './feeds.service';

class FeedsController {
  async getTopFeeds(_req: Request, res: Response) {
    const feeds = await feedsService.getAll();
    res.json({ feeds });
  }
}

export const feedsController = new FeedsController();
