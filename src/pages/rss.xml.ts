import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: "Debesh's Blog",
    description:
      'A personal blog born from an obsession with documentation and a deep interest in machine learning.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.excerpt,
      link: `/blog/${p.slug ?? p.id.replace(/\.mdx$/i, '').replace(/\/index$/i, '')}/`,
    })),
  });
}
