import mongoose, { Schema } from 'mongoose';

interface IFeed {
  url: string;
  headline: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeedSchema = new Schema<IFeed>(
  {
    url: { type: String, required: true, unique: true },
    headline: { type: String, required: true },
    source: { type: String, required: true },
  },
  { timestamps: true },
);

export const Feed = mongoose.model<IFeed>('Feed', FeedSchema);
