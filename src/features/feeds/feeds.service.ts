import { Feed } from './feed.model';

class FeedsService {
  public async getAll() {
    const feeds = await Feed.find();
    return feeds;
  }
}

export const feedsService = new FeedsService();
