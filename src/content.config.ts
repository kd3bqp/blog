import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    cat: z.enum(['Blog Posts', 'Reviews', 'Events']),
    type: z.enum(['article', 'review']),
    date: z.string(),
    read: z.string(),
    title: z.string(),
    excerpt: z.string(),
    photoLabel: z.string().optional(),
    tags: z.array(z.string()).default([]),
    eventDetails: z.array(z.object({ k: z.string(), v: z.string() })).optional(),
    rig: z
      .object({
        name: z.string(),
        photoLabel: z.string(),
        ratingValue: z.number(),
        ratingText: z.string(),
        ratingLabel: z.string(),
        verdict: z.string(),
        specs: z.array(z.object({ k: z.string(), v: z.string() })),
        buy: z.array(z.object({ name: z.string(), price: z.string() })),
        pros: z.array(z.string()),
        cons: z.array(z.string()),
      })
      .optional(),
  }),
});

export const collections = { posts };
