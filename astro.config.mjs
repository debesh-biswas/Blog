import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import { rehypePrettyCode } from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';

export default defineConfig({
  // GitHub Pages: set your site URL and repo base path
  site: 'https://debesh-biswas.github.io',
  base: '/Blog/',

  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          // Softer GitHub dark and the standard GitHub light theme
          theme: { dark: 'github-dark-dimmed', light: 'github-light' },
          // preserve theme background colors and enable grid styling
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
  integrations: [mdx()],
});

// import mdx from '@astrojs/mdx';
// import { defineConfig } from 'astro/config';
// import { rehypePrettyCode } from 'rehype-pretty-code';
// import { transformerCopyButton } from '@rehype-pretty/transformers';

// export default defineConfig({
//   markdown: {
//     syntaxHighlight: false,
//     rehypePlugins: [
//       [
//         rehypePrettyCode,
//         {
//           // Softer GitHub dark and the standard GitHub light theme
//           theme: { dark: 'github-dark-dimmed', light: 'github-light' },
//           // preserve theme background colors and enable grid styling
//           keepBackground: true,
//           grid: true,
//           transformers: [
//             transformerCopyButton({
//               visibility: 'hover',
//               feedbackDuration: 2_500,
//             }),
//           ],
//         },
//       ],
//     ],
//   },
//   integrations: [mdx()],
// });

// import { defineConfig } from 'astro/config';

// export default defineConfig({
//   site: 'https://debesh-biswas.github.io',
//   base: '/Blog',   // <-- your repo name
// });