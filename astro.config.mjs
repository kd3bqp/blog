// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kd3bqp.radio',
  output: 'static',
  integrations: [sitemap()],
});
