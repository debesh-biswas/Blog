import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { rehypePrettyCode } from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';

export default defineConfig({
  site: 'https://debesh-blog.netlify.app/', // ← update after Netlify gives you a URL
  adapter: netlify(),

  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: { dark: 'github-dark-dimmed', light: 'github-light' },
          keepBackground: true,
          grid: true,
          transformers: [
            transformerCopyButton({
              visibility: 'hover',
              feedbackDuration: 2_500,
            }),
          ],
        },
      ],
    ],
  },
  integrations: [mdx(), sitemap()],
});
