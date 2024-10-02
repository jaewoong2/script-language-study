import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: '.',
    modulePreload: false,
    rollupOptions: {
      preserveEntrySignatures: 'allow-extension',
      input: {
        index: './index.html',
        background: './src/background/index.ts',
        content: './src/content/main.ts',
        'content-main': './src/content/index.tsx',
        style: './src/style.css',
      },
      output: {
        // Set the output format to 'iife' to create a self-contained script
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'style.css';
          }
          return '[name].[ext]';
        },
      },
    },
  },
});
