import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { imageToWebpPlugin } from 'vite-plugin-image-to-webp';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), imageToWebpPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
