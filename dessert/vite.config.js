import path from 'path'
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@stores': path.resolve(__dirname, '/src/stores'),
      '@services': path.resolve(__dirname, '/src/services'),
      '@components': path.resolve(__dirname, '/src/components')
    }
  }
});
