// WARNING: This file is used by a script in "package.json". Do not rename or move

import { dbConnect } from '@/config/db-connect';
import { SERVER_PORT } from '@/config/env';
import { errorHandler } from '@/middleware/error-handler';
import { notFound } from '@/middleware/not-found';
import express from 'express';
import { router } from './router';

const app = express();

// Middleware setup
app.use(express.json()); // JSON payloads

const startServer = async () => {
  // Database setup
  await dbConnect();

  // Router setup
  app.use('/api', router);

  // Error handlers setup
  app.use(notFound); // Not found handler: Must be after all route definitions
  app.use(errorHandler); // Global error handler: Must be the last middleware

  // Start the server
  app.listen(SERVER_PORT, () => {
    console.log(`Server running on port: ${SERVER_PORT}`);
  });
};

startServer();
