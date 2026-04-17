import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    pubDate: z.coerce.date(),
    category: z.string().default('Machine Learning'),
    tag: z.string().default('Notes'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  blog
};
