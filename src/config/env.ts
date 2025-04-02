import 'dotenv/config';

export const {
  NODE_ENV = '',
  SERVER_PORT = '',
  MONGODB_URI = '',
} = process.env;
