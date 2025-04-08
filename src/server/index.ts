// WARNING: This file is used by a script in "package.json". Do not rename or move

import { SERVER_PORT } from '@/config/env';
import { app } from './app';
import { connectDB } from './db';

const startServer = async () => {
  await connectDB(); // Connect to the database

  // Start the server
  const server = app.listen(SERVER_PORT, () => {
    console.log(`Server running on port: ${SERVER_PORT}`);
  });

  // Handle server errors
  server.on('error', (error) => {
    console.error('Server failed to start:', error);
    process.exit(1);
  });
};

startServer();
