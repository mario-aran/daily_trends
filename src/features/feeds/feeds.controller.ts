import { Request, Response } from 'express';
import { feedsService } from './feeds.service';

class FeedsController {
  public async readTopFive(_: Request, res: Response) {
    const topFiveFeeds = await feedsService.readTopFive();
    res.json(topFiveFeeds);
  }

  public async readAll(req: Request, res: Response) {
    const feeds = await feedsService.readAll(req.query);
    res.json(feeds);
  }

  public async read(req: Request, res: Response) {
    const feed = await feedsService.read(req.params.id);
    res.json(feed);
  }

  public async create(req: Request, res: Response) {
    const createdFeed = await feedsService.create(req.body);
    res.status(201).json(createdFeed);
  }

  public async update(req: Request, res: Response) {
    const updatedFeed = await feedsService.update(req.params.id, req.body);
    res.json(updatedFeed);
  }

  public async delete(req: Request, res: Response) {
    const deletedFeed = await feedsService.delete(req.params.id);
    res.json(deletedFeed);
  }
}

export const feedsController = new FeedsController();
