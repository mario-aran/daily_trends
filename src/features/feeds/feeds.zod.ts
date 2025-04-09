import { z } from 'zod';

// Fields
const sortOrder = z.enum(['asc', 'desc']);
const limit = z.number().int().positive();
const skip = z.number().int().positive();
const url = z.string().trim().url();
const headline = z.string().trim().min(1).max(500);
const source = z.string().trim().min(3).max(20);

// Schemas
const feedsZodReadAllQuery = z.object({ sortOrder, limit, skip }).partial();
const feedsZodCreateBody = z.object({ url, headline, source });
const feedsZodUpdateBody = feedsZodCreateBody
  .partial()
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: 'At least one field must be provided',
  });

// Request schemas
export const feedsZodReadAllRequest = z.object({ query: feedsZodReadAllQuery });
export const feedsZodCreateRequest = z.object({ body: feedsZodCreateBody });
export const feedsZodUpdateRequest = z.object({ body: feedsZodUpdateBody });

// Exported schema types
export type FeedsZodReadAllQuery = z.infer<typeof feedsZodReadAllQuery>;
export type FeedsZodCreateBody = z.infer<typeof feedsZodCreateBody>;
export type FeedsZodUpdateBody = z.infer<typeof feedsZodUpdateBody>;
