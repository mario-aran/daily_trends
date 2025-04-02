// WARNING: This file is used by a script in "package.json". Do not rename or move

import { SERVER_PORT } from '@/config/env';
import { errorHandler } from '@/middleware/error-handler';
import { notFound } from '@/middleware/not-found';
import express from 'express';
import { router } from './router';

const app = express();

// Router
app.use(express.json()); // JSON payloads
app.use('/api', router); // API router
app.use(notFound); // Not found route: Must be placed after all defined routes
app.use(errorHandler); // Centralized error handler: Must be the last middleware

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port: ${SERVER_PORT}`);
});
