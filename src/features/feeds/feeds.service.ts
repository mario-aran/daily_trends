import axios from 'axios';
import * as cheerio from 'cheerio';
import { DateTime } from 'luxon';
import { Feed } from './feed.model';
import {
  FeedsZodCreateBody,
  FeedsZodReadAllQuery,
  FeedsZodUpdateBody,
} from './feeds.zod';

// Constants
const SOURCES = [
  { name: 'El País', url: 'https://elpais.com/espana/', selector: 'h2 a' },
  { name: 'El Mundo', url: 'https://elmundo.es/', selector: 'a:has(h2)' },
] as const;

class FeedsService {
  private async scrapeTopFiveFeeds() {
    const allFeeds: FeedsZodCreateBody[] = [];

    for (const source of SOURCES) {
      // Fetch top 5 feeds from source
      const { data } = await axios.get(source.url);
      const $ = cheerio.load(data);
      const feeds = $(source.selector).slice(0, 5).toArray();

      // Map the essential values
      const sourceFeeds = feeds.map(
        (feed): FeedsZodCreateBody => ({
          url: $(feed).attr('href') || '',
          headline: $(feed).text().trim(),
          source: source.name,
        }),
      );

      // Push flatten values to allFeeds
      allFeeds.push(...sourceFeeds);
    }

    return allFeeds;
  }

  private getCurrentSpainDate() {
    const currentDate = DateTime.now().setZone('Europe/Madrid');

    return {
      startJSDate: currentDate.startOf('day').toJSDate(),
      endJSDate: currentDate.endOf('day').toJSDate(),
    };
  }

  public async readTopFive() {
    // Scrape feeds
    const scrapedFeeds = await this.scrapeTopFiveFeeds();

    // Insert non-existing feeds
    for (const scrapedFeed of scrapedFeeds) {
      await Feed.create(scrapedFeed).catch(() => {
        const shortHeadline = scrapedFeed.headline.slice(0, 10);
        console.warn(`Feed '${shortHeadline}' already exists.`);
      });
    }

    // Get Spain current date
    const { startJSDate, endJSDate } = this.getCurrentSpainDate();

    // Query top five feeds from each source
    return Feed.aggregate([
      { $match: { createdAt: { $gte: startJSDate, $lte: endJSDate } } },
      { $sort: { source: 1, _id: -1 } },
      { $group: { _id: '$source', docs: { $push: '$$ROOT' } } }, // Group by source
      { $project: { docs: { $slice: ['$docs', 5] } } }, // Limit each source to top five
      { $unwind: '$docs' }, // Flatten docs
      { $replaceRoot: { newRoot: '$docs' } }, // Replace results with docs
    ]);
  }

  public async readAll({
    sortOrder = 'asc',
    limit = 25,
    skip = 0,
  }: FeedsZodReadAllQuery) {
    return Feed.find().sort({ _id: sortOrder }).limit(limit).skip(skip);
  }

  public async read(id: string) {
    return Feed.findById(id);
  }

  public async create(createProps: FeedsZodCreateBody) {
    return Feed.create(createProps);
  }

  public async update(id: string, updateProps: FeedsZodUpdateBody) {
    return Feed.findByIdAndUpdate(id, updateProps);
  }

  public async delete(id: string) {
    return Feed.findByIdAndDelete(id);
  }
}

export const feedsService = new FeedsService();
