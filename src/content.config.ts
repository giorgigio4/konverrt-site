import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(70).max(160),
    kind: z.enum(['guide', 'post']).default('post'),
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tldr: z.string().min(120).max(600),          // the paragraph an AI can quote
    cover: z.string().startsWith('/blog/'),        // e.g. /blog/off-market-seller-channels/cover.webp
    coverAlt: z.string().min(10),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sources: z.array(z.object({ label: z.string(), url: z.string().url().optional() })).default([]),
    draft: z.boolean().default(false),
  }),
});
export const collections = { blog };
