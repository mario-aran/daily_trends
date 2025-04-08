import axios from 'axios';
import * as cheerio from 'cheerio';
import { DateTime } from 'luxon';
import { Feed } from './feed.model';
import { CreateFeed, ReadAllFeeds, UpdateFeed } from './types';

// Constants
const SOURCES = [
  { name: 'El País', url: 'https://elpais.com/espana/', selector: 'h2 a' },
  { name: 'El Mundo', url: 'https://elmundo.es/', selector: 'a:has(h2)' },
] as const;

class FeedsService {
  private getCurrentSpainDate() {
    const currentDate = DateTime.now().setZone('Europe/Madrid');
    const startOfTodaySpain = currentDate.startOf('day').toJSDate();
    const endOfTodaySpain = currentDate.endOf('day').toJSDate();

    return {
      startOfTodaySpain,
      endOfTodaySpain,
    };
  }

  private async scrapeFeeds() {
    for (const source of SOURCES) {
      const { data } = await axios.get(source.url);
      const $ = cheerio.load(data);
      const feeds = $(source.selector).slice(0, 5).toArray();

      // Prepare array of promises
      const feedPromises = feeds.map(async (feed) => {
        const headline = $(feed).text().trim();
        const url = $(feed).attr('href') || '';

        const newFeed = await Feed.findOne({ url });

        if (!newFeed)
          return Feed.create({ url, headline, source: source.name }).catch(() =>
            console.error(`Failed to insert ${url.slice(0, 10)}`),
          );
      });

      // Insert feeds
      await Promise.all(feedPromises);
    }
  }

  public async readTopFive() {
    // Scrape feeds
    await this.scrapeFeeds();

    // Get Spain current date
    const { startOfTodaySpain, endOfTodaySpain } = this.getCurrentSpainDate();

    return Feed.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfTodaySpain, $lte: endOfTodaySpain },
        },
      },
      { $sort: { source: 1, _id: -1 } },
      { $group: { _id: '$source', docs: { $push: '$$ROOT' } } },
      { $project: { docs: { $slice: ['$docs', 5] } } },
      { $unwind: '$docs' },
      { $replaceRoot: { newRoot: '$docs' } },
    ]);
  }

  public readAll({ sortOrder = 'asc', limit = 25, skip = 0 }: ReadAllFeeds) {
    return Feed.find().sort({ _id: sortOrder }).limit(limit).skip(skip);
  }

  public read(id: string) {
    return Feed.findById(id);
  }

  public create(createProps: CreateFeed) {
    return Feed.create(createProps);
  }

  public update(id: string, updateProps: UpdateFeed) {
    return Feed.findByIdAndUpdate(id, updateProps);
  }

  public delete(id: string) {
    return Feed.findByIdAndDelete(id);
  }
}

export const feedsService = new FeedsService();
