import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import path from 'path';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: netlify(),
  vite: {
    resolve: {
      alias: {
        '@layouts': path.resolve('./src/components/layout'),
        '@components': path.resolve('./src/components'),
        '@lib': path.resolve('./src/lib'),
      },
    },
  },
});
