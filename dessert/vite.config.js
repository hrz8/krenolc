import { defineConfig } from 'vite'
import svelte from '@sveltejs/vite-plugin-svelte'
import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess';
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    WindiCSS(),
    svelte({
      preprocess: sveltePreprocess()
    }),
  ],
});
