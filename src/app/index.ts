// WARNING: This file is used by a script in "package.json". Do not rename or move

import { SERVER_PORT } from '@/config/env';
import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.json({ message: 'Hello API' });
});

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port: ${SERVER_PORT}`);
});
