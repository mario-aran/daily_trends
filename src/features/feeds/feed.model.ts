import mongoose, { Schema } from 'mongoose';

const FeedSchema = new Schema(
  {
    url: { type: String, required: true, unique: true },
    headline: { type: String, required: true },
    source: { type: String, required: true },
  },
  { timestamps: true },
);

export const Feed = mongoose.model('Feed', FeedSchema);
