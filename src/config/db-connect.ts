import { MONGODB_URI } from '@/config/env';
import mongoose from 'mongoose';

export const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
