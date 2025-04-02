import mongoose, { Schema } from 'mongoose';

// Constants
export const FEED_MODEL_NAME = 'Feed'; // Used for mongoose references

const FeedSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true },
);

export const Feed = mongoose.model(FEED_MODEL_NAME, FeedSchema);
