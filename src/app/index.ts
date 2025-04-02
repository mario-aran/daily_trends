// WARNING: This file is used by a script in "package.json". Do not rename or move

import { dbConnect } from '@/config/db-connect';
import { SERVER_PORT } from '@/config/env';
import { handleNotFound } from '@/middleware/handle-not-found';
import { handleRouteError } from '@/middleware/handle-route-error';
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

  // Handle route errors
  app.use(handleNotFound); // Must be placed after all route definitions
  app.use(handleRouteError); // Must be the last middleware

  // Start the server
  const server = app.listen(SERVER_PORT, () => {
    console.log(`Server running on port: ${SERVER_PORT}`);
  });

  // Handle server startup errors
  server.on('error', (error) => {
    console.error('Server failed to start:', error);
    process.exit(1);
  });
};

startServer();
