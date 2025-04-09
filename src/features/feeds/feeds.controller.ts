import { HTTP_STATUS } from '@/constants/http-status';
import { HttpError } from '@/utils/http-error';
import { Request, Response } from 'express';
import { feedsService } from './feeds.service';
import { FeedsZodReadAllQuery } from './feeds.zod';

class FeedsController {
  private throwNotFoundError() {
    throw new HttpError(HTTP_STATUS.NOT_FOUND, 'Feed not found');
  }

  public async readTopFive(_: Request, res: Response) {
    const topFiveFeeds = await feedsService.readTopFive();
    res.json(topFiveFeeds);
  }

  public async readAll(
    req: Request<unknown, unknown, unknown, FeedsZodReadAllQuery>,
    res: Response,
  ) {
    const feeds = await feedsService.readAll(req.query);
    res.json(feeds);
  }

  public async read(req: Request, res: Response) {
    const feed = await feedsService.read(req.params.id);
    if (!feed) this.throwNotFoundError();

    res.json(feed);
  }

  public async create(req: Request, res: Response) {
    const createdFeed = await feedsService.create(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Feed created successfully',
      newFeed: createdFeed,
    });
  }

  public async update(req: Request, res: Response) {
    const updatedFeed = await feedsService.update(req.params.id, req.body);
    if (!updatedFeed) this.throwNotFoundError();

    res.json({
      message: 'Feed updated successfully',
      newValues: updatedFeed,
    });
  }

  public async delete(req: Request, res: Response) {
    const deletedFeed = await feedsService.delete(req.params.id);
    if (!deletedFeed) throw this.throwNotFoundError();

    res.json({
      message: `Feed ${deletedFeed._id} deleted successfully`,
    });
  }
}

export const feedsController = new FeedsController();
