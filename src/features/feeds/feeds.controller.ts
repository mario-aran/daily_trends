import { Request, Response } from 'express';
import { feedsService } from './feeds.service';

class FeedsController {
  public async readTop(_req: Request, res: Response) {
    res.json({});
  }

  public async readAll(_req: Request, res: Response) {
    const feeds = await feedsService.getAll();
    res.json({ feeds });
  }

  public async read(_req: Request, res: Response) {
    res.json({});
  }

  public async create(_req: Request, res: Response) {
    res.status(201).json({});
  }

  public async update(_req: Request, res: Response) {
    res.json({});
  }

  public async delete(_req: Request, res: Response) {
    res.json({});
  }
}

export const feedsController = new FeedsController();
