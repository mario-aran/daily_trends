import { handleNotFound } from '@/middleware/handle-not-found';
import { handleRouteError } from '@/middleware/handle-route-error';
import express from 'express';
import { router } from './router';

const app = express();

app.use(express.json()); // JSON payloads

// Router
app.use('/api', router);

// Handle route errors
app.use(handleNotFound); // Must be placed after all route definitions
app.use(handleRouteError); // Must be the last middleware

export { app };
