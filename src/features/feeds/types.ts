export interface ReadAllFeeds {
  source: string;
  sortOrder: 'asc' | 'desc';
  limit: number;
  skip: number;
}

export interface CreateFeed {
  url: string;
  headline: string;
  source: string;
}

export type UpdateFeed = Partial<CreateFeed>;
