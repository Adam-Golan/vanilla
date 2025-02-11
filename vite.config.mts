import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve, join } from 'path';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

export default defineConfig({
  base: './',
  publicDir: 'src/assets',
  server: {
    open: true,
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  esbuild: {
    keepNames: true
  },
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        error404: resolve(__dirname, '404.html'),
      }
    },
  },
  plugins: [tsconfigPaths(),
    {
      name: 'inject-404-css',
      closeBundle() {
        const distPath = resolve(__dirname, 'dist');
        const cssFile = readdirSync(join(distPath, 'assets')).find(file => file.endsWith('.css'));
        if (cssFile) {
          const html = readFileSync(resolve(__dirname, '404.html'), 'utf-8');
          writeFileSync(join(distPath, '404.html'), html.replace('<!--CSS_INJECT-->', `<link rel="stylesheet" href="./assets/${cssFile}">`), 'utf8');
          console.log(`✅ 404.html updated with CSS: /assets/${cssFile}`);
        } else {
          console.warn('⚠️ No CSS file found in assets directory');
        }
      },
    },
  ],
})